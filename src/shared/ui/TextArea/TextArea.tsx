import { ComponentPropsWithoutRef } from 'react'
import {Typography} from "@/src/shared/ui";

type Props = {
  errorMessage?: string
} & ComponentPropsWithoutRef<'textarea'>

export const TextArea = ({ errorMessage, className, ...restProps }: Props) => {
  return (
    <div className='relative'>
      <textarea
        className={` 
        w-full outline-none placeholder-light-900 border 
        rounded-sm py-1.5 px-3 bg-dark-500
        disabled:placeholder-dark-100 disabled:text-dark-100
        focus:ring-1 
        ${
          errorMessage
            ? 'border-danger-500 focus:border-danger-500 focus:ring-danger-500'
            : 'border-dark-100 focus:border-primary-700 focus:ring-primary-700'
        } ${className}`}
        {...restProps}
      />
      {errorMessage && <Typography variant='error' className="absolute -bottom-5 left-0">{errorMessage}</Typography>}
    </div>
  )
}
