import { NextPage } from 'next'
import { PropsWithChildren } from 'react'
import { Header } from '@/src/widgets/Header/Header'

export const BaseLayout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <Header className={'sticky top-0 w-full z-[991] max-sm:fixed'} />
      <div className={'max-w-screen-xl m-auto flex flex-row px-4 max-sm:flex-col'}>
        <div className={'sm:flex-1 max-sm:mt-[60px] overflow-hidden'}>{children}</div>
      </div>
    </div>
  )
}
