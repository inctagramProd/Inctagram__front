import { PropsWithChildren, ReactElement } from 'react'
import { Layout } from '@/src/widgets/Layout/BaseLayoutWithSidebar/Layout'
import { NextPage } from 'next'

export const BaseLayoutWithSidebar: NextPage<PropsWithChildren> = ({ children }) => {
  return <Layout>{children}</Layout>
}

export const getBaseLayoutWithSidebar = (page: ReactElement) => {
  return <BaseLayoutWithSidebar>{page}</BaseLayoutWithSidebar>
}
