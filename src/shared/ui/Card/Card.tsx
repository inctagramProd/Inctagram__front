import {ComponentPropsWithoutRef} from "react";
import style from './card.module.css'

export type CardProps = {} & ComponentPropsWithoutRef<'div'>
/**
 * Card UI component
 */
export const Card = ({className, ...restProps}: CardProps) => {
    return <div className={`${style.card} ${className}`} {...restProps}></div>
}