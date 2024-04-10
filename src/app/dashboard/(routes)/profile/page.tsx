import { auth } from '@clerk/nextjs'
import { getUserData, getSkills } from '@/app/dashboard/dashboard-actions'
import { ProfileBioTabs } from './components/profile-bio-tabs'

export default async function UserProfilePage() {
  const { getToken, userId } = auth()
  const jwt = await getToken()

  // todo: type this - generate types based on the back-end schema
  const [userData, skills] = await Promise.all([
    getUserData(userId, jwt),
    getSkills(jwt)
  ])

  return (
    <>
      <h1 className="text-4xl mb-4">My SkillsSwap Profile</h1>
      <p className="text-lg w-[1000px]">
        In the heart of SkillsSwap lies a world of endless possibilities, where
        every exchange transforms into a journey of learning and growth. This is
        your gateway to a community that values knowledge, embraces diversity,
        and thrives on the power of sharing. Your profile is more than just a
        space; it is a canvas to paint your identity, showcase your talents, and
        curate your learning path.
      </p>

      <div className="mt-10">
        <ProfileBioTabs initialData={userData} skills={skills} />
      </div>
    </>
  )
}
