import { ComponentPropsWithoutRef, forwardRef } from 'react'

type Props = {
  error?: string
} & ComponentPropsWithoutRef<'input'>

export const CustomInput = forwardRef<HTMLInputElement, Props>(
  ({ error, onClick, value }, ref) => {
    
    return (
      <input
        ref={ref}
        className={`border rounded-sm py-1.5 w-full
          text-light-100 placeholder-light-900
          bg-transparent
          hover:border-light-900
          focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-primary-500
          disabled:placeholder-dark-100 disabled:text-dark-100 ${
            error ? 'border-danger-500' : 'border-dark-100'
          }`}
        onClick={onClick}
        readOnly
        value={value}
        autoComplete="off"
      />
    )
  }
)