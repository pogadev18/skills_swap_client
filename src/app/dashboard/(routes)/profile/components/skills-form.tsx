'use client'

import { useState } from 'react'

import {
  CheckIcon,
  ArrowDownWideNarrowIcon,
  AlertCircleIcon,
  TrashIcon
} from 'lucide-react'
import { redirect, useRouter } from 'next/navigation'

import toast from 'react-hot-toast'
import * as z from 'zod'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@clerk/nextjs'

import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form'
import { cn } from '@/lib/utils'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { updateUserSkills } from '@/app/dashboard/dashboard-actions'

const skillObject = z.object({
  skillId: z.string().optional(),
  isOffered: z.boolean({ required_error: 'Offered is required' }),
  weight: z
    .number()
    .int()
    .min(1, { message: 'Weight must be at least 1' })
    .max(10, { message: 'Weight must be at most 10' }),
  tagIds: z.array(z.string())
})

const formSchema = z.object({
  skills: z
    .array(
      skillObject.refine(
        (data) => data.skillId !== undefined && data.skillId.trim().length > 0,
        {
          message: 'Skill is required',
          path: ['skillId'] // Point to the specific field
        }
      )
    )
    .min(1, { message: 'At least one skill is required' })
    .refine((skills) => skills.some((skill) => skill.isOffered), {
      message: 'At least one skill should be offered by you'
    })
})

type FormValues = z.infer<typeof formSchema>

export function ProfileSkillsForm({ skills }: { skills: any }) {
  const { userId, getToken } = useAuth()

  const [openPopoverIndex, setOpenPopoverIndex] = useState<number | null>(null)

  const router = useRouter()

  const form = useForm<FormValues>({
    defaultValues: {
      skills: [
        {
          skillId: undefined,
          isOffered: false,
          weight: 1,
          tagIds: []
        }
      ]
    },
    resolver: zodResolver(formSchema)
  })

  const { errors, isSubmitting } = form.formState

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'skills'
  })

  type FormSkill = {
    label: string
    value: string
    tagIds: string[]
  }

  const formSkills: FormSkill[] = skills.map(
    (skill: { id: string; name: string; tagIds: string[] }) => {
      return {
        label: skill.name,
        value: skill.id,
        tagIds: skill.tagIds
      }
    }
  )

  const onSubmit = async (data: FormValues) => {
    /* chain of events:
      1. user selects a skill in the form -> data.skills[index].skillId
      2. I need to find the tagIds for that skill -> skills[index].tagIds = [tagId1, tagId2, tagId3, etc...]
      3. I need to store the tagIds in the form payload
      4. send the payload to the server: 
        {
          skills: [
            {
              skillId: 'skillId1',
              isOffered: true,
              weight: 10,
              tagIds: ['tagId1', 'tagId2', 'tagId3']
            },
            {
              skillId: 'skillId2',
              isOffered: false,
              weight: 5,
              tagIds: ['tagId4', 'tagId5']
            }
          ]
        }
    */

    const finalPayload = data.skills.map((skill) => {
      const selectedSkill = skills.find((s: any) => s.id === skill.skillId)

      return {
        ...skill,
        tagIds: selectedSkill.tags.map((tag: any) => tag.id)
      }
    })

    const token = await getToken()

    if (!userId || !token) {
      redirect('/')
    }

    try {
      await updateUserSkills({ skills: finalPayload, userId, token })

      router.refresh()
      form.reset()
      toast.success('Skills updated successfully')
    } catch (error) {
      toast.error('Failed to save skills. Please try again.')
      return
    }
  }

  return (
    <Form {...form}>
      {errors.skills?.root?.message && (
        <Alert variant="destructive" className="mb-3">
          <AlertCircleIcon className="h-4 w-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            In order to submit the form, you need to offer / teach at least one
            skill. We recommend you to offer skills that you are proficient in
            and we believe that you can help others grow.
          </AlertDescription>
        </Alert>
      )}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="max-h-[820px] overflow-y-auto flex flex-col gap-5">
          {fields.map((field, index) => {
            return (
              <fieldset
                key={field.id}
                className={`${field.id} border rounded-md p-4`}
              >
                {index > 0 && (
                  <div className="flex justify-end">
                    <Button
                      className="text-red-600 border-red-600"
                      variant="outline"
                      size="icon"
                      onClick={() => remove(index)}
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>
                )}
                <FormField
                  control={form.control}
                  name={`skills.${index}.skillId`}
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Skill</FormLabel>
                      <Popover
                        open={openPopoverIndex === index}
                        onOpenChange={(isOpen) => {
                          if (isOpen) {
                            setOpenPopoverIndex(index) // Set this Popover's index as open
                          } else if (openPopoverIndex === index) {
                            setOpenPopoverIndex(null) // Reset to null if this Popover was open and is now closed
                          }
                        }}
                      >
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              disabled={isSubmitting}
                              className={cn(
                                'w-full justify-between',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              {field.value
                                ? formSkills.find(
                                    (skill) => skill.value === field.value
                                  )?.label
                                : 'Select a skill'}
                              <ArrowDownWideNarrowIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[800px] max-h-[300px] p-0 overflow-auto">
                          <Command>
                            <CommandInput
                              placeholder="Search skill..."
                              className="h-9"
                            />
                            <CommandEmpty>No skills found.</CommandEmpty>
                            <CommandGroup>
                              {formSkills.map((skill) => (
                                <CommandItem
                                  value={skill.label}
                                  key={skill.value}
                                  onSelect={() => {
                                    form.setValue(
                                      `skills.${index}.skillId`,
                                      skill.value
                                    )
                                    setOpenPopoverIndex(null)
                                  }}
                                >
                                  {skill.label}
                                  <CheckIcon
                                    className={cn(
                                      'ml-auto h-4 w-4',
                                      skill.value === field.value
                                        ? 'opacity-100'
                                        : 'opacity-0'
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      {/* Not used <FormMessage/> from ShadCN due to dynamic arrays in the form. The validation does not fire if using <FormMessage/> component< */}
                      <p className="text-destructive text-sm">
                        {errors.skills?.[index]?.skillId?.message ?? ''}
                      </p>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`skills.${index}.isOffered`}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md py-4">
                      <FormControl>
                        <Checkbox
                          disabled={isSubmitting}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Do you want to teach this skill?</FormLabel>
                        <FormDescription>
                          Simply select this checkbox to indicate that you are
                          able to teach this skill to others. Or leave it blank
                          if you are looking to learn this skill.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`skills.${index}.weight`}
                  render={({ field: { value, onChange } }) => (
                    <FormItem>
                      <FormLabel>Skill Level: {value}</FormLabel>
                      <FormControl>
                        <Slider
                          min={1}
                          disabled={isSubmitting}
                          max={10}
                          step={1}
                          defaultValue={[Number(value)]}
                          onValueChange={(value) => onChange(value[0])}
                        />
                      </FormControl>
                      <FormDescription>
                        Prioritize your skill based on your preference or
                        proficiency level. For example, if you are an expert in
                        a certain skill, you can set the weight to 10. Or if you
                        are a new to a skill, you can set the weight to 1.
                      </FormDescription>
                      <p>{errors.skills?.[index]?.weight?.message ?? ''}</p>
                    </FormItem>
                  )}
                />
              </fieldset>
            )
          })}
        </div>
        <div>
          <Button
            variant="link"
            className="underline"
            onClick={() =>
              append({
                skillId: undefined,
                isOffered: false,
                weight: 1,
                tagIds: []
              })
            }
          >
            Add another skill +
          </Button>
        </div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Loading...' : 'Save skills'}
        </Button>
      </form>
    </Form>
  )
}
