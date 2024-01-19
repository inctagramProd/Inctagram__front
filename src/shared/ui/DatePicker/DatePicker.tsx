import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import { format } from 'date-fns' // Import the format function
import 'react-datepicker/dist/react-datepicker.css'
import s from './DatePicker.module.css'
import './style.css'
import * as Icons from '../../assets/icons/icons'

type Props = {
  isRange?: boolean
  onChange?: (value: string) => void
}

type InputProps = {
  value: string
  onClick: () => void
  error?: boolean
} & Pick<Props, 'isRange'>

const CustomInput = ({ value, onClick, error, isRange }: InputProps) => {
  const inputClassname = `${s.customDateInput} ${error ? s.error : ''} ${isRange ? s.range : ''}`
  return <input className={inputClassname} value={value} onClick={onClick} readOnly />
}

export const UIDatePicker = ({ onChange, isRange }: Props) => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null])
  const [startDate, endDate] = dateRange

  const formatDate = (date: Date | null): string => {
    return date ? format(date, 'dd/MM/yyyy') : ''
  }

  return (
    <DatePicker
      selectsRange={isRange}
      startDate={startDate}
      dateFormat="dd/MM/yyyy"
      className="red-border"
      endDate={endDate}
      calendarStartDay={1}
      selected={isRange ? null : startDate}
      onChange={update => {
        if (!Array.isArray(update)) {
          setDateRange([update, update])
          if (onChange) {
            onChange(formatDate(update))
          }
        } else {
          setDateRange(update)
          if (onChange) {
            onChange(`${formatDate(update[0])} - ${formatDate(update[1])}`)
          }
        }
      }}
      customInput={
        <CustomInput
          isRange={isRange}
          error={true}
          onClick={() => {}}
          value={
            isRange
              ? `${formatDate(startDate)} - ${formatDate(endDate)}`
              : `${formatDate(startDate)}`
          }
        />
      }
      showIcon={true}
      icon={<Icons.Calendar width={20} height={20} theme={'dark'} />}
    />
  )
}
