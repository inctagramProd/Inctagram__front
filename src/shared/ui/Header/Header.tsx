import React from 'react'
import s from './Header.module.css'
import { Button } from '../Button/Button'
import * as Icons from './../../assets/icons/icons';
import { Select } from '../Select/Select';


interface HeaderProps {
  user?: boolean
  size?:'small'|'medium'|'large'
  fillType?:'fill'|'outline'
  theme?:"dark"|'light'
  onLogin?: () => void
  value?:number,
  options: {
    title: string;
    value: string;
}[];
  onCreateAccount?: () => void

}

export const Header = ({ 
  user,size='medium', onLogin, onCreateAccount,
  fillType='outline',theme='dark',value=0,
  options=[{ title: 'English', value: 'option1' },{ title: 'Russian', value: 'option2' },]}: HeaderProps) => {
 
  return (
    <div className={s.container}>
      <div className={s.subContainer}>
        <div className={s.leftBlock}>
          <div className={s.logo}>
            <h1>Inctagram</h1>
          </div>
        </div>
        <div className={s.rightBlock}>
            {user?
            <div className={s.LoggedIn}>
            <div className="w-163px h-[36px]"><Select options={options} /></div>
            <div className="w-100px h-[36px] absolute right-[120px]">
              <Button size={size} label="Log In" style="text" onClick={onLogin} />
            </div>
            <div className="w-100px absolute right-0 h-[36px]">
              <Button size={size} label="Sign up" style="primary" onClick={onCreateAccount} />
            </div>
            </div>
            :  
            <div className={s.LoggedOut}>
              <div className={'w-[24px] h-24px h-36px ml-[24px]'}><Icons.Bell width={24} height={24} fillType={fillType} theme={theme} value={value} /></div>
            <div className="w-163px h-[36px]"><Select options={options} /></div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}



