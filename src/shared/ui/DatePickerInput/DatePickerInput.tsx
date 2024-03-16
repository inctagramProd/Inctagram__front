import React, { useState } from 'react'
import DatePicker from 'react-datepicker'

import { Typography } from '@/src/shared/ui'
import { format } from 'date-fns'

import './style.css'
import 'react-datepicker/dist/react-datepicker.css'

import * as Icons from '../../assets/icons/icons'

type Props = {
  errorMsg?: string
  hasError?: boolean
  isRange?: boolean
  label?: string
  onChange?: (value: string) => void
}

const CustomInput = ({
  hasError,
  isRange,
  onClick,
  value,
}: Props & { onClick: () => void; value: string }) => {
  const baseClassname =
    'border rounded-sm py-1.5 w-full text-light-100 placeholder-light-900 bg-transparent hover:border-light-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:placeholder-dark-100 disabled:text-dark-100 border-dark-100'
  const errorClassname = hasError ? 'text-danger-300 border border-danger-500' : ''
  const rangeClassname = isRange ? 'w-full' : ''

  return (
    <>
      <input
        className={`${baseClassname} ${errorClassname} ${rangeClassname}`}
        onClick={onClick}
        readOnly
        value={value}
      />
    </>
  )
}

export const DatePickerInput = ({ errorMsg, hasError, isRange, label, onChange }: Props) => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null])
  const [startDate, endDate] = dateRange

  const formatDate = (date: Date | null): string => (date ? format(date, 'dd/MM/yyyy') : '')

  const handleDateChange = (update: [Date | null, Date | null] | Date) => {
    const newDateRange: [Date | null, Date | null] = Array.isArray(update)
      ? update
      : [update, update]

    setDateRange(newDateRange)
    if (onChange) {
      onChange(newDateRange.map(formatDate).join(' - '))
    }
  }

  return (
    <div className={'flex flex-col gap-0 relative'}>
      {label && <label className={'mb-1 text-light-900 text-sm'}>{label}</label>}
      <DatePicker
        calendarStartDay={1}
        customInput={
          <CustomInput
            hasError={hasError}
            isRange={isRange}
            onClick={() => {}}
            value={
              isRange
                ? `${formatDate(startDate)} - ${formatDate(endDate)}`
                : `${formatDate(startDate)}`
            }
          />
        }
        dateFormat={'dd/MM/yyyy'}
        endDate={endDate}
        icon={
          <Icons.Calendar
            height={24}
            iconStyle={`${
              hasError ? 'fill-red-500' : 'fill-light-500'
            }  absolute right-2.5 top-1.5 z-10`}
            theme={'light'}
            width={24}
          />
        }
        onChange={handleDateChange}
        selected={isRange ? null : startDate}
        selectsRange={isRange}
        showIcon
        startDate={startDate}
      />
      {errorMsg && <Typography variant={'error'}>{errorMsg}</Typography>}
    </div>
  )
}

export default DatePickerInput
/*  */
