'use client'

import toast from 'react-hot-toast'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { redirect, useRouter } from 'next/navigation'
import { ClipboardIcon } from 'lucide-react'
import { useAuth } from '@clerk/nextjs'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from '@/components/ui/hover-card'

import {
  updateUserBio,
  type UserBioData
} from '@/app/dashboard/dashboard-actions'

type UserGeneralInfoFormProps = {
  initialBioData?: UserBioData
}

const MEETING_PREFERANCES = [
  { id: 'online', label: 'Online' },
  { id: 'in-person', label: 'In-person' },
  { id: 'hybrid', label: 'Hybrid' }
]

const BIO_EXAMPLE =
  "Hi there, SkillsSwappers! I'm Alex, a web wizard by day and an aspiring guitarist by night. My world revolves around creating sleek, user-friendly websites, diving deep into code to bring digital dreams to life. But when the screens go dark, my curiosity for music lights up. I've always been fascinated by the melodies that can flow from a guitar and am on a mission to master its chords. Joining SkillsSwap to blend my love for tech with my musical aspirations, I'm excited to exchange skills, learn, and grow. Let's connect, share, and create something amazing together!"

const formSchema = z.object({
  bio: z
    .string()
    .min(20, { message: 'Bio must be at least 20 characters long.' })
    .max(600, { message: 'Bio must be at most 600 characters long.' }),
  meetingPreferance: z.enum(['online', 'in-person', 'hybrid']),
  availability: z
    .string()
    .min(5, { message: 'Availability must be at least 5 characters long.' })
})

type FormSchemaValues = z.infer<typeof formSchema>

export function UserGeneralInfoForm({
  initialBioData
}: UserGeneralInfoFormProps) {
  const { userId, getToken } = useAuth()

  const router = useRouter()

  const bioLabel = initialBioData ? 'Edit biography' : 'Add biography'
  const preferanceOfMeetingLabel = initialBioData
    ? 'Edit your meeting preferance'
    : 'Select your meeting preferance'
  const availabilityLabel = initialBioData
    ? 'Edit your availability'
    : 'Add your availability'
  const toastMessage = initialBioData
    ? 'Biography updated!'
    : 'Biography created!'
  const action = initialBioData ? 'Save changes' : 'Create biography'

  const form = useForm<FormSchemaValues>({
    defaultValues: initialBioData || {
      bio: '',
      meetingPreferance: 'hybrid',
      availability: ''
    },
    resolver: zodResolver(formSchema)
  })

  const { isSubmitting: formIsSubmitting } = form.formState

  const onSubmit = async (values: FormSchemaValues) => {
    const token = await getToken()

    if (!userId || !token) {
      redirect('/')
    }

    try {
      await updateUserBio({ ...values, userId, token })

      router.refresh()
      toast.success(toastMessage)
    } catch (error) {
      toast.error('Failed to update biography. Please try again.')
      return
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-2">
                    <FormLabel>{bioLabel}</FormLabel>
                    <HoverCard>
                      <HoverCardTrigger>
                        <ClipboardIcon className="h-5 w-5" />
                      </HoverCardTrigger>
                      <HoverCardContent className="w-[400px]">
                        {BIO_EXAMPLE}
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                  <FormControl>
                    <Textarea
                      maxLength={600}
                      className="h-40 resize-none"
                      disabled={formIsSubmitting}
                      placeholder='hover / tap over the "clipboard" icon for inspiration.'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="meetingPreferance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{preferanceOfMeetingLabel}</FormLabel>
                  <Select
                    disabled={formIsSubmitting}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {MEETING_PREFERANCES.map((preferance) => (
                        <SelectItem key={preferance.id} value={preferance.id}>
                          {preferance.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="availability"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{availabilityLabel}</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      disabled={formIsSubmitting}
                      placeholder="Weekends, 9am-5pm."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={formIsSubmitting} className="ml-auto" type="submit">
            {formIsSubmitting ? 'Loading...' : action}
          </Button>
        </form>
      </Form>
    </>
  )
}
