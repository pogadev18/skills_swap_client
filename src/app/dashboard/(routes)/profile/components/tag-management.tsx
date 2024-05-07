'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

export const TagManagement = ({ userData }: { userData: any }) => {
  const checkedTags = new Set<string>()

  const tagsForTeachingSkill = userData.skills
    .filter((skill: any) => skill.isOffered)
    .map((skill: any) => skill.skill.tags)

  const tagsForLearningSkill = userData.skills
    .filter((skill: any) => !skill.isOffered)
    .map((skill: any) => skill.skill.tags)

  const handleSelectedTag = (tagId: string, isTagChecked: string | boolean) => {
    if (isTagChecked) {
      checkedTags.add(tagId)
    } else {
      checkedTags.delete(tagId)
    }
  }

  const handleSaveTags = () => {
    const tags = Array.from(checkedTags)
    console.log('tags array', tags)

    // make api call to save tags
  }

  return (
    <>
      <h2 className="font-bold mb-2">Manage your subcategories</h2>
      <p className="mb-5">
        For each skill, you can select the subcategories that best describe your
        teaching and learning skills. This will help other users find you when
        they are looking for a tutor or a learning partner. Think of these
        subcategories as tags that describe your skills or on waht you are
        looking to learn / improve.
      </p>

      <div className="flex gap-10">
        <div className="learning-tags">
          <h3 className="font-bold mb-2">Teaching skill(s) subcategory</h3>
          {tagsForTeachingSkill[0].map((tag: any) => (
            <div key={tag.id} className="items-top flex mb-2">
              <Checkbox
                onCheckedChange={(checked) =>
                  handleSelectedTag(tag.id, checked)
                }
                id={tag.name}
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor={tag.name}
                  className="ml-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {tag.name}
                </label>
              </div>
            </div>
          ))}
        </div>
        <div className="teaching-tags">
          <h3 className="font-bold mb-2">Learning skill(s) subcategory</h3>
          {tagsForLearningSkill[0].map((tag: any) => (
            <div key={tag.id} className="items-top flex mb-2">
              <Checkbox
                id={tag.name}
                onCheckedChange={(checked) =>
                  handleSelectedTag(tag.id, checked)
                }
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor={tag.name}
                  className="ml-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {tag.name}
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Button className="mt-5" onClick={handleSaveTags}>
        Save
      </Button>
    </>
  )
}
