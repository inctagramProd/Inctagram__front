import GitAuth from '@/src/features/auth/signInWithSocialMedia/GitAuth'
import SignInWithSocialMedia from '@/src/features/auth/signInWithSocialMedia/GitAuth'
import GoogleAuth from '@/src/features/auth/signInWithSocialMedia/GoogleAuth'
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
      <h1 style={{ marginTop: '150px', textAlign: 'center' }}>Get logged id</h1>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        {/*      <GitAuth name="Git" />
        <GoogleAuth name="Google" /> */}
      </div>
    </>
  )
}

export default SignUp
