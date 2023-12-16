import React, { ComponentPropsWithoutRef, useState } from 'react'
import styles from './Input.modules.css';
import EyeIcon from '../../assets/icons/EyeIcon';
import EyeCloseIcon from '../../assets/icons/EyeCloseIcon';
import SearchIcon from '../../assets/icons/SearchIcon';

export interface InputProps extends ComponentPropsWithoutRef<'input'> {
  label?: string
  error?: string
  type: 'password' | 'search' | 'text'
}

export const Input: React.FC<InputProps> = ({ label, error, type, ...inputProps }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const inputType = type === 'password' ? (isPasswordShown ? 'text' : 'password') : type

  const togglePasswordVisibility = () => {
    setIsPasswordShown(!isPasswordShown);
  }
  
  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.inputField}>
        {type === 'search' && <SearchIcon className={styles.searchIcon} />}
        <input
          {...inputProps}
          type={inputType}
          className={`${styles.input} ${error ? styles.error : ''} ${type === 'search' ? styles.search : '' }`}
        />
        {type === 'password' && (<button onClick={togglePasswordVisibility} className={styles.button}>
          {isPasswordShown ? <EyeCloseIcon className={styles.eyeIcon} /> : <EyeIcon className={styles.eyeIcon} /> }
        </button>)}
      </div>
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  )
}
