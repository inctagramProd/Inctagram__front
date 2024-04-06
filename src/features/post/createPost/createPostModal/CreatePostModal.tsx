import * as Dialog from '@radix-ui/react-dialog'
import {Button, Icon, Typography} from '@/src/shared/ui'
import { ReactNode } from 'react'
import { useTranslate } from '@/src/app/hooks/useTranslate'

type Props = {
  isOpen: boolean
  onCancel?: () => void
  className?: string
  children?: ReactNode
  onNextClick?: () => void
  onBackClick?: () => void
  title: string
}

export const CreatePostModal = ({ isOpen, onCancel, className, children, onNextClick, onBackClick, title }: Props) => {
  const { locale } = useTranslate()
  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay
          onClick={onCancel}
          className="fixed inset-0 bg-dark-900 bg-opacity-50 z-[999]"
        />
        <Dialog.Content
          className={`fixed left-2/4 top-2/4 translate-x-[-50%] translate-y-[-50%] bg-dark-300 z-[999] rounded border border-dark-100 ease-out duration-300 transition ${className}`}
        >
          <div className="flex items-center justify-between p-4">
            <Button style="text" label={`prev`} onClick={onNextClick}/>
            <Dialog.Title>
              <Typography variant="h1">{title}</Typography>
            </Dialog.Title>
            <Button style="text" label={locale.profile.next} onClick={onNextClick}/>
          </div>
          <div>{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
