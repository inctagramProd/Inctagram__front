import { Inter } from 'next/font/google'
import Head from 'next/head'
import Link from 'next/link'
import { getLayout } from '@/src/shared/ui/Layout/BaseLayout/BaseLayout'

const inter = Inter({ subsets: ['latin'] })

const SignUp = () => {
  return (
    <div className={`h-[10000px]`}>
      <Head>
        <title>Welcome to Inctagram!</title>
        <meta content={'Generated by create next app'} name={'description'} />
        <meta content={'width=device-width, initial-scale=1'} name={'viewport'} />
        <link href={'/favicon.ico'} rel={'icon'} />
        <Link href={`/signup`} />
      </Head>
      <h1 style={{ marginTop: '150px', textAlign: 'center' }}>Get logged id</h1>
    </div>
  )
}

SignUp.getLayout = getLayout

export default SignUp
