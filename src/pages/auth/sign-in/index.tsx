import { SignIn } from '@/src/features/auth/signIn'
import { getLayout } from '@/src/widgets/Layout/Layout'
import { HeadMeta } from '@/src/widgets/HeadMeta/HeadMeta'

const SignInPage = () => {
  return (
   <>
     <HeadMeta title='Sign In'/>
     <SignIn />
   </>
  )
}

SignInPage.getLayout = getLayout
export default SignInPage
