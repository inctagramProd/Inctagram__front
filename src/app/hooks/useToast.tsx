import toast from 'react-hot-toast'
import { Alerts } from '@/src/shared/ui'

export const useToast = (text: string, error?: boolean) => {
  toast.custom(t => <Alerts text={text} id={t.id} error={error} />, {
    position: 'bottom-left',
    duration: 4000,
    id: 'clipboard',
  })
}