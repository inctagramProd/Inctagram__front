import { ComponentPropsWithoutRef, FormEvent, useState, KeyboardEvent } from 'react'
import { Icon } from '../Icon/Icon'

type Props = {
  label?: string
  error?: string | boolean
  type: 'password' | 'search' | 'text'
} & ComponentPropsWithoutRef<'input'>

export const Input = ({ label, error, type, ...inputProps }: Props) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false)

  const inputType = type === 'password' ? (isPasswordShown ? 'text' : 'password') : type

  const togglePasswordVisibility = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!inputProps.disabled) {
      setIsPasswordShown(!isPasswordShown)
    }
  }
  const checkKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') e.preventDefault()
  }

  return (
    <div className="flex flex-col">
      {label && <label className="mb-1 text-light-900 text-sm">{label}</label>}
      <div className="relative">
        {type === 'search' && (
          <Icon
            iconName="Search"
            iconStyle="fill-dark-100 absolute left-0 inset-y-0 ml-3 my-auto"
          />
        )}
        <input
          onKeyDown={e => checkKeyDown(e)}
          {...inputProps}
          type={inputType}
          className={`border rounded-sm py-1.5 w-full
          text-light-100 placeholder-light-900
          bg-transparent
          hover:border-light-900
          focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-primary-500
          disabled:placeholder-dark-100 disabled:text-dark-100 ${
            error ? 'border-danger-500' : 'border-dark-100'
          } ${type === 'search' ? 'pl-10' : 'pl-3'}`}
        />
        {type === 'password' && (
          <button
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {isPasswordShown ? <Icon iconName="EyeOff" /> : <Icon iconName="Eye" />}
          </button>
        )}
      </div>
      {error && <span className="text-sm font-normal text-red-500 leading-normal">{error}</span>}
    </div>
  )
}
