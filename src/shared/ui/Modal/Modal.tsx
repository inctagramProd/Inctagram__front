import * as Dialog from '@radix-ui/react-dialog'
import { Typography, Icon, Button } from '@/src/shared/ui'
import { useTranslate } from '@/src/app/hooks/useTranslate'
import { ReactNode } from 'react'

type Props = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  email: string
  children?: ReactNode
}

export const Modal = ({ isOpen, onOpenChange, email }: Props) => {
  const { locale } = useTranslate()

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-dark-900 bg-opacity-50 z-[999]" />
        <Dialog.Content className="fixed bg-dark-300 rounded top-1/3 left-1/2 z-[999] transform -translate-x-1/2 -translate-y-1/2 border border-dark-100 max-w-[378px]">
          <div className="border-b border-dark-100">
            <div className="flex items-center justify-between p-4">
              <Dialog.Title>
                <Typography variant="h1">{locale.auth.emailSent}</Typography>
              </Dialog.Title>
              <Dialog.Close asChild>
                <button>
                  <Icon iconName="Close" />
                </button>
              </Dialog.Close>
            </div>
          </div>
          <div className="p-4">
            <Dialog.Description className="mt-2">
              <Typography variant="regular_16">{locale.auth.emailConfirm(email)}</Typography>
            </Dialog.Description>
            <div className="mt-4 flex justify-end">
              <Button style="primary" label="ОК" onClick={() => onOpenChange(false)} />
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
