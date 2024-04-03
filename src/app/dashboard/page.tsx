import { currentUser } from '@clerk/nextjs'

import { UserButton } from '@clerk/nextjs'

export default async function DashboardPage() {
  const user = await currentUser()
  console.log('currentUser', user)

  return (
    <div>
      <h1 className="text-3xl">Welcome to dashboard</h1>
      <UserButton afterSignOutUrl="/" />
    </div>
  )
}
