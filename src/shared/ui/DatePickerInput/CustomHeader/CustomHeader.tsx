import { type ReactDatePickerCustomHeaderProps } from 'react-datepicker'
import { getMonth, getYear } from 'date-fns'
import { useTranslate } from '@/src/app/hooks/useTranslate'
import { LocaleType } from '@/public/locales/en'
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
      <div>
        <select
          className="bg-dark-500 overflow-x-auto scrollbar-thin scrollbar-track-dark-300 scrollbar-thumb-primary-700"
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
          className="bg-dark-500 overflow-x-auto scrollbar-thin scrollbar-track-dark-300 scrollbar-thumb-primary-700"
          value={getYear(date).toString()}
          onChange={({ target: { value: year } }) => changeYear(Number(year))}
        >
          {yearsOptions.map((option, index) => (
            <option className={'border-none '} key={index} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
      <div className={'flex gap-x-1'}>
        <div
          className="w[36px] h[36px] bg-dark-100 border rounded-full cursor-pointer hover:bg-primary-500"
          onClick={decreaseMonth}
        >
          <Icons.ArrowIosBack width={20} height={20} iconStyle={'fill-white'} />
        </div>
        <div
          className="cursor-pointer bg-dark-100 rounded-full hover:bg-primary-500"
          onClick={increaseMonth}
        >
          <Icons.ArrowIosForward width={20} height={20} iconStyle={'fill-white'} />
        </div>
      </div>
    </div>
  )
}
