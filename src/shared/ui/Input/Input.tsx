import React, { ComponentPropsWithoutRef } from 'react'

export interface InputProps extends ComponentPropsWithoutRef<'input'> {
  label?: string
  state: 'default' | 'active' | 'error' | 'hover' | 'focus'
  error?: string
}

export const Input: React.FC<InputProps> = ({ label, state, error, ...inputProps }) => {
  const baseStyle =
    'border rounded-sm pl-3 py-1.5 w-full text-light-100 placeholder-light-900 bg-transparent hover:border-light-900 focus:outline-none focus-visible:border-primary-500 focus-visible:outline-2 disabled:placeholder-dark-100 disabled:text-dark-100'
  const stateStyles = {
    default: 'border-dark-100',
    active: 'border-blue-500',
    error: 'border-red-500',
    hover: 'hover:border-gray-500',
    focus: 'focus:border-blue-600',
    // disabled: 'border-gray-300 bg-gray-100',
  }

  const errorTextStyle = 'text-red-500 text-sm mt-1'

  return (
    <div className="flex flex-col">
      <label className="mb-1 text-light-900 text-sm">{label}</label>
      <div>
        <input
          {...inputProps}
          className={`${baseStyle} ${stateStyles[state]}`}
          // disabled={state === 'disabled'}
        />
      </div>
      {state === 'error' && <span className={errorTextStyle}>{error}</span>}
    </div>
  )
}
