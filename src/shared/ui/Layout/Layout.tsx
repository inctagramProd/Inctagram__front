import { NextPage } from 'next'
import { PropsWithChildren } from 'react'
import { Header } from '@/src/widgets/Header/Header'
import { Sidebar } from '@/src/widgets/SideBar/Sidebar'

export const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <Header className={'sticky top-0 w-full z-[991]'} />
      <div className={'max-w-screen-xl m-auto flex flex-row'}>
        <Sidebar
          className={
            'sidebar sticky top-[60px] bg-dark-700 h-[calc(100vh-60px)] flex-1 max-w-[230px] pt-10 z-[990] border-t-[0px]'
          }
        />
        <div className={'flex-1 overflow-hidden'}>{children}</div>
      </div>
    </div>
  )
}
