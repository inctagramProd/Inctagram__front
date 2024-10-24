import { type ReactDatePickerCustomHeaderProps } from 'react-datepicker'
import { getMonth, getYear } from 'date-fns'
import { Button } from '@/src/shared/ui/Button/Button'
// import s from './CustomHeader.module.scss'
import { useTranslate } from '@/src/app/hooks/useTranslate'
import { LocaleType } from '@/public/locales/en'
import React from 'react'

const rangeYears = (start: number, end: number): any[] => {
  return Array.from({ length: end - start }, (_, i) => {
    const value = (start + i).toString()

    return { name: value, value: value }
  })
}

const rangeMonth = (t: LocaleType['dates']): any[] => {
  return [
    { name: t.month.January, value: '0' },
    { name: t.month.February, value: '1' },
    { name: t.month.March, value: '2' },
    { name: t.month.April, value: '3' },
    { name: t.month.May, value: '4' },
    { name: t.month.June, value: '5' },
    { name: t.month.July, value: '6' },
    { name: t.month.August, value: '7' },
    { name: t.month.September, value: '8' },
    { name: t.month.October, value: '9' },
    { name: t.month.November, value: '10' },
    { name: t.month.December, value: '11' },
  ]
}

type CustomHeaderProps = Pick<
  ReactDatePickerCustomHeaderProps,
  'changeMonth' | 'changeYear' | 'date' | 'decreaseMonth' | 'increaseMonth'
>

export const CustomHeader = (props: CustomHeaderProps) => {
  const { changeMonth, changeYear, date, decreaseMonth, increaseMonth } = props

  const { locale } = useTranslate()

  const yearsOptions = rangeYears(getYear(new Date()) - 100, getYear(new Date()) + 1)

  const monthOptions = rangeMonth(locale.dates)

  return (
    <div className={''}>
      <select
        // classNames={{ trigger: clsx(s.select, s.month), viewport: s.viewport }}
        onChange={month => changeMonth(Number(month))}
        // options={monthOptions}
        defaultValue={getMonth(date).toString()}
      >
        {monthOptions.map(t => (
          <option>{t.name}</option>
        ))}
      </select>
      <select
        // classNames={{ trigger: clsx(s.select, s.year), viewport: s.viewport }}
        onChange={year => changeYear(Number(year))}
        // options={yearsOptions}
        defaultValue={getYear(date).toString()}
      >
        {yearsOptions.map(t => (
          <option>{t.name}</option>
        ))}
      </select>
      <div className={''}>
        <Button label="right" className={''} onClick={decreaseMonth} type="button" style="text" />
        <Button label="left" className={''} onClick={increaseMonth} type="button" style="text" />
      </div>
    </div>
  )
}
