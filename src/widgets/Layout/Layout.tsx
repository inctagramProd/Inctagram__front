import { PropsWithChildren, ReactElement } from 'react'
import { BaseLayout } from '@/src/widgets/Layout/BaseLayout/BaseLayout'
import { NextPage } from 'next'

export const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return <BaseLayout>{children}</BaseLayout>
}

export const getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}
