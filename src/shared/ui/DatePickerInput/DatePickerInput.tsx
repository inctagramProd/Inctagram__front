import React, { useState } from 'react'
import { useField, useFormikContext } from 'formik'
import DatePicker from 'react-datepicker'
import { Input, Typography } from '@/src/shared/ui'
import { format } from 'date-fns'
import { CustomInput } from '@/src/shared/ui/DatePickerInput/CustomInput/CustomInput'
// import './style.css'

import 'react-datepicker/dist/react-datepicker.css'
import * as Icons from '../../assets/icons/icons'
import { CustomHeader } from '@/src/shared/ui/DatePickerInput/CustomHeader/CustomHeader'
import Link from 'next/link'
import { useTranslate } from '@/src/app/hooks/useTranslate'

type Props = {
  error?: string
  isRange?: boolean
  label?: string
  name: string
}

export const DatePickerInput = ({ error, isRange, label, name }: Props) => {
  const { locale } = useTranslate()
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null])
  const [startDate, endDate] = dateRange
  const { setFieldValue } = useFormikContext()
  const [field, meta] = useField(name)

  const dateFormat = ['dd.MM.yyyy', 'dd-MM-yyyy', 'dd/MM/yyyy']

  const formatDate = (date: Date | null): string => (date ? format(date, 'dd/MM/yyyy') : '')

  const handleDateChange = (update: [Date | null, Date | null] | Date) => {
    const newDateRange: [Date | null, Date | null] = Array.isArray(update)
      ? update
      : [update, update]
    setDateRange(newDateRange)
    const [startDate, endDate] = newDateRange
    void setFieldValue(name, startDate)
  }

  return (
    <div className={'flex flex-col gap-0 relative'}>
      {label && <label className={'mb-1 text-light-900 text-sm'}>{label}</label>}
      <DatePicker
        {...field}
        calendarStartDay={1}
        customInput={
          <CustomInput
            error={error}
            value={formatDate(startDate)}
          />
        }
        renderCustomHeader={params => <CustomHeader {...params} />}
        dateFormat={dateFormat}
        endDate={endDate}
        showIcon
        icon={
          <Icons.Calendar
            height={24}
            iconStyle={`${
              error ? 'fill-red-500' : 'fill-light-500'
            }  absolute right-2.5 top-1.5 z-10`}
            theme={'light'}
            width={24}
          />
        }
        onChange={handleDateChange}
        selected={startDate}
        selectsRange={isRange}
        startDate={startDate}
        className='border-2'
      />
      {error && (
        <>
          <Typography variant={'error'}>
            {error}{' '}
            <Link
              className="underline underline-offset-4 text-sm"
              href={{ pathname: '/auth/privacy-policy', query: { sender: 'profile' } }}
              target="_blank"
            >
              {locale.auth.privacyAndTermsPages.titleOfPrivacyPolicy}
            </Link>
          </Typography>
        </>
      )}
    </div>
  )
}