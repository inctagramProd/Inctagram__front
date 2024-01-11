import { PropsWithChildren, ReactElement } from 'react'
import { Layout } from '@/src/widgets/Layout/BaseLayout/Layout'
import { NextPage } from 'next'

export const BaseLayout: NextPage<PropsWithChildren> = ({ children }) => {
  return <Layout>{children}</Layout>
}

export const getBaseLayout = (page: ReactElement) => {
  return <BaseLayout>{page}</BaseLayout>
}
