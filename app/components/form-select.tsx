'use client'

import { classNames } from "@/utils/functions"
import { SelectHTMLAttributes } from "react"

interface Option<T = string> {
  value: T
  label: string
}

interface FormSelectProps<T = string> extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Option<T>[]
}

export default function FormSelect<T extends string | number>(props: FormSelectProps<T>) {
  return (
    <select
      {...props}
      className={classNames(
        'mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500',
        props.className || ''
      )}
    >
      {props.options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  )
}
