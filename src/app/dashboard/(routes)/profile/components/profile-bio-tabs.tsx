'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { UserGeneralInfoForm } from './general-info-form'

export function ProfileBioTabs({ initialData }: { initialData: any }) {
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
      <TabsContent value="skills">Skills form here</TabsContent>
    </Tabs>
  )
}
