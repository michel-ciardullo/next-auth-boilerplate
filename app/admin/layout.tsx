'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Bars3Icon, HomeIcon, UsersIcon } from '@heroicons/react/24/solid'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

import useAuth from '@/app/auth/hooks/auth-hook'
import logoutAction from '@/app/auth/actions/logout-action'

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: HomeIcon },
  { name: 'Users', href: '/admin/users', icon: UsersIcon },
]

const profile = [
  { name: 'Your profile', href: '/dashboard/profile' },
  { name: 'Settings', href: '/dashboard/settings' },
]

export default function LayoutAdmin({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user } = useAuth()

  if (!user)
    return null

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <Bars3Icon aria-hidden="true" className="size-6" />
              </button>
              <Link href="/" className="flex ms-2 md:me-24 items-center">
                <img
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                  width={32}
                  height={32}
                  alt="Logo"
                  className="w-8 h-8 me-3"
                />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  Next-Auth
                </span>
              </Link>
            </div>

            <Menu as="div" className="relative flex items-center ms-3">
              <MenuButton className="flex text-sm bg-gray-800 rounded-full focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500">
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
                className="absolute right-0 top-0 z-10 mt-10 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 py-1 shadow-lg outline-1 outline-black/5 dark:outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0"
              >
                {profile.map((item, i) => 
                  <MenuItem key={i}>
                    <Link
                      href={item.href}
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5"
                    >
                      {item.name}
                    </Link>
                  </MenuItem>
                )}
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

          </div>
        </div>
      </nav>

      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'
        }`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            {navigation.map((item, i) => (
              <li key={i}>
                <Link
                  href={item.href}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <item.icon
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <circle cx="10" cy="10" r="8" />
                  </item.icon>
                  <span className="ms-3">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {children}
    </>
  )
}
