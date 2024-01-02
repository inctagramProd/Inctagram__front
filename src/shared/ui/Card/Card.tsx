import { ComponentPropsWithoutRef } from 'react'

type Props = ComponentPropsWithoutRef<'div'>

export const Card = ({ className, ...restProps }: Props) => {
  return (
    <div
      className={`bg-dark-500 border rounded border-dark-300 max-w-sm w-full p-6 break-words ${className}`}
      {...restProps}
    ></div>
  )
}
