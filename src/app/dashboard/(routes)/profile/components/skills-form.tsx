'use client'

import {
  ArrowUpDownIcon,
  CheckIcon,
  ArrowDownWideNarrowIcon
} from 'lucide-react'

import toast from 'react-hot-toast'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

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
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { cn } from '@/lib/utils'
import { useState } from 'react'

const formSchema = z.object({
  skillId: z.string({ required_error: 'Skill is required' }),
  isOffered: z.boolean(),
  weight: z
    .number()
    .int()
    .min(1, { message: 'Weight must be at least 1' })
    .max(10, { message: 'Weight must be at most 10' })
})

type FormValues = z.infer<typeof formSchema>

export function ProfileSkillsForm({ skills }: { skills: any }) {
  const [open, setOpen] = useState(false)

  const form = useForm<FormValues>({
    defaultValues: {
      skillId: '',
      isOffered: false,
      weight: 1
    },
    resolver: zodResolver(formSchema)
  })

  type FormSkill = {
    label: string
    value: string
  }

  const formSkills: FormSkill[] = skills.map(
    (skill: { id: string; name: string }) => {
      return {
        label: skill.name,
        value: skill.id
      }
    }
  )

  console.log('form skills', formSkills)

  function onSubmit(data: FormValues) {
    console.log('submitting', data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="skillId"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Skills</FormLabel>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
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
                <PopoverContent className="w-[800px] p-0 overflow-auto">
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
                            form.setValue('skillId', skill.value)
                            setOpen(false)
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

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isOffered"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md py-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Do you have knowledge to share or curiosity fuels growth?
                </FormLabel>
                <FormDescription>
                  Simply select this checkbox to indicate whether you are
                  offering or seeking the selected skill.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="weight"
          render={({ field: { value, onChange } }) => (
            <FormItem>
              <FormLabel>Skill Level: {value}</FormLabel>
              <FormControl>
                <Slider
                  min={1}
                  max={10}
                  step={1}
                  defaultValue={[Number(value)]}
                  onValueChange={onChange}
                />
              </FormControl>
              <FormDescription>
                Prioritize your skill based on your preference or proficiency
                level. For example, if you are an expert in a certain skill, you
                can set the weight to 10. Or if you are a new to a skill, you
                can set the weight to 1.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
