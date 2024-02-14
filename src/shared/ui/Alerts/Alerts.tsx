import { Icon } from '@/src/shared/ui'
import toast, { Toast } from 'react-hot-toast'

type Props = {
  error?: boolean
  text: string
  t: Toast
}

export const Alerts = ({ error, text, t }: Props) => {
  return (
    <div
      className={`flex justify-between items-center w-[387px] py-3.5 px-6 border rounded-sm ${
        error ? 'bg-danger-900  border-danger-500' : 'bg-success-900  border-success-500'
      }`}
    >
      <div>
        {error && <b>Error! </b>}
        <span>{text}</span>
      </div>
      <button onClick={() => toast.remove(t.id)}>
        <Icon iconName="Close" />
      </button>
    </div>
  )
}
