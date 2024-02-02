import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { ChangePassword } from '../ChangePassword'
import { InvalidEmailPasswordLink } from '@/src/widgets/InvalidEmailPasswordLink/InvalidEmailPasswordLink'
import { useValidateEmailTokenMutation } from './service/validateEmailToken'

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

  return isSuccess ? <ChangePassword /> : <InvalidEmailPasswordLink userEmail={userEmail?.email} />
}
