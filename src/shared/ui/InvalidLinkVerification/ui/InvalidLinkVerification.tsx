import { useTranslate } from '@/src/app/hooks/useTranslate'
import TimeIsOverIcon from '@/src/shared/assets/icons/TimeIsOverIcon'
import { Button, Modal, Typography } from '@/src/shared/ui'
import { useState } from 'react'
import {
  useResendPasswordRecoveryLinkMutation,
  useResendSignUpLinkMutation,
} from '../service/invalidLinkVerification'

type Props = {
  userEmail: string
  isSignUp: boolean
}
export const InvalidLinkVerification = ({ userEmail, isSignUp }: Props) => {
  const { locale } = useTranslate()
  const [emailSentModal, setEmailSentModal] = useState<boolean>(false)

  const [resendLink, { isLoading, isSuccess }] = useResendSignUpLinkMutation()

  const resendLinkHandler = () => {
    if (userEmail)
      resendLink({ userEmail })
        .unwrap()
        .then(() => {
          setEmailSentModal(true)
        })
  }

  return (
    <div className="flex flex-col items-center mt-[35px]">
      <Modal
        isOpen={emailSentModal}
        onOpenChange={() => {
          setEmailSentModal(false)
        }}
        email={userEmail}
      />
      <div className="mb-[31px] text-center max-w-[300px]">
        <Typography variant="h1" className="mb-[19px]">
          {locale.auth.emailVerificationTitle}
        </Typography>
        <Typography variant="regular_16">{locale.auth.emailVerificationText}</Typography>
      </div>
      <div className="mb-[30px]">
        <Button
          style="primary"
          label={isSignUp ? locale.auth.resendLink : locale.auth.sendLinkAgain}
          onClick={resendLinkHandler}
        />
      </div>
      <div>
        <TimeIsOverIcon />
      </div>
    </div>
  )
}
