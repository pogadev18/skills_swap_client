'use client'

export function UserCard({ userData }: { userData: any }) {
  return <p>{JSON.stringify(userData)}</p>
}
