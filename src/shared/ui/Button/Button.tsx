import React from 'react';
import s from  './button.module.css'
interface ButtonProps {
  style:'primary'|'secondary'|'outline'|'text'
  size?: 'small' | 'medium' | 'large';
  label: string;
  type?:'button'|'submit'
  disable?:boolean
  onClick?: () => void;
}
export const Button = ({
  style='primary',
  size = 'medium',
  type='button',
  disable=false,
  label,
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={[s[`${style}`],s[`${size}`]].join(' ')}
      disabled={disable}
      {...props}
     
    >
      {label}
    </button>
  );
};
