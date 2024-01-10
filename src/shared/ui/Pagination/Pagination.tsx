import React, { useEffect, useState } from 'react'
import { Select } from './../Select/Select'
import { transformNumberToArray } from '@/src/shared/ui/Pagination/utils/transformNumberToArray'
import { Typography } from '@/src/shared/ui/Typography/Typography'
import Icon from '@/src/shared/ui/Icon/Icon'
import { SelectOptionType } from '@/src/shared/ui/Select/Select'

type PropsItemsPerPage = 10 | 20 | 30 | 50 | 100

type Props = {
  total: number
  defaultCurrent?: number
  itemsPerPage?: PropsItemsPerPage
  onChange?: (selected: number | undefined) => number | undefined
}

const ITEMS_PER_PAGE_LIST: PropsItemsPerPage[] = [10, 20, 30, 50, 100]

export const Pagination = ({
  total,
  defaultCurrent = 1,
  itemsPerPage = 10,
  onChange,
  ...props
}: Props) => {
  const [activePage, setActivePage] = useState(defaultCurrent)
  const [itemsPerPageValue, setItemsPerPageValue] = useState(itemsPerPage)
  const [pagesCount, setPagesCount] = useState(Math.ceil(total / itemsPerPageValue))

  const pagesArray: any[] = transformNumberToArray(pagesCount, activePage)

  useEffect((): void => {
    setActivePage(defaultCurrent)
    setPagesCount(Math.ceil(total / itemsPerPageValue))
  }, [total, defaultCurrent, itemsPerPageValue])

  const handleSetActivePage = (page: number): void => {
    if (page !== activePage) {
      setActivePage(page)
      if (onChange) {
        onChange(page)
      }
    }
  }

  const handlePrevClick = (): void => {
    const newPage: number = Math.max(activePage - 1, 1)
    handleSetActivePage(newPage)
  }

  const handleNextClick = (): void => {
    const newPage: number = Math.min(activePage + 1, pagesCount)
    handleSetActivePage(newPage)
  }

  return (
    <div className={`inline-flex items-center gap-4`} {...props}>
      <ul className={`inline-flex gap-5`}>
        <li
          className={`
            flex align-middle items-center px-2 py-0.5 rounded-sm transition-opacity select-none text-light-100 bg-opacity-0 cursor-pointer hover:bg-dark-500 hover:bg-opacity-100
          `}
          onClick={handlePrevClick}
          tabIndex={0}
        >
          <Icon iconName={'ArrowIosBack'} width={18} height={18} />
        </li>
        {pagesArray.map((page: number | '...', i: number) => {
          return (
            <li
              key={i}
              className={`flex align-middle items-center px-2 py-0.5 rounded-sm transition-opacity select-none bg-opacity-0 cursor-pointer hover:bg-dark-500 hover:bg-opacity-100 
              ${
                activePage === page
                  ? 'bg-opacity-100 bg-light-100 text-dark-900 hover:bg-light-100 hover:text-dark-900'
                  : 'text-light-100'
              }
              `}
              onClick={() => {
                if (typeof page === 'number') {
                  handleSetActivePage(page)
                }
              }}
              tabIndex={0}
            >
              <Typography variant={'regular_14'} children={page} />
            </li>
          )
        })}
        <li
          className={`
            flex align-middle items-center px-2 py-0.5 rounded-sm transition-opacity select-none text-light-100 bg-opacity-0 cursor-pointer hover:bg-dark-500 hover:bg-opacity-100
            ${activePage === pagesCount ? 'opacity-30 cursor-not-allowed' : ''}
          `}
          onClick={handleNextClick}
          tabIndex={0}
        >
          <Icon iconName={'ArrowIosForward'} width={18} height={18} />
        </li>
      </ul>
      <div className={`inline-flex items-center gap-2 text-sm text-light-100`}>
        <Typography variant={'regular_14'} children={'Show'} />
        <Select
          defaultValue={itemsPerPageValue}
          variant={'Pagination'}
          onChange={(selectedValue: SelectOptionType): void => {
            setItemsPerPageValue(selectedValue.value as PropsItemsPerPage)
            setActivePage(1)
          }}
          options={ITEMS_PER_PAGE_LIST.map((item: PropsItemsPerPage) => {
            return { title: item, value: item }
          })}
        />
        <Typography variant={'regular_14'} children={'on page'} />
      </div>
    </div>
  )
}
