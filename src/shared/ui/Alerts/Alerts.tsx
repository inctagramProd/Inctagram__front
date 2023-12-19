import style from './Alerts.module.css'
import CloseIcon from '../../assets/icons/CloseIcon'

type AlertsProps = {
  error?: boolean
  text: string
}

export const Alerts = ({ error, text }: AlertsProps) => {
  return (
    <div className={`${style.alerts} ${error ? style.error : style.default}`}>
      <div className={style.message}>
        {error && <b>Error! </b>}
        <span>{text}</span>
      </div>
      <button>
        <CloseIcon className={style.closeIcon} />
      </button>
    </div>
  )
}
