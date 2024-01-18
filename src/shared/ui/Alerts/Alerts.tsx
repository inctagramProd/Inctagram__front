import { Icon } from '@/src/shared/ui'

type Props = {
  error?: boolean
  text: string
}

export const Alerts = ({ error, text }: Props) => {
  return (
    <div
      className={`flex justify-between items-center w-[387px] h-12 px-6 border rounded-sm ${
        error ? 'bg-danger-900  border-danger-500' : 'bg-success-900  border-success-500'
      }`}
    >
      <div>
        {error && <b>Error! </b>}
        <span>{text}</span>
      </div>
      <button>
        <Icon iconName="Close" />
      </button>
    </div>
  )
}
