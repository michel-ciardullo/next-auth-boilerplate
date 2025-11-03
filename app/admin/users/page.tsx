import Link from 'next/link'
import { Suspense } from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'
import { UserTable, UserTableSkeleton } from '@/features/admin'

export default async function AdminUsers({
  searchParams
}: {
  searchParams?: Promise<{ page?: string }>
}) {
  const params = await searchParams
  const page = Number(params?.page) || 1

  return (
    <div className="sm:ml-64 mt-16 sm:mt-14 space-y-8">
      
      <header className="px-4 sm:px-8 pt-4 sm:pt-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Users</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage user accounts, roles, and permissions.
          </p>
        </div>
        <div>
          <Link
            href="/admin/users/add"
            className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-500"
          >
            <PlusIcon className="h-5 w-5" />
            Add User
          </Link>
        </div>
      </header>

      <section className="sm:px-8">
        <div className="overflow-x-auto">

          <Suspense fallback={<UserTableSkeleton />}>
            <UserTable page={page} />
          </Suspense>
          
        </div>
      </section>

      <footer className="text-center text-sm text-gray-500 dark:text-gray-400 pt-6">
        © {new Date().getFullYear()} – User Administration
      </footer>

    </div>
  )
}
