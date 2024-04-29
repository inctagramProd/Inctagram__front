import { PropsWithChildren, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { AppRootState } from '@/src/app/store'
import { Header } from '@/src/widgets/Header/Header'
import { Sidebar } from '@/src/widgets/Sidebar/Sidebar'
import { NextPage } from 'next'

export const BaseLayoutWithSidebar: NextPage<PropsWithChildren> = ({ children }) => {
  // Then in your component
  const accessToken = useSelector((state: AppRootState) => state.signIn.accessToken)
  const [user, setUser] = useState(false)

  useEffect(() => {
    setUser(!!accessToken)
  }, [accessToken])

  return (
    <div>
      <Header className={'sticky top-0 w-full z-[991] max-sm:fixed'} user={user} />
      <div className={'max-w-screen-xl m-auto flex flex-row max-sm:flex-col px-4'}>
        <Sidebar
          className={
            'sticky sm:top-[60px] bg-dark-700 h-[calc(100vh-60px)] flex-1 max-w-[230px] z-[990] border-t-[0px] max-sm:fixed max-sm:left-0 '
          }
        />
        <div className={'sm:flex-1 max-sm:mt-[60px] overflow-hidden'}>{children}</div>
      </div>
    </div>
  )
}
