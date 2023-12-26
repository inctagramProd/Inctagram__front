import React, { useState } from 'react'
import s from './Header.module.css'
import { useRouter } from 'next/router';
import Link from 'next/link'
import { Button } from '../../ui/Button/Button';
import { Select } from '../../ui/Select/Select';
import Icon from '../../ui/Icon/Icon';

interface HeaderProps {
  user?: boolean
  id?:number,
  fillType?: 'fill' | 'outline'
  height?: number
  width?: number
  theme?: 'dark' | 'light'
  value?: number
  options?: {title: string, value: string}[]
  style?:'primary'|'secondary'|'outline'|'text'
}

export const Header:React.FC<HeaderProps> = ({
  user = false,
  id=0,
  height = 24,
  width = 24,
  fillType = 'outline',
  theme = 'dark',
  value = 0,
  style='primary',
  options = [{ title: 'English', value: '/option1' },{ title: 'Russian', value: '/option2' },],}: HeaderProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter();
    const t=(value:any)=>{console.log(value)}
    const handleLanguage=(selectedValue:object)=>{ alert(selectedValue?.title); t(selectedValue?.title) }
    const handleLink=(selectedValue:object)=>{router.push(selectedValue?.value) }
    const linkOptions=[{ title: 'Log In', value: '/logIn' },{ title: 'Sign Up', value: '/signUp' },]
    const routerPath=(i:number)=>{router.push(`/${linkOptions[i].value}`)} 
    const FontColor=theme==='dark'?'light':'dark'
    if (user) {
      return (
        <div className={s.container}>
          <div className={s.leftBlock}>
            <Link href={'/'}><h1 className={`mt-[12px] ml-[15px] sm:ml-[60px] leading-[36px] text-[26px] text-${FontColor}-100`}>Inctagram</h1></Link>
          </div>
          <div className={s.rightBlock}>
            <div className={s.bell}>
              <Link href={`/${id}/alert`}>
                <Icon 
                    iconName='Bell' 
                    width={width} 
                    height={height} 
                    value={value} 
                    fillType={fillType} 
                    style={style}
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
        <Link href={'/'}><h1 className={`mt-[12px] ml-[15px] sm:ml-[60px] leading-[36px] text-[26px] text-${FontColor}-100`}>Inctagram</h1></Link>
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
                <button>
                    <Icon 
                        iconName='MoreHorizontal' 
                        width={width} 
                        height={height} 
                        value={value} 
                        fillType={fillType} 
                        style={style}
                />
                </button>
            )}
            </div>
          </div>
          <div className={s.login}>
            <div>
              <Button  label="Log In" style="text" onClick={()=>routerPath(0)} />
            </div>
            <div>
              <Button  label="Sign Up" style="primary" onClick={()=>routerPath(1)} />
            </div>
          </div>
        </div>
      </div>
    )
}