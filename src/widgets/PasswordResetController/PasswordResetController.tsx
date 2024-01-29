import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useValidateEmailTokenMutation } from '@/src/shared/api/authApi'
import { InvalidLinkVerification } from '../InvalidLinkVerification/InvalidLinkVerification'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { ChangePasswordForm } from '../ChangePasswordForm'

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

  return isSuccess ? <ChangePasswordForm /> : <InvalidLinkVerification email={userEmail?.email} />
}
