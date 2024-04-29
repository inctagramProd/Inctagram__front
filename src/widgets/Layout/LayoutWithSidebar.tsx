import { PropsWithChildren, ReactElement } from 'react'

import { StoreProvider } from '@/src/app/providers'
import { BaseLayoutWithSidebar } from '@/src/widgets/Layout/BaseLayoutWithSidebar/BaseLayoutWithSidebar'
import { NextPage } from 'next'

export const LayoutWithSidebar: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <StoreProvider>
      <BaseLayoutWithSidebar>{children}</BaseLayoutWithSidebar>
    </StoreProvider>
  )
}

export const getLayoutWithSidebar = (page: ReactElement) => {
  return <LayoutWithSidebar>{page}</LayoutWithSidebar>
}
