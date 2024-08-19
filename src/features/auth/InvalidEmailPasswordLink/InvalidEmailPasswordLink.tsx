import { useResendPasswordRecoveryLinkMutation } from './service/invalidEmailLinkApi'
import { useState } from 'react'
import { LinkHasExpired } from '../LinkHasExpired/LinkHasExpired'

type Props = {
  userEmail: string
}

export const InvalidEmailPasswordLink = ({ userEmail }: Props) => {
  const [emailSentModal, setEmailSentModal] = useState<boolean>(false)

  const [resendLink] = useResendPasswordRecoveryLinkMutation()
  const resendLinkHandler = async () => {
    if (userEmail)
      await resendLink({ userEmail })
        .unwrap()
        .then(() => {
          setEmailSentModal(true)
        })
        .catch(e => {
          console.log(e)
        })
  }

  return (
    <div className="flex flex-col items-center mt-[35px]">
      <LinkHasExpired
        userEmail={userEmail}
        sendCallBack={resendLinkHandler}
        isOpenModal={emailSentModal}
        onOpenChangeModal={setEmailSentModal}
      />
    </div>
  )
}
