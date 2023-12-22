import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import s from './typography.module.scss'

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
    //С помощью Omit мы убираем из пропсов переданного компонента все пропсы, которые уже есть в наших кастомных пропсах, тем самым избегая коллизий.
) => {
    const { variant = 'body1', className, as: Component = 'p', ...rest } = props

    return <Component className={`${s[variant]} ${className}`} {...rest} />
}
