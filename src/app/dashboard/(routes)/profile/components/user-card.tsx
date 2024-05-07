'use client'

import { useUser } from '@clerk/nextjs'
import Image from 'next/image'

import { Button } from '@/components/ui/button'

export function UserCard({ userData }: { userData: any }) {
  const { user } = useUser()

  const teachingSkills = userData?.skills
    ?.filter((skill: any) => skill.isOffered === true)
    .map((skill: any) => skill.skill.name)

  const learningSkills = userData?.skills
    ?.filter((skill: any) => skill.isOffered === false)
    .map((skill: any) => skill.skill.name)

  const shortBio =
    userData.bio?.length > 150
      ? `${userData.bio.slice(0, 150)}...`
      : userData.bio

  const availability: string = userData.availability
  const meetingPreferance: string = userData.meetingPreferance.toUpperCase()

  return (
    <div className="bg-white rounded shadow-lg max-w-[400px]">
      <div className="flex flex-col items-center">
        <div className="avatar-upload mb-4 text-center w-full">
          <Image
            width={200}
            height={200}
            className="rounded w-full h-full"
            src={user?.imageUrl || '/images/avatar-placeholder.png'}
            alt="Avatar"
          />
        </div>
        <div className="font-bold text-xl mb-2">{user?.fullName}</div>
      </div>
      <hr />
      <div className="p-6 flex justify-between">
        <div>
          <p className="font-bold">Teaching</p>
          <ul className="pl-6 list-disc">
            {teachingSkills.map((skill: string) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-bold">Learning</p>
          <ul className="pl-6 list-disc">
            {learningSkills.map((skill: string) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>
      </div>
      <hr />
      <div className="p-6">
        <p>{shortBio}</p>
      </div>
      <hr />
      <div className="p-6">
        <p>
          <span className="font-bold">Availability:</span> {availability}
        </p>
        <p>
          <span className="font-bold">Meeting Preferance:</span>{' '}
          {meetingPreferance}
        </p>
      </div>
      <div className="p-6">
        <Button>send invitation</Button>
      </div>
    </div>
  )
}
