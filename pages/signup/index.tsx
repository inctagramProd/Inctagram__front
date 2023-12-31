import { Inter } from 'next/font/google'
import Head from 'next/head'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

const SignUp = () => {
  return (
    <>
      <Head>
        <title>Welcome to Inctagram!</title>
        <meta content={'Generated by create next app'} name={'description'} />
        <meta content={'width=device-width, initial-scale=1'} name={'viewport'} />
        <link href={'/favicon.ico'} rel={'icon'} />
        <Link href={`/signup`} />
      </Head>
      <h1 style={{ marginTop: '150px', textAlign: 'center' }}>Create a new Profile</h1>
    </>
  )
}

export default SignUp
