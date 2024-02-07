import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

export type TypographyProps<T extends ElementType = 'p'> = {
  as?: T
  children: ReactNode
  variant?:
    | 'large'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'regular_16'
    | 'bold_16'
    | 'regular_14'
    | 'medium_14'
    | 'bold_14'
    | 'small'
    | 'small_semi-bold'
    | 'link_regular'
    | 'link_small'
    | 'error'
  className?: string
} & ComponentPropsWithoutRef<T>

export const Typography = <T extends ElementType = 'p'>(
  props: TypographyProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof TypographyProps<T>>
) => {
  const { variant = 'body1', className, as: Component = 'p', ...rest } = props

  const getVariantClass = (variant: string) => {
    switch (variant) {
      case 'large':
        return 'text-xxl font-semibold leading-tight'
      case 'h1':
        return 'text-xl font-bold leading-tight'
      case 'h2':
        return 'text-lg font-bold leading-normal'
      case 'h3':
        return 'text-base font-semibold leading-normal'
      case 'regular_16':
        return 'text-base font-normal leading-normal'
      case 'bold_16':
        return 'text-base font-bold leading-normal'
      case 'regular_14':
        return 'text-sm font-normal leading-normal'
      case 'medium_14':
        return 'text-sm font-medium leading-normal'
      case 'bold_14':
        return 'text-sm font-bold leading-normal'
      case 'small':
        return 'text-xs font-normal leading-loose'
      case 'small_semi-bold':
        return 'text-xs font-semibold leading-loose'
      case 'link_regular':
        return 'text-primary-500 text-sm font-semibold leading-normal underline cursor-pointer'
      case 'link_small':
        return 'text-primary-500 text-xs font-semibold leading-loose underline cursor-pointer'
      case 'error':
        return 'text-danger-500'
      default:
        return ''
    }
  }

  const variantClass = getVariantClass(variant)

  return <Component className={`${variantClass} ${className}`} {...rest} />
}
