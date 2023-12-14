import React, { ComponentPropsWithoutRef } from 'react'

export interface InputProps extends ComponentPropsWithoutRef<'input'> {
  label?: string
  state: 'default' | 'active' | 'error' | 'hover' | 'focus' | 'disabled'
  error?: string
}

export const Input: React.FC<InputProps> = ({ label, state, error, ...inputProps }) => {
  const baseStyle = 'border-2 p-2'
  const stateStyles = {
    default: 'border-warning-300',
    active: 'border-blue-500',
    error: 'border-red-500',
    hover: 'hover:border-gray-500',
    focus: 'focus:border-blue-600',
    disabled: 'border-gray-300 bg-gray-100',
  }

  const errorTextStyle = 'text-red-500 text-sm mt-1'

  return (
    <div>
      <label>{label}</label>
      <input
        {...inputProps}
        className={`${baseStyle} ${stateStyles[state]}`}
        disabled={state === 'disabled'}
      />
      {state === 'error' && <span className={errorTextStyle}>{error}</span>}
    </div>
  )
}
