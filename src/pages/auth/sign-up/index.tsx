import { SignUp } from '@/src/features/auth/signUp'
import { getLayout } from '@/src/widgets/Layout/Layout'
import { HeadMeta } from '@/src/widgets/HeadMeta/HeadMeta'

const SignUpPage = () => {
  return (
   <>
     <HeadMeta title='Sign Up'/>
     <SignUp />
   </>
  )
}

SignUpPage.getLayout = getLayout
export default SignUpPage
