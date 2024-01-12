import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Button } from '../../shared/ui/Button/Button'
import { Select } from '../../shared/ui/Select/Select'
import Icon from '../../shared/ui/Icon/Icon'
import { Typography } from '@/src/shared/ui/Typography/Typography'
import { SelectOptionType } from '../../shared/ui/Select/Select'

type Props = {
  user?: boolean
  id?: number
  fillType?: 'fill' | 'outline'
  height?: number
  width?: number
  theme?: 'dark' | 'light'
  value?: number
  options?: { title: string; value: string }[]
  style?: 'primary' | 'secondary' | 'outline' | 'text'
  className: string
}
export const Header = (props: Props) => {
  const {
    user = false,
    id = 0,
    height = 24,
    width = 24,
    fillType = 'outline',
    theme = 'dark',
    value = 0,
    style = 'primary',
    options = [
      { title: 'English', value: '/option1' },
      { title: 'Russian', value: '/option2' },
    ],
    className = 'fixed top-0 left-0 right-0  z-[20] flex',
  } = props
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const fontColor = theme === 'dark' ? 'text-light-100' : 'text-dark-100'
  const linkOptions = [
    { title: 'Log In', value: '/logIn' },
    { title: 'Sign Up', value: '/signUp' },
  ]

  const t = (value: any) => {
    console.log(value)
  }
  const routerPath = (i: number) => {
    router.push(`/${linkOptions[i].value}`)
  }

  const handleLanguage = (selectedValue: SelectOptionType) => {
    alert(selectedValue?.title)
    t(selectedValue?.title)
  }
  const handleLink = (selectedValue: SelectOptionType) => {
    router.push(String(selectedValue?.value))
  }
  return (
    <div
      className={`border-b-[1px] h-[60px] bg-dark-700 border-dark-300 flex flex-row justify-center items-center ${className}`}
    >
      <div
        className={
          'max-w-screen-xl w-full flex flex-row justify-between items-center px-12 max-sm:px-4'
        }
      >
        <div>
          <Link href={'/'}>
            <Typography
              variant="large"
              className={`leading-[36px] text-[26px]  ${fontColor} flex items-start`}
            >
              Inctagram
            </Typography>
          </Link>
        </div>
        <div className={`flex flex-row justify-end gap-x-[36px] md:gap-x-[24px]`}>
          {user && (
            <div className={`flex items-center`}>
              <Link href={`/${id}/alert`}>
                <Icon
                  iconName="Bell"
                  width={width}
                  height={height}
                  value={value}
                  fillType={fillType}
                  iconStyle={'fill-light-100 hover:fill-primary-100'}
                />
              </Link>
            </div>
          )}
          <div className={`w-fit flex items-center`}>
            <Select options={options} onChange={handleLanguage} />
          </div>
          <div className={`sm:hidden flex items-center`}>
            <div
              className={`flex items-center`}
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
            >
              {isOpen ? (
                <div>
                  <Select options={linkOptions} onChange={handleLink} />
                </div>
              ) : (
                <button>
                  <Icon
                    iconName="MoreHorizontal"
                    width={width}
                    height={height}
                    value={value}
                    fillType={fillType}
                    iconStyle={'fill-light-100 hover:fill-primary-100'}
                  />
                </button>
              )}
            </div>
          </div>
          {!user && (
            <div className={`w-fit gap-x-[24px] items-center hidden sm:flex`}>
              <div>
                <Button label="Log In" style="text" onClick={() => routerPath(0)} />
              </div>
              <div>
                <Button label="Sign Up" style="primary" onClick={() => routerPath(1)} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
