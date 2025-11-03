'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

import { classNames } from '@/utils/functions'
import { Role } from '@/app/generated/prisma'
import useAuth from '../auth/hooks/auth-hook'
import logoutAction from '../auth/actions/logout-action'

const navigation = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Team', href: '#' },
  { name: 'Projects', href: '#' },
  { name: 'Calendar', href: '#' },
  { name: 'Reports', href: '#' },
]

export default function Navbar() {
  const pathname = usePathname()

  const { user, status } = useAuth()
  const loading = status === 'loading'

  return (
    <Disclosure as="nav" className="bg-gray-800 dark:bg-gray-800/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left section */}
          <div className="flex items-center">
            <div className="shrink-0">
              <Link href="/">
                <img
                  alt="Your Company"
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                  className="size-8"
                />
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    aria-current={pathname.startsWith(item.href) ? 'page' : undefined}
                    className={classNames(
                      pathname.startsWith(item.href)
                        ? 'bg-gray-900 dark:bg-gray-950/50 text-white'
                        : 'text-gray-300 hover:bg-white/5 hover:text-white',
                      'rounded-md px-3 py-2 text-sm font-medium'
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right section */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {/* Notifications */}
              {user && (
                <button
                  type="button"
                  className="rounded-full p-1 text-gray-400 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon aria-hidden="true" className="size-6" />
                </button>
              )}

              {/* Profile dropdown OR Auth buttons */}
              {loading ? (
                <div className="text-sm text-gray-400">Loading...</div>
              ) : user ? (
                <Menu as="div" className="relative ml-3">
                  <MenuButton className="flex max-w-xs items-center rounded-full focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500">
                    <span className="sr-only">Open user menu</span>
                    <img
                      alt={user.name || 'User'}
                      src={
                        user.image ||
                        'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.name || 'User')
                      }
                      className="size-8 rounded-full outline -outline-offset-1 outline-white/10"
                    />
                  </MenuButton>

                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 py-1 shadow-lg outline-1 outline-black/5 dark:outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0"
                  >
                    {user.role === Role.ADMIN && <MenuItem>
                      <Link
                        href="/admin"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5"
                      >
                        Admin
                      </Link>
                    </MenuItem>}
                    <MenuItem>
                      <Link
                        href="/dashboard/profile"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5"
                      >
                        Your profile
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        href="/dashboard/settings"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5"
                      >
                        Settings
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <form action={logoutAction}>
                        <button
                          type="submit"
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5"
                        >
                          Sign out
                        </button>
                      </form>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              ) : (
                <div className="flex gap-3">
                  <Link
                    href="/auth/login"
                    className="text-sm font-medium text-gray-300 hover:text-white px-3 py-1.5"
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/register"
                    className="rounded-md bg-indigo-600 dark:bg-indigo-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-500 dark:hover:bg-indigo-400"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile button */}
          <div className="-mr-2 flex md:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <DisclosurePanel className="md:hidden">
        <div className="space-y-1 pt-2 pb-3 px-2 sm:px-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as={Link}
              href={item.href}
              aria-current={pathname.startsWith(item.href) ? 'page' : undefined}
              className={classNames(
                pathname.startsWith(item.href)
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-white/5 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium'
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>

        {/* Mobile user / auth section */}
        <div className="border-t border-white/10 pt-4 pb-3">
          {user ? (
            <>
              <div className="flex items-center px-5">
                <div className="shrink-0">
                  <img
                    alt={user.name || ''}
                    src={
                      user.image ||
                      'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.name || 'User')
                    }
                    className="size-10 rounded-full outline -outline-offset-1 outline-white/10"
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-white">{user.name}</div>
                  <div className="text-sm font-medium text-gray-400">{user.email}</div>
                </div>
              </div>
              <div className="mt-3 space-y-1 px-2">
                <DisclosureButton
                  as={Link}
                  href="/admin"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-white/5 hover:text-white"
                >
                  Admin
                </DisclosureButton>
                <DisclosureButton
                  as={Link}
                  href="/dashboard/profile"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-white/5 hover:text-white"
                >
                  Your profile
                </DisclosureButton>
                <DisclosureButton
                  as={Link}
                  href="/dashboard/settings"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-white/5 hover:text-white"
                >
                  Settings
                </DisclosureButton>
                <form action={logoutAction}>
                  <button
                    type="submit"
                    className="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-white/5 hover:text-white"
                  >
                    Sign out
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="px-5 space-y-2">
              <Link
                href="/auth/login"
                className="block w-full text-center rounded-md bg-indigo-600 dark:bg-indigo-500 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 dark:hover:bg-indigo-400"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="block w-full text-center text-sm font-semibold text-gray-300 hover:text-white"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}
