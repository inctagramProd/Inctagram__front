import '@/src/app/styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import { NextPage } from 'next'
import { ReactElement, ReactNode } from 'react'
import { StoreProvider } from '../app/providers'
import { Toaster } from 'react-hot-toast'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? (page => page)

  return getLayout(
    <main className={`${inter.variable} font-sans`}>
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>
      <Toaster />
    </main>
  )
}
