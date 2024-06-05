'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Fragment } from 'react'
// @ts-ignore
import { Menu, Transition, Popover } from '@headlessui/react'
import clsx from 'clsx'

import Icon from '@/components/Icon'
import { siteName } from '@/config/site'
import { useTranslations } from 'next-intl'

export function Navbar() {
  const pathname = usePathname()
  const t = useTranslations('Navbar')

  const navigation = [
    { label: t('home'), href: '/' },
    { label: t('catagory'), href: '/category' },
  ]

  function Logo({ className }: { className?: string }) {
    return (
      <div className={clsx(className)}>
        <Link href="/" title={siteName} className="flex items-center">
          <Image src="/favicon/favicon.svg" alt="logo" width={44} height={44} />
          <span className="ml-4 text-2xl font-bold text-black">{siteName}</span>
        </Link>
      </div>
    )
  }

  function MenuIcon({ open }: { open: boolean }) {
    return (
      <>
        <span
          className={clsx(
            'absolute block h-1 rotate-0 transform rounded-full opacity-100 transition-all duration-300 ease-in-out',
            open
              ? 'left-1/2 top-2 w-0 bg-purple-50 group-hover:bg-white'
              : 'left-0 top-0 w-full bg-purple-900 group-hover:bg-purple-600'
          )}
        />
        <span
          className={clsx(
            'absolute left-0 top-2 block h-1 w-full transform rounded-full opacity-100 transition-all duration-300 ease-in-out group-hover:bg-purple-600',
            open
              ? 'rotate-45 bg-purple-50 group-hover:bg-white'
              : 'rotate-0 bg-purple-900 group-hover:bg-purple-600'
          )}
        />
        <span
          className={clsx(
            'absolute left-0 top-2 block h-1 w-full transform rounded-full opacity-100 transition-all duration-300 ease-in-out group-hover:bg-purple-600',
            open
              ? '-rotate-45 bg-purple-50 group-hover:bg-white'
              : 'rotate-0 bg-purple-900 group-hover:bg-purple-600'
          )}
        />
        <span
          className={clsx(
            'absolute block h-1 rotate-0 transform rounded-full opacity-100 transition-all duration-300 ease-in-out group-hover:bg-purple-600',
            open
              ? 'left-1/2 top-2 w-0 bg-purple-50 group-hover:bg-white'
              : 'left-0 top-4 w-full bg-purple-900 group-hover:bg-purple-600'
          )}
        />
      </>
    )
  }

  function MobileNav() {
    return (
      <div className="block lg:hidden">
        <Popover>
          <Popover.Button
            className="flex items-center group relative z-50 h-5 w-6 rotate-0 transform cursor-pointer transition duration-500 ease-in-out focus:outline-none"
            aria-label="Toggle Navigation"
          >
            {({ open }: { open: boolean }) => <MenuIcon open={open} />}
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="duration-300 ease-out"
            enterFrom="opacity-0 -translate-y-full"
            enterTo="opacity-100 translate-y-0"
            leave="duration-200 ease-in"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 -translate-y-full"
          >
            <Popover.Panel
              as="div"
              className="absolute inset-x-0 top-0 z-40 w-screen overflow-y-scroll bg-gradient-to-tr from-purple-600 to-purple-600 px-4 py-16 sm:px-8"
            >
              <div className="flex h-full w-full flex-col items-center justify-center">
                <div className="mx-auto flex w-full flex-col items-center justify-evenly space-y-6">
                  {navigation.map((link) => (
                    <Fragment key={`mobile-link-${link.label}`}>
                      <Link href={link.href} title={link.label}>
                        <div className="group relative p-0.5">
                          <span className="relative z-10 text-2xl font-medium text-purple-50 duration-300 ease-in-out group-hover:text-white">
                            {link.label}
                          </span>
                          <span className="absolute -left-1 -right-1 bottom-0 h-1.5 origin-bottom scale-x-0 transform rounded-lg bg-yellow-400 duration-300 ease-in-out group-hover:scale-x-100" />
                        </div>
                      </Link>
                    </Fragment>
                  ))}
                </div>

                <hr className="my-8 w-full border-purple-200 border-opacity-30 sm:my-10" />
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
      </div>
    )
  }

  return (
    <div className="px-4 sm:px-6">
      <nav className="mx-auto flex max-w-screen-xl items-center py-3">
        <div className="flex w-full items-center justify-between">
          {/* Logo on smaller screens: < lg */}
          <Logo className="w-96 flex-shrink-0 flex-grow-0" />

          {/* Main navigation menu for large screens */}
          <div className="hidden items-center justify-between md:space-x-6 lg:flex lg:space-x-10">
            {navigation.map((link) => (
              <Fragment key={`desktop-link-${link.label}`}>
                <Link href={link.href} title={link.label}>
                  <div className="group relative p-0.5">
                    <span
                      className={clsx(
                        'relative z-10 text-lg font-medium',
                        pathname === link.href
                          ? 'text-purple-600'
                          : 'text-purple-700 duration-300 ease-in-out group-hover:text-purple-600'
                      )}
                    >
                      {link.label}
                    </span>
                    <span
                      className={clsx(
                        'absolute -left-1 -right-1 bottom-0 h-1.5 origin-bottom scale-x-0 transform rounded-lg bg-yellow-400',
                        pathname == link.href
                          ? 'scale-x-100'
                          : 'duration-300 ease-in-out group-hover:scale-x-100'
                      )}
                    />
                  </div>
                </Link>
              </Fragment>
            ))}
          </div>

          <MobileNav />
        </div>
      </nav>
    </div>
  )
}
