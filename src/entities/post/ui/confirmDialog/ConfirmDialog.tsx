import { Button, Modal, Typography } from '@/src/shared/ui'
import React from 'react'
import { useTranslate } from '@/src/app/hooks/useTranslate'

type Props = {
  isConfirmModalOpen: boolean
  setIsConfirmModalOpen: (value: boolean) => void
  closeConfirmDialog: () => void
}

export const ConfirmDialog = ({
  isConfirmModalOpen,
  setIsConfirmModalOpen,
  closeConfirmDialog,
}: Props) => {
  const { locale } = useTranslate()

  return (
    <Modal
      title={locale.profile.addNewPost.close}
      isOpen={isConfirmModalOpen}
      onCancel={() => {
        setIsConfirmModalOpen(false)
      }}
    >
      <div className="mt-3">
        <Typography variant="regular_16" className="mb-5">
          {locale.profile.addNewPost.areYouSure}
        </Typography>
        <div className="flex justify-between">
          <Button
            style="outline"
            label={locale.profile.addNewPost.discard}
            onClick={closeConfirmDialog}
          />
          <Button
            style="primary"
            label={locale.profile.addNewPost.saveDraft}
            onClick={closeConfirmDialog}
          />
        </div>
      </div>
    </Modal>
  )
}