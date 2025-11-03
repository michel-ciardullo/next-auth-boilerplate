interface FormErrorsProps {
  errors: string[] | undefined
}

export default function FormErrors({ errors }: FormErrorsProps) {
  if (!errors || errors.length === 0)
    return null
  return (
    <small className="text-red-600 dark:text-red-400 block mt-1">
      {errors[0]}
    </small>
  )
}
