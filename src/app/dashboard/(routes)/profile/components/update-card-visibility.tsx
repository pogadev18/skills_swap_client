'use client'

import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { useState } from 'react'

import { updateCardInfo } from '@/app/dashboard/dashboard-actions'
import { Button } from '@/components/ui/button'

export function UpdateCardVisibility({ userData }: { userData: any }) {
  const [loading, setLoading] = useState(false)
  const { userId, getToken } = useAuth()
  const router = useRouter()

  const cardInfo = userData.UserCard

  const handleOnClick = async () => {
    const token = await getToken()

    if (!token || !userId) {
      return console.error('Error getting token or userId')
    }

    try {
      setLoading(true)
      await updateCardInfo({
        isActive: cardInfo.isActive ? false : true,
        shareableLink: '',
        token,
        userId
      })
      router.refresh()
      toast.success('Card visibility updated!')
    } catch (error) {
      toast.error('Failed to update card visibility. Please try again.')
      console.error('Error updating card info:', error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div>
      <h2 className="font-bold mb-2">Control your card visibility</h2>
      <p className="mb-3">
        You control your visibility on SkillsSwap. Activate your card to let
        others find you and reach out with opportunities. If you need to take a
        break, deactivate your card to temporarily hide your profile from the
        community.
      </p>
      <Button
        variant={cardInfo.isActive ? 'destructive' : 'default'}
        disabled={loading}
        onClick={handleOnClick}
      >
        {cardInfo.isActive ? 'Hide your card' : 'Show your card'}
      </Button>
    </div>
  )
}
