import React, {
    ChangeEvent,
    DetailedHTMLProps,
    InputHTMLAttributes,
} from 'react'
import style from './checkbox.module.css'

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement>

type CheckboxPropsType = Omit<DefaultInputPropsType, 'type'> & {
    className?: string
}
/**
 * Check-box UI component
 */
export const Checkbox: React.FC<CheckboxPropsType> = ({
                                                          id,
                                                          children,
                                                          onChange,
                                                          className,
                                                          ...restProps
                                                      }) => {

    const onChangeCallback = (changeEvent: ChangeEvent<HTMLInputElement>) => {
        onChange?.(changeEvent)
    }

    return (
        <label className={`${style.label} ${className}`}>
            <input
                id={id}
                type={'checkbox'}
                onChange={onChangeCallback}
                {...restProps}
            />
            {children && (
                <span className={style.textLabel}>
                    {children}
                </span>
            )}
        </label>
    )
}