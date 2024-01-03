import React, { useRef, useState, useEffect } from 'react'
import { Typography } from '@/src/shared/ui/Typography/Typography'
import Icon from '@/src/shared/ui/Icon/Icon'

export type SelectOptionType = {
  title: string | number
  value: string | number
}

type Props = {
  title?: string
  disabled?: boolean
  defaultValue?: string | number
  variant?: 'Default' | 'Pagination'
  options: SelectOptionType[]
  onChange?: (selectedValue: SelectOptionType) => any
}

export const Select = ({
  title,
  options,
  defaultValue,
  variant = 'Default',
  disabled = false,
  onChange,
  ...props
}: Props) => {
  const defaultOption: SelectOptionType | undefined = defaultValue
    ? options.find((option: SelectOptionType) => option.value === defaultValue)
    : options[0]

  const [activeOption, setActiveOption] = useState({
    title: defaultOption?.title || '',
    value: defaultOption?.value || '',
  })

  const [isVisibleDropdown, setIsVisibleDropdown] = useState(false)

  // Close dropdown if click outside
  const wrapperRef: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null)
  useEffect(() => {
    document.addEventListener('click', handleClickOutside, false)
    return (): void => {
      document.removeEventListener('click', handleClickOutside, false)
    }
  }, [])

  const handleClickOutside = (e: { target: any }): void => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
      setIsVisibleDropdown(false)
    }
  }

  const setDropdownActiveOption = (): void => {
    if (isVisibleDropdown) {
      return setIsVisibleDropdown(false)
    }
    return setIsVisibleDropdown(true)
  }

  const handleSetActiveOption = (e: React.SyntheticEvent<EventTarget>): void => {
    const target = e.target as HTMLElement
    const { title, value } = target.dataset

    if (!title || !value) {
      return
    }

    const activeOptionFields: SelectOptionType = { title, value }
    if (activeOptionFields) {
      setActiveOption(activeOptionFields)
    }

    if (onChange) {
      onChange(activeOptionFields)
    }
  }

  return (
    <div
      className={`max-w-sm relative disabled:opacity-10 ${disabled ? 'cursor-not-allowed' : ''}`}
      {...props}
    >
      <span className={`text-light-900 block text-sm`}>
        <Typography children={title} variant={'regular_14'} />
      </span>
      <div
        ref={wrapperRef}
        onClick={setDropdownActiveOption}
        className={`border-light-900 flex items-center justify-between gap-2 select-none w-full cursor-pointer text-light-100 border px-2 py-1.5 rounded-sm hover:text-light-900 ${
          disabled ? 'pointer-events-none border-dark-100' : ''
        } ${isVisibleDropdown ? 'border-light-100 bg-dark-500' : ''} ${
          variant === 'Pagination'
            ? 'px-2 py-0.5 bg-dark-500 border-dark-300 text-light-100 text-sm'
            : ''
        }`}
        tabIndex={0}
      >
        <span
          className={`flex flex-row items-center gap-2 ${
            disabled ? 'text-dark-100 text-base' : ''
          }`}
        >
          <Typography children={activeOption.title} variant={'regular_16'} />
        </span>
        <div
          className={`w-5 h-5 flex justify-center items-center transform-gpu transition-transform ${
            isVisibleDropdown ? 'rotate-180' : ''
          }`}
        >
          <Icon iconName={'ArrowIosDown'} width={20} height={20} />
        </div>
      </div>

      <ul
        className={`transition-all origin-top ease-in-out max-h-72 overflow-y-auto absolute w-full border bg-dark-500 rounded-b-sm -mt-px opacity-0 z-[-1] transform-gpu scale-y-0 ${
          isVisibleDropdown ? 'opacity-100 z-10 transform-gpu scale-y-100' : ''
        } ${variant === 'Pagination' ? 'bg-dark-500 border-dark-300' : ''}`}
      >
        {options.map((item: SelectOptionType) => (
          <li
            key={item.value}
            data-value={item.value}
            data-title={item.title}
            aria-selected={activeOption.value == item.value}
            role={'option'}
            onClick={handleSetActiveOption}
            className={`py-2 px-4 flex flex-row items-center gap-2 cursor-pointer select-none text-light-100 hover:bg-dark-300 hover:text-primary-500 text-base ${
              activeOption.value == item.value ? 'bg-dark-300 text-primary-500' : ''
            } ${variant === 'Pagination' ? 'px-2 py-0.5 text-light-100 text-sm' : ''}`}
            tabIndex={-1}
          >
            <Typography children={item.title} variant={'regular_14'} />
          </li>
        ))}
      </ul>
    </div>
  )
}
