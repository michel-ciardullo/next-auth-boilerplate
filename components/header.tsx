import { ReactNode } from "react"

interface HeaderProps {
  children: ReactNode
}

export default function Header({ children }: HeaderProps) {
  return (
    <header className="relative bg-white dark:bg-gray-800 shadow-sm dark:after:pointer-events-none dark:after:absolute dark:after:inset-x-0 dark:after:inset-y-0 dark:after:border-y dark:after:border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">{children}</h1>
      </div>
    </header>
  )
}
