import { SignIn } from '@/src/features/auth/signIn'
import { getLayout } from '@/src/widgets/Layout/Layout'

const SignInPage = () => {
  return <SignIn />
}

SignInPage.getLayout = getLayout
export default SignInPage
