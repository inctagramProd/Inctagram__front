import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useEmailConfirmedMutation } from '@/src/features/auth/сonfirmRegistration/service/confirmRegistrationApi'
import { InvalidLinkVerification } from '@/src/features/auth/invalidLinkVerification'
import { EmailVerification } from '@/src/features/auth/emailVerification'
import { Typography } from '@/src/shared/ui'

export const ConfirmRegistration = () => {
  const router = useRouter()
  const code = router.query as unknown as string

  const [regConfirm, { data, isLoading, isSuccess }] = useEmailConfirmedMutation()

  useEffect(() => {
    if (code) {
      regConfirm({ code: code as string })
    }
  }, [code])
  if (isLoading) {
    return (
      <Typography variant="h2" className="flex justify-center items-center h-[90vh]">
        Loading...
      </Typography>
    )
  }

  return <>{isSuccess && data ? <EmailVerification /> : <InvalidLinkVerification />}</>
}
