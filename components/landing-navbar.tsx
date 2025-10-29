'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

import { useAuth } from '@/features/auth'

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
]

export default function LandingNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { status } = useAuth()

  return (
    <nav className="absolute inset-x-0 top-0 z-50">
      <div aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Next Auth Boilerplate</span>
            <img
              alt=""
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
              className="h-8 w-auto"
            />
          </Link>
        </div>
        <div className="flex md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-200"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <div className="hidden md:flex md:gap-x-12">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href} className="text-sm/6 font-semibold text-gray-900 dark:text-white">
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden md:flex lg:flex-1 md:justify-end">
          {status === 'unauthenticated' && <Link href="/auth/login" className="text-sm/6 font-semibold text-gray-900 dark:text-white">
            Log in <span aria-hidden="true">&rarr;</span>
          </Link>}
          {status === 'authenticated' && <Link href="/dashboard" className="text-sm/6 font-semibold text-gray-900 dark:text-white">
            Dashboard <span aria-hidden="true">&rarr;</span>
          </Link>}
        </div>
      </div>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white dark:bg-gray-900 p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 dark:sm:ring-gray-100/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                className="h-8 w-auto"
              />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-200"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10 dark:divide-white/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-white/5"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                {status === 'unauthenticated' && <Link
                  href="/auth/login"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-white/5"
                >
                  Log in
                </Link>}
                {status === 'authenticated' && <Link
                  href="/dashboard"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-white/5"
                >
                  Dashboard
                </Link>}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </nav>
  )
}
