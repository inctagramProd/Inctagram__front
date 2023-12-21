import React, {ChangeEvent, ComponentPropsWithoutRef,} from 'react'
import styles from './textArea.module.css'


type TextAreaPropsType = {
    error?: string
} & ComponentPropsWithoutRef<'textarea'>
/**
 * Text Area UI component
 */
export const TextArea: React.FC<TextAreaPropsType> = ({
                                                          id,
                                                          onChange,
                                                          className,
                                                          error,
                                                          ...restProps
                                                      }) => {

    const onChangeCallback = (changeEvent: ChangeEvent<HTMLTextAreaElement>) => {
        onChange?.(changeEvent)
    }

    return (
        <div>
           <textarea
               className={`${styles.textArea} ${error ? styles.error : ''} ${className}`}
               autoFocus
               id={id}
               onChange={onChangeCallback}
               {...restProps}
           />
            {error && <span className={styles.errorMessage}>{error}</span>}
        </div>

    )
}