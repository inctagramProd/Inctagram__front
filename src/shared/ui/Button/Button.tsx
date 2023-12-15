import React from 'react';
import  './button.css'
interface ButtonProps {
  style:'primary'|'secondary'|'outline'|'text'
  size?: 'small' | 'medium' | 'large';
  label: string;
  type?:'button'|'submit'
  onClick?: () => void;
}

export const Button = ({
  style='primary',
  size = 'medium',
  type='button',
  label,
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`btn ${style}`}
      {...props}
      
    >
      {label}
    </button>
  );
};
