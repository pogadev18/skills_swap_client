import { UserButton, auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

import { MainNav } from '@/components/main-nav'

export async function Navbar() {
  const { userId } = auth()

  if (!userId) redirect('/')

  return (
    <>
      <MainNav className="w-full" />
      <UserButton afterSignOutUrl="/" />
    </>
  )
}
