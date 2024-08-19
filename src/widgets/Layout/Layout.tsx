import { PropsWithChildren, ReactElement } from 'react'

import { StoreProvider } from '@/src/app/providers'
import { BaseLayout } from '@/src/widgets/Layout/BaseLayout/BaseLayout'
import { NextPage } from 'next'

export const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <StoreProvider>
      <BaseLayout>{children}</BaseLayout>
    </StoreProvider>
  )
}

export const getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}
