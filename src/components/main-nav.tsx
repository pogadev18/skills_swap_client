'use client'

import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { HomeIcon, PersonIcon, ShuffleIcon } from '@radix-ui/react-icons'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()
  const params = useParams()

  const routes = [
    {
      href: `/dashboard`,
      label: 'Dashboard',
      active: pathname === `/dashboard`,
      icon: <HomeIcon className="mr-2 h-5 w-5" />
    },
    {
      href: `/dashboard/profile`,
      label: 'Profile',
      active: pathname === `/dashboard/profile`,
      icon: <PersonIcon className="mr-2 h-5 w-5" />
    },
    {
      href: `/dashboard/matches`,
      label: 'Matches',
      active: pathname === `/dashboard/matches`,
      icon: <ShuffleIcon className="mr-2 h-5 w-5" />
    }
  ]

  return (
    <nav className={cn('flex flex-col flex-grow', className)} {...props}>
      {routes.map((route) => (
        <Button
          className="justify-start"
          asChild
          variant="ghost"
          key={route.href}
        >
          <Link
            href={route.href}
            className={cn(
              'mb-3 text-base transition-colors items-start',
              route.active ? 'bg-muted ' : 'text-'
            )}
          >
            {route.icon}
            {route.label}
          </Link>
        </Button>
      ))}
    </nav>
  )
}
