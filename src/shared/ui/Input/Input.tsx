import { ComponentPropsWithoutRef, FormEvent, useState } from 'react'

import { Icon } from '../Icon/Icon'

type Props = {
  error?: boolean | string
  label?: string
  required?: boolean
  type: 'password' | 'search' | 'text'
} & ComponentPropsWithoutRef<'input'>

export const Input = ({ error, label, required, type, ...inputProps }: Props) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const inputType = type === 'password' ? (isPasswordShown ? 'text' : 'password') : type

  const togglePasswordVisibility = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!inputProps.disabled) {
      setIsPasswordShown(!isPasswordShown)
    }
  }

  const requiredItem = <div className={'text-danger-500'}>*</div>

  return (
    <div className={'flex flex-col'}>
      <div className={'flex flex-row gap-1'}>
        {label && <label className={'mb-1 text-light-900 text-sm'}>{label}</label>}
        {required ? requiredItem : ''}
      </div>

      <div className={'relative'}>
        {type === 'search' && (
          <Icon
            iconName={'Search'}
            iconStyle={'fill-dark-100 absolute left-0 inset-y-0 ml-3 my-auto'}
          />
        )}
        <input
          {...inputProps}
          className={`border rounded-sm py-1.5 w-full
          text-light-100 placeholder-light-900
          bg-transparent
          hover:border-light-900
          focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-primary-500
          disabled:placeholder-dark-100 disabled:text-dark-100 ${
            error ? 'border-danger-500' : 'border-dark-100'
          } ${type === 'search' ? 'pl-10' : 'pl-3'}`}
          type={inputType}
        />
        {type === 'password' && (
          <button
            className={'absolute inset-y-0 right-0 pr-3 flex items-center'}
            onClick={togglePasswordVisibility}
          >
            {isPasswordShown ? <Icon iconName={'EyeOff'} /> : <Icon iconName={'Eye'} />}
          </button>
        )}
      </div>
      {error && <span className={'text-sm font-normal text-red-500 leading-normal'}>{error}</span>}
    </div>
  )
}
