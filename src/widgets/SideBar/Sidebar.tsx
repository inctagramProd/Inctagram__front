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
                w-[100%] border-t-[1px] bg-dark-700 flex flex-col gap-y-[56px] py-20
                max-sm:flex max-sm:flex-row max-sm:items-center max-sm:top-unset max-sm:py-0 max-sm:px-0 max-sm:bottom-0 max-sm:max-w-none max-sm:h-[60px] max-sm:bg-dark-700 max-sm:border-dark-300 max-sm:border-r-0 max-sm:border-b-0 max-sm:border-y max-sm:pt-0
                ${className}`,
    upperBlock = `flex w-[100%] flex-col justify-around gap-y-[24px] items-start max-sm:items-center max-sm:flex-row`,
    bodyBlock = ` flex w-[196px] flex-row gap-y-[24px] gap-y-[256px]
                items-start gap-y-[180px] sm:flex-col sm:flex hidden sm:block`
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
      </div>
      <div className={`flex flex-1 items-end`}>
        <div className={`hidden sm:flex`}>
          <LinkItem link="/logout" style="default" iconName="LogOut" label="Log Out" />
        </div>
      </div>
    </div>
  )
}
