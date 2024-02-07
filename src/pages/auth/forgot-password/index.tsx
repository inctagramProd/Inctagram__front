import { getLayout } from '@/src/widgets/Layout/Layout'
import { ForgotPassword } from '@/src/features/auth/ForgotPassword'
import { HeadMeta } from '@/src/widgets/HeadMeta/HeadMeta'

const ForgotPasswordPage = () => {
  return (
    <>
      <HeadMeta title='Forgot Password'/>
      <ForgotPassword />
    </>
  )
}

ForgotPasswordPage.getLayout = getLayout

export default ForgotPasswordPage
