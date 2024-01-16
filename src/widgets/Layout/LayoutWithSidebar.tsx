import { PropsWithChildren, ReactElement } from 'react'
import { BaseLayoutWithSidebar } from '@/src/widgets/Layout/BaseLayoutWithSidebar/BaseLayoutWithSidebar'
import { NextPage } from 'next'

export const LayoutWithSidebar: NextPage<PropsWithChildren> = ({ children }) => {
  return <BaseLayoutWithSidebar>{children}</BaseLayoutWithSidebar>
}

export const getLayoutWithSidebar = (page: ReactElement) => {
  return <LayoutWithSidebar>{page}</LayoutWithSidebar>
}
