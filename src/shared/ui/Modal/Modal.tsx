import * as Dialog from '@radix-ui/react-dialog'
import { Typography, Icon } from '@/src/shared/ui'
import { ReactNode } from 'react'

type Props = {
  isOpen: boolean
  title: string
  onCancel?: () => void
  className?: string
  footer?: ReactNode[]
  children?: ReactNode
}

export const Modal = ({ isOpen, title, onCancel, className, footer, children }: Props) => {
  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay
          onClick={onCancel}
          className="fixed inset-0 bg-dark-900 bg-opacity-50 z-[999]"
        />
        <Dialog.Content
          className={`fixed left-2/4 top-2/4 translate-x-[-50%] translate-y-[-50%] max-w-[378px] bg-dark-300 z-[999] rounded border border-dark-100 ease-out duration-300 transition ${className}`}
        >
          <div className="border-b border-dark-100">
            <div className="flex items-center justify-between p-4">
              <Dialog.Title>
                <Typography variant="h1">{title}</Typography>
              </Dialog.Title>
              <Dialog.Close asChild>
                <button onClick={onCancel}>
                  <Icon iconName="Close" />
                </button>
              </Dialog.Close>
            </div>
          </div>
          <div className="p-4">{children}</div>
          {footer && (
            <div className="p-4 flex gap-2 justify-end">
              {footer.map(item => (
                <div>{item}</div>
              ))}
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
