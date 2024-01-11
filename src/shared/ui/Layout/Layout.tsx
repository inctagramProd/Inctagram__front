import { NextPage } from 'next'
import { PropsWithChildren } from 'react'
import { Header } from '@/src/widgets/Header/Header'
import { Sidebar } from '@/src/widgets/SideBar/Sidebar'

export const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <Header className={'sticky top-0 w-full z-[991] max-sm:fixed'} />
      <div className={'max-w-screen-xl m-auto flex flex-row max-sm:flex-col'}>
        <Sidebar
          className={
            'sticky sm:top-[60px] bg-dark-700 h-[calc(100vh-60px)] px-4 flex-1 max-w-[230px] z-[990] border-t-[0px] max-sm:fixed '
          }
        />
        <div className={'sm:flex-1 overflow-hidden'}>{children}</div>
      </div>
    </div>
  )
}
