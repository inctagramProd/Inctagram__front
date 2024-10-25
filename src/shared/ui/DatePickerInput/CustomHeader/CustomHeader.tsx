import { type ReactDatePickerCustomHeaderProps } from 'react-datepicker'
import { getMonth, getYear } from 'date-fns'
import { useTranslate } from '@/src/app/hooks/useTranslate'
import { LocaleType } from '@/public/locales/en'
import { Icon } from '@/src/shared/ui'
import * as Icons from '../../../assets/icons/icons'

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
    <div className="flex justify-between px-1 cursor-pointer">
      <div className="" onClick={decreaseMonth}>
        <Icons.ArrowIosBack width={16} height={16} />
        назад
      </div>
      <div>
        <select
          className="bg-dark-500"
          value={getMonth(date).toString()}
          onChange={({ target: { value: month } }) => changeMonth(Number(month))}
        >
          {monthOptions.map((option, index) => (
            <option key={index} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
        <select
          className="bg-dark-500"
          value={getYear(date).toString()}
          onChange={({ target: { value: year } }) => changeYear(Number(year))}
        >
          {yearsOptions.map((option, index) => (
            <option key={index} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
      <div className="cursor-pointer" onClick={increaseMonth}>
        <Icon iconName="ArrowIosBack" />
        вперед
      </div>
    </div>
  )
}
