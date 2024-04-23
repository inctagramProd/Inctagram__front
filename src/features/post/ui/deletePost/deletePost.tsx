import { Button, Card, Icon, Typography } from '@/src/shared/ui'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { UseDeletePost } from './useDeletePost'

type Props = {
  deletePost: () => void
  onClose: () => void
  open: boolean
}

const DeletePost = ({ deletePost, onClose, open }: Props) => {
  const portalDelete = document.getElementById('portal')

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
            Delete Post
          </Typography>
          <button className="w-[24px] h-[24px] flex items-center justify-center">
            <Icon iconName="Close" />
          </button>
        </div>
        <Typography as="p" variant="regular_16" className="mb-[30px] px-[24px]">
          Are you sure you want to delete this post?
        </Typography>
        <div className="flex gap-x-[24px] px-[24px] justify-end">
          <Button onClick={deletePost} className="w-[96px]" label="Yes" style="outline" />
          <Button onClick={onClose} className="w-[96px]" label="No" style="primary" />
        </div>
      </Card>
    </div>,
    portalDelete
  )
}
export default DeletePost
