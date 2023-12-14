import React from 'react';
import './button.css';

interface ButtonProps {
  type:'primary'|'secondary'|'outline'|'text'
  size?: 'small' | 'medium' | 'large';
  label: string;
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  type='primary',
  size = 'medium',
  label,
  ...props
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={['storybook-button', `storybook-button--${size}`,` storybook-button--${type}`].join(' ')}
      {...props}
      
    >
      {label}
    </button>
  );
};
