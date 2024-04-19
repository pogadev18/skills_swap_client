'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { UserGeneralInfoForm } from './general-info-form'
import { ProfileSkillsForm } from './skills-form'
import { UserCard } from './user-card'
import { UpdateCardInfo } from './update-card-info'

export function ProfileBioTabs({
  userData,
  skills
}: {
  userData: any
  skills: any
}) {
  console.log('userData!!', userData)
  const { skills: userSkills } = userData

  return (
    <Tabs defaultValue="generalInfo">
      <TabsList className="w-full justify-start">
        <TabsTrigger value="generalInfo">General information</TabsTrigger>
        <TabsTrigger value="skills">Skills</TabsTrigger>
        <TabsTrigger disabled={userSkills.length === 0} value="my-card">
          My card
        </TabsTrigger>
      </TabsList>
      <TabsContent value="generalInfo">
        <p className="my-8">
          Let&apos;s get to know you! Your story is unique and fascinating, and
          this is where it begins to unfold. Fill out your general info to
          kickstart connections, discoveries, and a lifetime of learning.
        </p>
        <UserGeneralInfoForm userData={userData} />
      </TabsContent>
      <TabsContent value="skills">
        <p className="mt-8">
          Welcome to the Skills Tab! This is where the magic happens—your
          personal skills showcase. Whether you are here to share your expertise
          or eager to learn something new, this tab is your stepping stone to
          meaningful exchanges within our community.
        </p>
        <p className="mt-3 mb-8">
          Your profile will display the skills you are offering and seeking,
          making it easier for like-minded Swappers to find and connect with
          you. Dive in, set up your skills, and let the journey of teaching and
          learning begin!
        </p>
        <ProfileSkillsForm allSkills={skills} userSkills={userSkills} />
      </TabsContent>
      <TabsContent value="my-card">
        <p className="mt-8 mb-3">
          Here lies the core of your SkillsSwap presence — a snapshot of who you
          are and what you bring to our vibrant community. This personalized
          card is your digital introduction, the first thing fellow Swappers
          will see, so make it count!
        </p>

        <p className="mb-3">
          If you are happy with your card, you can share it with others by
          copying the link below and sending it to your friends, family, or
          anyone you want to connect with.
        </p>

        <p>
          See how others will view your profile. Your card displays crucial
          information including your offered skills, interests, and a brief bio.
          Ensure it reflects your expertise and your eagerness to engage in
          skill exchanges.
        </p>
        <div className="mt-6 flex gap-20">
          <div>
            <h2 className="font-bold mb-2">Card Preview</h2>
            <p className="mb-3">
              Your card will showcase your general information and skills,
              making it easier for others to find and connect with you. Take a
              moment to review your card and ensure it reflects your unique
              personality and expertise.
            </p>
            <UserCard userData={userData} />
          </div>
          <div>
            <UpdateCardInfo />
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}
