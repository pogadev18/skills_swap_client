'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { UserGeneralInfoForm } from './general-info-form'
import { ProfileSkillsForm } from './skills-form'
// import { ComboboxForm } from './skills-form-test'

export function ProfileBioTabs({
  initialData,
  skills
}: {
  initialData: any
  skills: any
}) {
  return (
    <Tabs defaultValue="generalInfo" className="w-[800px]">
      <TabsList className="w-full justify-start">
        <TabsTrigger value="generalInfo">General information</TabsTrigger>
        <TabsTrigger value="skills">Skills</TabsTrigger>
      </TabsList>
      <TabsContent value="generalInfo">
        <p className="my-8">
          Let&apos;s get to know you! Your story is unique and fascinating, and
          this is where it begins to unfold. Fill out your general info to
          kickstart connections, discoveries, and a lifetime of learning.
        </p>
        <UserGeneralInfoForm initialBioData={initialData} />
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
        <ProfileSkillsForm skills={skills} />
        {/* <ComboboxForm /> */}
      </TabsContent>
    </Tabs>
  )
}
