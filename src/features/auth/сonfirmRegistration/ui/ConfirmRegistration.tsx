import {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import {useEmailConfirmedMutation} from '@/src/features/auth/сonfirmRegistration/service/confirmRegistrationApi'
import {InvalidLinkVerification} from '@/src/features/auth/invalidLinkVerification'
import {EmailVerification} from '@/src/features/auth/emailVerification'
import {LoaderSpin} from "@/src/shared/ui/Loader/Loader";

export const ConfirmRegistration = () => {
  const router = useRouter()
  const queryCode = router.query as { code: string }
  const [userEmail, setUserEmail] = useState<string>('')
  const [regConfirm, { data, isLoading, isSuccess }] = useEmailConfirmedMutation()
  useEffect(() => {
    if (queryCode.code) {
      regConfirm(queryCode)
        .unwrap()
        .catch(e => {
          console.log(e)
          const error = e as { data: { userEmail: string; message: string }; status: number }
          if (error.status === 410) {
            setUserEmail(error.data.userEmail)
          }
        })
    }
  }, [queryCode])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-60px)]">
        <LoaderSpin />
      </div>
    )
  }

  return (
    <>{isSuccess ? <EmailVerification /> : <InvalidLinkVerification userEmail={userEmail} />}</>
  )
}
