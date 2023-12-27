import React, {ReactNode } from 'react';
import s from  './button.module.css'
import { Typography } from '../Typography/Typography';

interface ButtonProps {
  style:'primary'|'secondary'|'outline'|'text'|'default'
  size?: 'small' | 'medium' | 'large';
  label: string;
  type?:'button'|'submit'
  disable?:boolean
  onClick?: () => void;
  img?:string,
  btn?:ReactNode,
  height?:number;
  width?:number
  color?:string
}
export const Button = ({
  style='primary',
  size = 'medium',
  type='button',
  disable=false,
  label,
  width=24,
  height=24,
  color='primary',
  btn,
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={[s[`${style}`],s[`${size}`]].join(' ')}
      disabled={disable}
      {...props} 
    >
    <div className='mr-[10px]'>{btn}</div> 
    <Typography variant='h3'>{label}</Typography>
    </button>
  );
};
