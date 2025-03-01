import * as Dialog from '@radix-ui/react-dialog'
import { Button, Icon, Typography } from '@/src/shared/ui'
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
  onShowLeftButton: boolean
  onShowRightButton: boolean
}

export const CreatePostModal = ({
  isOpen,
  onCancel,
  className,
  children,
  onNextClick,
  onBackClick,
  title,
  onShowLeftButton,
  onShowRightButton,
}: Props) => {
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
          <div className="border-b border-dark-100 flex items-center px-6 h-14">
            {onShowLeftButton && (
              <div className="flex-1 flex items-center">
                <button onClick={onBackClick}>
                  <Icon
                    iconName="ArrowIosBack"
                    width={24}
                    height={24}
                    iconStyle="fill-light-100 hover:fill-primary-500"
                  />
                </button>
              </div>
            )}
            <Dialog.Title>
              <Typography variant="h1" className='flex-1'>
                {title}
              </Typography>
            </Dialog.Title>
            {onShowRightButton ? (
              <div className="flex-1">
                <Button style="text" className='ml-auto' label={locale.profile.next} onClick={onNextClick} />
              </div>
            ) : (
              <Dialog.Close asChild>
                <div className="flex-1 flex items-center">
                  <button onClick={onCancel} className='ml-auto'>
                    <Icon iconName="Close" iconStyle="fill-light-100 hover:fill-primary-500" />
                  </button>
                </div>
              </Dialog.Close>
            )}
          </div>
          <div>{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
