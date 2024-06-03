import Link from 'next/link'
import Image from 'next/image'
import clsx from 'clsx'

import Icon from '@/components/Icon'
import { siteName } from '@/config/site'
import { useTranslations } from 'next-intl'

function SocialLink({
  href,
  icon,
  className,
}: {
  href: string
  icon: string
  className?: string
}) {
  return (
    <Link
      className={clsx(
        'flex h-10 w-10 items-center justify-center rounded-full bg-purple-500 duration-300 ease-in-out hover:bg-purple-600',
        className
      )}
      href={href}
    >
      <Icon icon={icon} className="h-5 w-5 text-white" />
    </Link>
  )
}

export const Footer = () => {
  const t = useTranslations('Navbar')

  const navigation = [
    { label: t('home'), href: '/' },
    // { label: 'About', href: '/about' },
    // { label: 'Programs' },
    // { label: 'Gallery', href: '/gallery' },
    // { label: 'Parents', href: '/parents' },
    // { label: 'Contact', href: '/contact' },
  ]

  return (
    <footer className="space-y-8 divide-y divide-purple-400/20 bg-yellow-100 px-4 pt-16 sm:px-6 sm:pt-20 lg:px-8">
      {/* Top section: blocks */}
      <div className="mx-auto grid max-w-md gap-y-8 sm:max-w-none sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 md:gap-x-12 lg:max-w-screen-2xl lg:grid-cols-11 lg:gap-8 xl:gap-12">
        {/* Block 3 */}
        <div className="flex-shrink sm:order-4 lg:order-none lg:col-span-2">
          <h6 className="relative text-xl font-bold tracking-wide text-purple-900">
            <span className="relative z-20">Site Links</span>
            <span className="absolute -bottom-1 left-0 z-10 h-1 w-12 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-500" />
          </h6>
          {/* Site links */}
          <ul className="mt-6 divide-y divide-purple-400/20 text-lg">
            {navigation.map((link, index) => (
              <li
                key={`footer-site-link-${link.label}`}
                className={clsx(
                  'font-medium text-purple-700 duration-300 ease-in-out hover:text-purple-600',
                  index == 0 && 'pb-2',
                  index == navigation.length && 'pt-2',
                  index > 0 && index < navigation.length && 'py-2'
                )}
              >
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Bottom section */}
      <div className="mx-auto flex max-w-md flex-col justify-between py-8 sm:max-w-none sm:flex-row lg:max-w-screen-2xl">
        {/* Copyright note */}
        <span className="text-base text-purple-800/90">
          © {new Date().getFullYear()} {siteName}. All rights reserved.
        </span>
        <p className="mt-0.5 flex items-center text-purple-800/90">
          Made with
          <Icon icon="coffee" className="mx-1 h-5 w-5" />
          <span>
            by{' '}
            <Link
              className="text-purple-700 hover:text-purple-900 hover:underline"
              href="https://wujieli.com/"
              target="_blank"
            >
              Mr.WujieLi
            </Link>
          </span>
        </p>
      </div>
    </footer>
  )
}
