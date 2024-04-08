'use sever'

import { revalidatePath } from 'next/cache'
import { api } from '@/lib/axiosConfig'

// todo: generate types based on back-end schema
export type UserBioData = {
  bio: string
  meetingPreferance: 'in-person' | 'online' | 'hybrid'
  availability: string
}

type UpdateUserBioParams = {
  userId: string
  token: String
} & UserBioData

// this functions runs on the client in general-info-form.tsx
export async function updateUserBio({
  bio,
  meetingPreferance,
  availability,
  userId,
  token
}: UpdateUserBioParams) {
  const res = await api.put(
    `/user/${userId}`,
    {
      bio,
      meetingPreferance,
      availability
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )

  return res.data
}

// this function runs on the server
export async function getUserData(userId: string | null, token: string | null) {
  const res = await api.get(`/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return res.data
}
