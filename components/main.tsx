import { classNames } from "@/utils/functions"
import { ReactNode } from "react"

interface MainProps {
  children: ReactNode
  className?: string
}

export default function Main({ children, className }: MainProps) {
  return (
    <main className={classNames('mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8', className ?? '')}>{children}</main>
  )
}
