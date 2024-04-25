import { Button, Card, Icon, Typography } from '@/src/shared/ui'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useTranslate } from '@/src/app/hooks/useTranslate'

type Props = {
  deletePost: () => void
  onClose: () => void
  open: boolean
}

export const DeletePost = ({ deletePost, onClose, open }: Props) => {
  const portalDelete = document.getElementById('portal')

  const { locale } = useTranslate()

  if (!portalDelete) return null

  const closeByEsc = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', closeByEsc)
    return () => {
      document.removeEventListener('keydown', closeByEsc)
    }
  })

  if (!open) return null

  return createPortal(
    <div
      className="flex fixed w-[100%] h-[100vh] top-0 right-0 bottom-0 left-0 bg-[rgb(13,13,13)] justify-center items-center"
      onClick={onClose}
    >
      <Card
        className="px-0 pt-[12px] pb-[36px] w-[378px] h-[216px]"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center px-[24px] pb-[11px] border-b-[1px] border-[rgb(76,76,76)] mb-[30px]">
          <Typography as="h1" variant="h1">
            {locale.profile.deletePost.delete}
          </Typography>
          <button className="w-[24px] h-[24px] flex items-center justify-center">
            <Icon iconName="Close" />
          </button>
        </div>
        <Typography as="p" variant="regular_16" className="mb-[30px] px-[24px]">
          {locale.profile.deletePost.areYouSure}
        </Typography>
        <div className="flex gap-x-[24px] px-[24px] justify-end">
          <Button
            onClick={deletePost}
            className="w-[96px]"
            label={locale.profile.deletePost.yes}
            style="outline"
          />
          <Button
            onClick={onClose}
            className="w-[96px]"
            label={locale.profile.deletePost.no}
            style="primary"
          />
        </div>
      </Card>
    </div>,
    portalDelete
  )
}

