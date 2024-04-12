import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircleIcon } from 'lucide-react'

type SkillsSubmisisonAlertProps = {
  formErrorMessage?: string
  hasUserSubmittedSkills: boolean
}

export function SkillsSubmisisonAlert({
  formErrorMessage,
  hasUserSubmittedSkills
}: SkillsSubmisisonAlertProps) {
  const firstTimeUserSkillMessage =
    'Since your profile has not any skills yet, to submit the form, you need to offer / teach at least one skill. We recommend you to offer skills that you are proficient in and comfortable teaching.'

  return (
    <Alert variant="destructive" className="mb-3">
      <AlertCircleIcon className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        {hasUserSubmittedSkills && <p>{firstTimeUserSkillMessage}</p>}
        {formErrorMessage && (
          <p className="mt-2 font-bold">{formErrorMessage}</p>
        )}
      </AlertDescription>
    </Alert>
  )
}
