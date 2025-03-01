import React from 'react'
import { Button } from '../Button/Button'
import { Modal } from '../Modal/Modal'
import { useTranslate } from '@/src/app/hooks/useTranslate'

interface Props {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export const DeletePostModal = ({ isOpen, onClose, onConfirm }: Props) => {
  const { locale } = useTranslate()
  return (
    <Modal isOpen={isOpen} onCancel={onClose} title={locale.profile.deletePost.delete}>
      <p className="mb-4">{locale.profile.deletePost.areYouSure}</p>
      <div className="flex justify-end gap-8">
        <Button
          style="outline"
          label={locale.profile.editPost.yes}
          className="w-20"
          onClick={onConfirm}
        />
        <Button
          style="primary"
          label={locale.profile.editPost.no}
          className="w-20"
          onClick={onClose}
        />
      </div>
    </Modal>
  )
}
