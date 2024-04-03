import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <Button asChild>
        <Link href="/dashboard">Get Started</Link>
      </Button>
    </div>
  )
}
