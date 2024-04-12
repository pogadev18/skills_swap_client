import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircleIcon } from 'lucide-react'

type SkillsSubmisisonAlertProps = {
  formErrorMessage?: string
}

export function SkillsSubmisisonAlert({
  formErrorMessage
}: SkillsSubmisisonAlertProps) {
  return (
    <Alert variant="destructive" className="mb-3">
      <AlertCircleIcon className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        {formErrorMessage && (
          <p className="mt-2 font-bold">{formErrorMessage}</p>
        )}
      </AlertDescription>
    </Alert>
  )
}
