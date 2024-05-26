'use client'

import { Navbar } from './Navbar'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

export function Header() {
  const pathname = usePathname()

  return (
    <header
      className={clsx(pathname === '/parents' ? 'bg-white' : 'bg-purple-25')}
    >
      <Navbar />
    </header>
  )
}
