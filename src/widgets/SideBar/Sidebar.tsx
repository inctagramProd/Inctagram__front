import React, { useState } from 'react'
import s from './Sidebar.module.css'
import { Button } from '../../shared/ui/Button/Button'
import Icon from '../../shared/ui/Icon/Icon'
import Link from 'next/link'

interface ButtonProps {theme?: 'dark' | 'light'}

export const Sidebar = ({ theme = 'dark', ...props }: ButtonProps) => {
  const [fill,setFill]=useState<'fill' | 'outline'>('outline')
  const mouseEnter=()=>{setFill('fill')}
  const mouseLeave=()=>{setFill('outline')}
  function linkItem(link:string,iconName:string,label:string,icon:boolean){
    return(
      <Link href={link}> 
      {icon?<div className={s.icon} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}><Icon iconName={iconName} style="primary" fillType={fill}/></div>:null}
      <div className={s.button}><Button label={label} style="default" btn={<Icon iconName={iconName} style="primary" />} /></div>
    </Link>
    )
  }
  return (
    <div className={[s.container, s[`${theme}`]].join(' ')}>
      <div className={s.upperBlock}>
        {linkItem('/home','HomeIcon','Home',true)}
        {linkItem('/create','PlusSquare','Create',true)}
        {linkItem('/person','Person','My profile',true)}
        {linkItem('/message','MessageCircle','Messenger',true)}
        {linkItem('/search','Search','Search',true)}
      </div>
      <div className={s.middleBlock}>
      {linkItem('/statisticst','TrendingUp','Statisticst',false)}
      {linkItem('/favorites','Bookmark','Favorites',false)}
      </div>
      <div className={s.bottomBlock}>
      {linkItem('/logout','LogOut','Log Out',false)}
      </div>
    </div>
  )
}
