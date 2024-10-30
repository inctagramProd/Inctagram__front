import React, { useState } from 'react'
import { useField, useFormikContext } from 'formik'
import DatePicker from 'react-datepicker'
import { Typography } from '@/src/shared/ui'
import { format } from 'date-fns'
import { CustomInput } from '@/src/shared/ui/DatePickerInput/CustomInput/CustomInput'
import 'react-datepicker/dist/react-datepicker.css'
import './DatePicker.css'
import * as Icons from '../../assets/icons/icons'
import { CustomHeader } from '@/src/shared/ui/DatePickerInput/CustomHeader/CustomHeader'
import Link from 'next/link'
import { useTranslate } from '@/src/app/hooks/useTranslate'
import { enUS, ru } from 'date-fns/locale'
import { useRouter } from 'next/router'

type Props = {
  error?: string
  isRange?: boolean
  label?: string
  name: string
}

export const DatePickerInput = ({ error, isRange, label, name }: Props) => {
  const { locale } = useTranslate()
  const { locale: currentLocale } = useRouter()

  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null])
  const [startDate, endDate] = dateRange
  const { setFieldValue } = useFormikContext()
  const [field] = useField(name)

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
        dateFormat={dateFormat}
        startDate={startDate}
        selected={startDate}
        selectsRange={isRange}
        endDate={endDate}
        onChange={handleDateChange}
        renderCustomHeader={params => <CustomHeader {...params} />}
        customInput={<CustomInput error={error} value={formatDate(startDate)} />}
        locale={currentLocale === 'ru' ? ru : enUS}
        className={'border border-danger-500'}
        calendarClassName="bg-dark-900 text-red-500"
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