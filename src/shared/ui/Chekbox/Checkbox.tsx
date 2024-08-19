import { ComponentPropsWithoutRef } from 'react'

type Props = Omit<ComponentPropsWithoutRef<'input'>, 'type'>

export const Checkbox = ({ children, className, ...restProps }: Props) => {
  return (
    <label>
      <input
        className={`appearance-none w-8 h-8 mr-0.5 rounded-full
        bg-no-repeat bg-center bg-[length:70%_70%] align-middle
        bg-[url('../../shared/assets/icon-svg/unchecked.svg')] 
        checked:bg-[url('../../shared/assets/icon-svg/checked.svg')]  
        disabled:bg-[url('../../shared/assets/icon-svg/disabled-unchecked.svg')]
        disabled:checked:bg-[url('../../shared/assets/icon-svg/disabled-checked.svg')]
        [&:not(:disabled)]:hover:bg-dark-300 [&:not(:disabled)]:active:bg-dark-100 
        [&:not(:disabled)]:cursor-pointer`}
        type={'checkbox'}
        {...restProps}
      />
      {children && <span className={`cursor-pointer ${className}`}>{children}</span>}
    </label>
  )
}
