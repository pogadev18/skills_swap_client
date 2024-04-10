'use sever'

// import { revalidatePath } from 'next/cache'
import { api } from '@/lib/axiosConfig'

// todo: BETTER TYPING BASED ON BACKEND!!!!!!
type UserIdAndToken = {
  userId: string
  token: string
}

export type UserBioData = {
  bio: string
  meetingPreferance: 'in-person' | 'online' | 'hybrid'
  availability: string
}

type UserSkillsData = {
  skills: {
    isOffered: boolean
    weight: number
    tagIds: string[]
    skillId?: string | undefined
  }[]
}

type UpdateUserBioParams = UserIdAndToken & UserBioData
type UpdateUserSkills = UserIdAndToken & UserSkillsData

// ==== RUNS ON THE CLIENT ==== //
export async function updateUserBio({
  bio,
  meetingPreferance,
  availability,
  userId,
  token
}: UpdateUserBioParams) {
  const res = await api.put(
    `/users/${userId}`,
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

export async function updateUserSkills({
  token,
  userId,
  skills
}: UpdateUserSkills) {
  const res = await api.put(`/users/${userId}/skills`, skills, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return res.data
}

// ==== RUNS ON THE SERVER ==== //
export async function getUserData(userId: string | null, token: string | null) {
  const res = await api.get(`/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return res.data
}

export async function getSkills(token: string | null) {
  const res = await api.get('/skills', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return res.data
}
