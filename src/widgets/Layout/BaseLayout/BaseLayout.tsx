import { PropsWithChildren, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { AppRootState } from '@/src/app/store'
import { Header } from '@/src/widgets/Header/Header'
import { NextPage } from 'next'

export const BaseLayout: NextPage<PropsWithChildren> = ({ children }) => {
  const accessToken = useSelector((state: AppRootState) => state.signIn.accessToken)
  const [user, setUser] = useState(false)

  useEffect(() => {
    setUser(!!accessToken)
  }, [accessToken])

  return (
    <div>
      <Header className={'sticky top-0 w-full z-[991] max-sm:fixed'} user={user} />
      <div className={'max-w-screen-xl m-auto flex flex-row px-4 max-sm:flex-col'}>
        <div className={'sm:flex-1 max-sm:mt-[60px] overflow-hidden'}>{children}</div>
      </div>
    </div>
  )
}
