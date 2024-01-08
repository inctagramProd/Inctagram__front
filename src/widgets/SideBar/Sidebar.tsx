import React from 'react'
import { LinkItem } from './LinkedItem'

type Props = { theme?: 'dark' | 'light'; className?: string }

export const Sidebar = (props: Props) => {
  let {
    theme = 'dark',
    className = `fixed bottom-0 left-0 sm:h-screen 
  sm:top-[60px]  sm:left-0 sm:w-[220px] 
  sm:flex-col flex flex-row
  gap-y-[60px]  z-[20]`,
  } = props
  let container = `border-r-[1px] border-dark-300 h-[60px]
                w-[100%] border-t-[1px] bg-dark-700 ${className}`,
    upperBlock = `flex w-[100%] justify-around  items-center sm:mt-[72px]
                sm:flex sm:flex-col sm:justify-between sm:items-start
                sm:ml-[24px] sm:flex-col sm:gap-y-[24px] sm:w-[196px]`,
    bodyBlock = ` flex w-[196px] flex-row gap-x-[10px]  
                items-start gap-y-[180px] sm:flex-col sm:ml-[24px]  sm:flex hidden sm:block`
  return (
    <div className={container}>
      <div className={upperBlock}>
        <LinkItem link="/home" style="default" iconName="HomeIcon" label="Home" />
        <LinkItem link="/create" style="default" iconName="PlusSquare" label="Create" />
        <LinkItem link="/profile" style="default" iconName="Person" label="My Profile" />
        <LinkItem link="/message" style="default" iconName="MessageCircle" label="Messanger" />
        <LinkItem link="/search" style="default" iconName="Search" label="Search" />
      </div>
      <div className={bodyBlock}>
        <div className={`flex sm:flex-col sm:gap-y-[24px]`}>
          <LinkItem link="/statistics" style="default" iconName="TrendingUp" label="Statistics" />
          <LinkItem link="/faivorites" style="default" iconName="Bookmark" label="Faivorites" />
        </div>
        <div className={`hidden sm:flex`}>
          <LinkItem link="/logout" style="default" iconName="LogOut" label="Log Out" />
        </div>
      </div>
    </div>
  )
}
