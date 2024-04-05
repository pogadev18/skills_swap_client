import { auth } from '@clerk/nextjs'

import { UserButton } from '@clerk/nextjs'

export default async function DashboardPage() {
  // const user = await currentUser()
  const { getToken } = auth()
  const jwt = await getToken()

  // todo: change the server url
  const res = await fetch('http://swapskillsapiurl.com', {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  })

  const data = await res.json()
  console.log(data)

  return (
    <div>
      <h1 className="text-3xl">Welcome to dashboard</h1>
      <UserButton afterSignOutUrl="/" />
    </div>
  )
}
