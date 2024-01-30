import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useEmailConfirmedMutation } from '@/src/features/auth/сonfirmRegistration/service/confirmRegistrationApi'
import { InvalidLinkVerification } from '@/src/features/auth/invalidLinkVerification'
import { EmailVerification } from '@/src/features/auth/emailVerification'
import { Typography } from '@/src/shared/ui'

export const ConfirmRegistration = () => {
  const router = useRouter()
  const queryCode = router.query as { code: string }
  const [userEmail, setUserEmail] = useState<string>('')
  const [regConfirm, { data, isLoading, isSuccess }] = useEmailConfirmedMutation()
  useEffect(() => {
    if (queryCode.code) {
      regConfirm(queryCode)
        .unwrap()
        .then(() => {})
        .catch(e => {
          const error = e as ErrorResponseType<CodeExpired>
          console.log(error)
          if (error.status === 410) {
            setUserEmail(error.data.userEmail)
          }
        })
    }
  }, [queryCode])

  if (isLoading) {
    return (
      <Typography variant="h2" className="flex justify-center items-center h-[calc(100vh - 60px)]">
        Loading...
      </Typography>
    )
  }

  return (
    <>
      {isSuccess && data ? (
        <EmailVerification />
      ) : (
        <InvalidLinkVerification userEmail={userEmail} />
      )}
    </>
  )
}

// types
export type ErrorResponseType<T = {}> = {
  status: number
  data: T
}
export type ApiResponse = {
  message: string[]
  error: string
  statusCode: number
}
type CodeExpired = {
  userEmail: string
  message: string
}
