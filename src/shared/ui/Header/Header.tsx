import React, { useState } from 'react'
import s from './Header.module.css'
import { Button } from '../Button/Button'
import * as Icons from './../../assets/icons/icons'
import { Select } from '../Select/Select'
import { useRouter } from 'next/router';
import Link from 'next/link'

interface HeaderProps {
  user?: boolean
  size?: 'small' | 'medium' | 'large'
  id:number,
  fillType?: 'fill' | 'outline'
  height: number
  width: number
  theme?: 'dark' | 'light'
  value?: number
  options?: {title: string, value: string}[]
}

export const Header:React.FC<HeaderProps> = ({
  user = false,
  size = 'medium',
  id=0,
  height = 24,
  width = 24,
  fillType = 'outline',
  theme = 'dark',
  value = 0,
  options = [{ title: 'English', value: '/option1' },{ title: 'Russian', value: '/option2' },],}: HeaderProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter();
    const t=(value:any)=>{console.log(value)}
    const handleLanguage=(selectedValue:object)=>{ alert(selectedValue?.title); t(selectedValue?.title) }
    const handleLink=(selectedValue:object)=>{router.push(selectedValue?.value) }
    const linkOptions=[{ title: 'Log In', value: '/logIn' },{ title: 'Sign Up', value: '/signUp' },]
    const routerPath=(i:number)=>{router.push(`/${linkOptions[i].value}`)} 

    if (user) {
      return (
        <div className={s.container}>
          <div className={s.leftBlock}>
            <Link href={'/'}><h1 className={s.logo}>Inctagram</h1></Link>
          </div>
          <div className={s.rightBlock}>
            <div className={s.bell}>
              <Link href={`/${id}/alert`}>
                <Icons.Bell
                  width={width}
                  height={height}
                  theme={theme}
                  fillType={fillType}
                  value={value}
                />
              </Link>
            </div>
            <div className={s.selectR}>
              <Select options={options} onChange={handleLanguage}/>
            </div>
          </div>
        </div>
      )
    }
    return (
      <div className={s.container}>
        <div className={s.leftBlock}>
        <Link href={'/'}><h1 className={s.logo}>Inctagram</h1></Link>
        </div>
        <div className={s.rightBlock}>
          <div className={s.select}>
            <Select options={options} onChange={handleLanguage}/>
          </div>
          <div className={s.menu}>
          <div onMouseEnter={()=>setIsOpen(true)} onMouseLeave={()=>setIsOpen(false)}>
            {isOpen ? (
              <div>
                <Select
                  options={linkOptions}
                  onChange={handleLink}
                />
              </div>
            ) : (
              <button >
                <Icons.MoreHorizontal
                  width={width}
                  height={height}
                  theme={theme}
                  fillType={fillType}
                />
              </button>
            )}
            </div>
          </div>
          <div className={s.login}>
            <div>
              <Button size={size} label="Log In" style="text" onClick={()=>routerPath(0)} />
            </div>
            <div>
              <Button size={size} label="Sign Up" style="primary" onClick={()=>routerPath(1)} />
            </div>
          </div>
        </div>
      </div>
    )
}
