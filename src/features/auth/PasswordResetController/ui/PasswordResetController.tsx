import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ChangePassword } from '../../ChangePassword'
import { useValidateEmailTokenMutation } from '../service/validateEmailToken'
import { InvalidEmailPasswordLink } from '../../InvalidEmailPasswordLink/InvalidEmailPasswordLink'
import { LoaderSpin } from '@/src/shared/ui'

export const PasswordResetController = () => {
  const [userEmail, setUserEmail] = useState('')
  const router = useRouter()
  const token = router.query.code
  const [validateEmailToken, { isLoading, isSuccess, isError }] = useValidateEmailTokenMutation()

  useEffect(() => {
    if (token) {
      validateEmailToken(token)
        .unwrap()
        .catch(error => {
          if (error.status === 410) {
            setUserEmail(error.data.userEmail)
          }
        })
    }
  }, [token, validateEmailToken])

  if (isLoading) {
    return  (
      <div className="flex items-center justify-center h-[calc(100vh-60px)]">
       <LoaderSpin />
      </div>)
  }

  return isSuccess ? (
    <ChangePassword />
  ) : (
    isError && <InvalidEmailPasswordLink userEmail={userEmail} />
  )
}
