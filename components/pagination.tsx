'use client'

import Link from 'next/link'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'

interface PaginationProps {
  page: number
  total: number
  perPage: number
}

export function Pagination({ page, total, perPage }: PaginationProps) {
  const totalPages = Math.ceil(total / perPage)
  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-between border-t border-gray-200 dark:border-white/10 bg-white dark:bg-transparent px-4 py-3 sm:px-6">
      <div className="hidden md:flex md:flex-1 md:items-center md:justify-between">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Showing <span className="font-medium">{(page - 1) * perPage + 1}</span> to{' '}
          <span className="font-medium">
            {Math.min(page * perPage, total)}
          </span>{' '}
          of <span className="font-medium">{total}</span> results
        </p>
        <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-xs">
          <Link
            href={`?page=${Math.max(page - 1, 1)}`}
            className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 dark:text-gray-400 inset-ring inset-ring-gray-300 dark:inset-ring-gray-700 hover:bg-gray-50 dark:hover:bg-white/5 focus:z-20 ${
              page === 1 ? 'pointer-events-none opacity-50' : ''
            }`}
          >
            <ChevronLeftIcon aria-hidden="true" className="size-5" />
          </Link>

          {Array.from({ length: totalPages }, (_, i) => (
            <Link
              key={i}
              href={`?page=${i + 1}`}
              className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                page === i + 1
                  ? 'z-10 bg-indigo-600 text-white dark:bg-indigo-500'
                  : 'text-gray-900 dark:text-gray-200 inset-ring inset-ring-gray-300 dark:inset-ring-gray-700 hover:bg-gray-50 dark:hover:bg-white/5'
              }`}
            >
              {i + 1}
            </Link>
          ))}

          <Link
            href={`?page=${Math.min(page + 1, totalPages)}`}
            className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 dark:text-gray-400 inset-ring inset-ring-gray-300 dark:inset-ring-gray-700 hover:bg-gray-50 dark:hover:bg-white/5 focus:z-20 ${
              page === totalPages ? 'pointer-events-none opacity-50' : ''
            }`}
          >
            <ChevronRightIcon aria-hidden="true" className="size-5" />
          </Link>
        </nav>
      </div>
    </div>
  )
}
