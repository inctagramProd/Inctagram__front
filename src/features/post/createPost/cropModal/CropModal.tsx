import * as Dialog from '@radix-ui/react-dialog'
import { Button, Typography } from '@/src/shared/ui'
import { ReactNode } from 'react'
import { useTranslate } from '@/src/app/hooks/useTranslate'

type Props = {
  isOpen: boolean
  onCancel?: () => void
  className?: string
  children?: ReactNode
  callback: () => void
}

export const CropModal = ({ isOpen, onCancel, className, children, callback }: Props) => {
  const { locale } = useTranslate()
  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay
          onClick={onCancel}
          className="fixed inset-0 bg-dark-900 bg-opacity-50 z-[999]"
        />
        <Dialog.Content
          className={`max-w-[492px] w-full h-[564px] fixed left-2/4 top-2/4 translate-x-[-50%] translate-y-[-50%] bg-dark-300 z-[999] rounded border border-dark-100 ease-out duration-300 transition ${className}`}
        >
          <div className="">
            <div className="flex items-center justify-center p-4">
              <Dialog.Title>
                <Typography variant="h1">{locale.profile.addNewPost.cropping}</Typography>
              </Dialog.Title>
              <Button style="text" label={locale.profile.next} onClick={callback} className={''} />
            </div>
          </div>
          <div className="">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
