import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <Button asChild>
        <Link href="/dashboard/profile">Get Started</Link>
      </Button>
    </div>
  )
}
