import { auth } from '@clerk/nextjs'

export default async function DashboardPage() {
  // const user = await currentUser()
  const { getToken } = auth()
  const jwt = await getToken()

  // todo: change the server url
  const res = await fetch('http://localhost:8080/test', {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  })

  const data = await res.json()
  console.log(data)

  return <h1 className="text-4xl">Dashboard</h1>
}
