'use client'

import { Button } from '@/components/ui/button'
import { updateCardInfo } from '@/app/dashboard/dashboard-actions'
import { useAuth } from '@clerk/nextjs'

export function UpdateCardInfo() {
  const { userId, getToken } = useAuth()

  const handleOnClick = async () => {
    const token = await getToken()

    if (!token || !userId) {
      return console.error('Error getting token or userId')
    }

    try {
      await updateCardInfo({
        isActive: true,
        shareableLink: '',
        token,
        userId
      })
    } catch (error) {
      console.error('Error updating card info:', error)
    }
  }
  return (
    <div>
      <h2 className="font-bold mb-2">Activate your card</h2>
      <p className="mb-3">
        You control your visibility on SkillsSwap. Activate your card to let
        others find you and reach out with opportunities. If you need to take a
        break, deactivate your card to temporarily hide your profile from the
        community.
      </p>
      <Button onClick={handleOnClick}>Activate</Button>
    </div>
  )
}
