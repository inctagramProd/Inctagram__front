import { useTranslate } from '@/src/app/hooks/useTranslate'
import TimeIsOverIcon from '@/src/shared/assets/icons/TimeIsOverIcon'
import { Typography, Button, Modal } from '@/src/shared/ui'
import React from 'react'

type Props = {
  userEmail: string
  sendCallBack: () => void
  isOpenModal: boolean
  onOpenChangeModal: (value: boolean) => void
}

export const LinkHasExpired = ({
  userEmail,
  sendCallBack,
  isOpenModal,
  onOpenChangeModal,
}: Props) => {
  const { locale } = useTranslate()

  return (
    <div className="flex flex-col items-center mt-[35px]">
      <Modal
        isOpen={isOpenModal}
        title="Письмо отправлено"
        onCancel={() => onOpenChangeModal(false)}
        footer={[
          <Button label="Ok" style="primary" onClick={() => onOpenChangeModal(false)}></Button>,
        ]}
      >
        <p>Мы отправили ссылку для подтверждения электронной почты на {userEmail}</p>
      </Modal>
      <div className="mb-[31px] text-center max-w-[300px]">
        <Typography variant="h1" className="mb-[19px]">
          {locale.auth.emailVerificationTitle}
        </Typography>
        <Typography variant="regular_16">{locale.auth.emailVerificationText}</Typography>
      </div>
      <div className="mb-[30px]">
        <Button style="primary" label={locale.auth.resendLink} onClick={sendCallBack} />
      </div>
      <div>
        <TimeIsOverIcon />
      </div>
    </div>
  )
}
