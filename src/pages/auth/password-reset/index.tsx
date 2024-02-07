import { getLayout } from '@/src/widgets/Layout/Layout'
import { HeadMeta } from '@/src/widgets/HeadMeta/HeadMeta'
import { PasswordResetController } from '@/src/features/auth/PasswordResetController'

const ResetPasswordPage = () => {
  return (
    <>
      <HeadMeta title='Change Password'/>
      <PasswordResetController />
    </>
  )
}

ResetPasswordPage.getLayout = getLayout

export default ResetPasswordPage
