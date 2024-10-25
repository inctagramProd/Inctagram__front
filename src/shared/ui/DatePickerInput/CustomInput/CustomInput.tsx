import { ComponentPropsWithoutRef, forwardRef } from 'react'

type Props = {
  error?: string
  hasError?: boolean
  isRange?: boolean
  label?: string
  onChange?: (value: string) => void
} & ComponentPropsWithoutRef<'input'>

export const CustomInput = forwardRef<HTMLInputElement, Props>(
  ({ error, hasError, isRange, label, onChange, onClick, value }, ref) => {
    const baseClassname =
      'border rounded-sm py-1.5 w-full text-light-100 placeholder-light-900 bg-transparent hover:border-light-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:placeholder-dark-100 disabled:text-dark-100 border-dark-100'
    const errorClassname = hasError ? 'text-danger-300 border border-danger-500' : ''
    const rangeClassname = isRange ? 'w-full' : ''

    return (
      <input
        ref={ref}
        className={`${baseClassname} ${errorClassname} ${rangeClassname}`}
        onClick={onClick}
        readOnly
        value={value}
        autoComplete="off"
      />
    )
  }
)