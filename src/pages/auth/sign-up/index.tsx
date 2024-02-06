import { SignUp } from '@/src/features/auth/signUp'
import { getLayout } from '@/src/widgets/Layout/Layout'

const SignUpPage = () => {
  return <SignUp />
}

SignUpPage.getLayout = getLayout
export default SignUpPage
