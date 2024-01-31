import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useValidateEmailTokenMutation } from '@/src/shared/api/authApi'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { InvalidLinkVerification } from '@/src/shared/ui/InvalidLinkVerification/ui/InvalidLinkVerification'
import { ChangePassword } from '../ChangePassword'

type ErrorResponse = {
  email: string
}

export const PasswordResetController = () => {
  const [validateEmailToken, { isLoading, isSuccess, error }] = useValidateEmailTokenMutation()
  const router = useRouter()
  const token = router.query.code

  useEffect(() => {
    if (token) {
      validateEmailToken(token)
    } else {
      router.push('/forgot-password')
    }
  }, [token, validateEmailToken])

  if (isLoading) {
    return <div>Загрузка ..</div>
  }

  const userEmail = (error as FetchBaseQueryError)?.data as ErrorResponse

  return isSuccess ? <ChangePassword /> : <InvalidLinkVerification email={userEmail?.email} />
}
