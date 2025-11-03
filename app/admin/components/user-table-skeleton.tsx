export default function UserTableSkeleton() {
  return (
    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 animate-pulse">
      <thead className="bg-gray-50 dark:bg-gray-800">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Name
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Email
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Role
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Status
          </th>
          <th className="px-6 py-3"></th>
        </tr>
      </thead>
      <tbody  className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
        {Array.from({ length: 6 }).map((_, i) => (
          <tr key={i}>
            <td className="px-6 py-4">
              <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </td>
            <td className="px-6 py-4">
              <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </td>
            <td className="px-6 py-4">
              <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </td>
            <td className="px-6 py-4">
              <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </td>
            <td className="px-6 py-4 flex gap-3 justify-end">
              <div className="h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              <div className="h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
