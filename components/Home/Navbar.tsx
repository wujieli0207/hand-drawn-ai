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

const navigation = [
  { label: 'Home', href: '/' },
  // { label: 'About', href: '/about' },
  // { label: 'Programs' },
  // { label: 'Gallery', href: '/gallery' },
  // { label: 'Parents', href: '/parents' },
  // { label: 'Contact', href: '/contact' },
]

export function Navbar() {
  const pathname = usePathname()

  function Logo({ className }: { className?: string }) {
    return (
      <div className={clsx(className)}>
        <Link href="/" title={siteName} className="flex items-center">
          <Image
            src="/favicon/favicon.svg"
            alt={siteName}
            width={44}
            height={44}
          />
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
                      {link.label !== 'Programs' && (
                        <Link href={link.href} title={link.label}>
                          <div className="group relative p-0.5">
                            <span className="relative z-10 text-2xl font-medium text-purple-50 duration-300 ease-in-out group-hover:text-white">
                              {link.label}
                            </span>
                            <span className="absolute -left-1 -right-1 bottom-0 h-1.5 origin-bottom scale-x-0 transform rounded-lg bg-yellow-400 duration-300 ease-in-out group-hover:scale-x-100" />
                          </div>
                        </Link>
                      )}
                    </Fragment>
                  ))}
                </div>

                <hr className="my-8 w-full border-purple-200 border-opacity-30 sm:my-10" />

                <div className="mx-auto w-full max-w-md">
                  <p className="text-center text-lg font-semibold uppercase tracking-wider text-purple-200 sm:text-left">
                    Programs
                  </p>
                  {/* <div className="mt-4 grid justify-items-center gap-4 sm:grid-cols-2 sm:justify-items-start sm:gap-x-8">
                    {programs.map((program, index) => (
                      <Link
                        href={`/programs/${program.slug}`}
                        key={`mobile-dropdown-${program.data.name}`}
                        className={clsx(
                          index % 2 == 1 && 'sm:justify-self-end'
                        )}
                      >
                        <div className="group relative p-0.5">
                          <span className="relative z-10 text-xl font-medium text-purple-50 duration-300 ease-in-out group-hover:text-white">
                            {program.data.name}
                          </span>
                          <span className="absolute -left-1 -right-1 bottom-0 h-1.5 origin-bottom scale-x-0 transform rounded-lg bg-yellow-400 duration-300 ease-in-out group-hover:scale-x-100" />
                        </div>
                      </Link>
                    ))}
                  </div> */}
                </div>
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
                {link.label == 'Programs' ? (
                  <Menu as="div" className="relative">
                    {({ open }: { open: boolean }) => (
                      <>
                        <Menu.Button className="outline-none focus:outline-none">
                          <div className="group relative p-0.5">
                            <span
                              className={clsx(
                                'relative z-10 flex items-center text-lg font-medium duration-300 ease-in-out group-hover:text-purple-600',
                                open ? 'text-purple-600' : 'text-purple-700'
                              )}
                            >
                              Programs
                              {/* Heroicon name: solid/chevron-down */}
                              {/* Toggle class 'rotate-180' on dropdown open and close */}
                              <Icon
                                icon="chevronDown"
                                className={clsx(
                                  'h-4.5 ml-1.5 w-4.5 transform duration-300 ease-in-out',
                                  open && 'rotate-180'
                                )}
                                stroke={2}
                              />
                            </span>
                            <span className="absolute -left-1 -right-1 bottom-0 h-1.5 origin-bottom scale-x-0 transform rounded-lg bg-yellow-400 duration-300 ease-in-out group-hover:scale-x-100" />
                          </div>
                        </Menu.Button>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-300"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-200"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          {/* <Menu.Items className="absolute left-1/2 z-20 mt-3 w-screen max-w-xs -translate-x-1/2 rounded-2xl border border-gray-50 bg-white p-4 shadow-lg outline-none focus:outline-none">
                            {programs.map((program, index) => (
                              <Menu.Item
                                key={`desktop-dropdown-link-${program.data.name}`}
                                as="div"
                              >
                                {({ close }) => (
                                  <>
                                    <Link
                                      href={`/programs/${program.slug}`}
                                      className={clsx(
                                        'group block w-full rounded-xl py-4 sm:p-5',
                                        pathname === `/programs/${program.slug}`
                                          ? 'bg-purple-25'
                                          : 'transition duration-200 ease-in-out hover:bg-purple-25/60'
                                      )}
                                      onClick={close}
                                    >
                                      <h5 className="text-lg font-semibold text-purple-600">
                                        {program.data.name}
                                      </h5>
                                      <p className="mt-1 text-sm text-purple-800 opacity-90">
                                        {program.data.dropdownDescription}
                                      </p>
                                    </Link>
                                    {index != programs.length - 1 && (
                                      <>
                                        <hr className="my-1 border-purple-200/30 sm:my-2" />
                                      </>
                                    )}
                                  </>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items> */}
                        </Transition>
                      </>
                    )}
                  </Menu>
                ) : (
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
                )}
              </Fragment>
            ))}
          </div>

          <MobileNav />
        </div>
      </nav>
    </div>
  )
}
