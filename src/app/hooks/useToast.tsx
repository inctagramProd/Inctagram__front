import toast from 'react-hot-toast'
import { Alerts } from '@/src/shared/ui'

export const useToast = (error: boolean, text: string) => {
  toast.custom(t => <Alerts error={error} text={text} t={t} />, {
    position: 'bottom-left',
    duration: 4000,
    id: 'clipboard',
  })
}