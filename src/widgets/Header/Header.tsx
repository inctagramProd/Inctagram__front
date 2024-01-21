import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Button } from '../../shared/ui/Button/Button'
import { Select } from '../../shared/ui/Select/Select'
import { Typography } from '@/src/shared/ui/Typography/Typography'
import { Icon } from '@/src/shared/ui/Icon/Icon'

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

  const handleLanguage = (selectedValue: any) => {
    alert(selectedValue?.title)
    t(selectedValue?.title)
  }
  const handleLink = (selectedValue: any) => {
    router.push(selectedValue?.value)
  }
  if (user) {
    return (
      <div className={`w-[100%] h-[60px] border-b-[1px] bg-dark-700 border-dark-300 ${className}`}>
        <div className={`h-[60px] w-[50%] items-center sm:w-[35%]`}>
          <Link href={'/'}>
            <Typography
              variant="large"
              className={`mt-[12px] ml-[15px] sm:ml-[60px] leading-[36px] text-[26px] ${fontColor} flex items-start`}
            >
              {' '}
              Inctagram
            </Typography>
          </Link>
        </div>
        <div
          className={`flex flex-row justify-end  h-[60px] w-[50%] gap-x-[36px] sm:w-[65%] md:gap-x-[24px]`}
        >
          <div className={`h-[60px]  flex items-center`}>
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
          <div className={`w-fit  flex items-center mr-[40px]`}>
            <Select options={options} onChange={handleLanguage} />
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className={`w-[100%] h-[60px] border-b-[1px] bg-dark-700 border-dark-300 ${className}`}>
      <div className={`h-[60px] w-[50%] items-center sm:w-[35%]`}>
        <Link href={'/'}>
          <Typography
            variant="large"
            className={`mt-[12px] ml-[15px] sm:ml-[60px] leading-[36px] text-[26px]  ${fontColor} flex items-start`}
          >
            Inctagram
          </Typography>
        </Link>
      </div>
      <div
        className={`flex flex-row justify-end  h-[60px] w-[50%] gap-x-[36px] sm:w-[65%] md:gap-x-[24px]`}
      >
        <div className={`w-fit flex items-center`}>
          <Select options={options} onChange={handleLanguage} />
        </div>
        <div className={`sm:hidden h-[60px]  flex items-center mr-[15px]`}>
          <div onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
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
        <div className={`w-fit mr-[15px] sm:mr-[64px] gap-x-[24px] items-center hidden sm:flex`}>
          <div>
            <Button iconName="" label="Log In" style="text" onClick={() => routerPath(0)} />
          </div>
          <div>
            <Button iconName="" label="Sign Up" style="primary" onClick={() => routerPath(1)} />
          </div>
        </div>
      </div>
    </div>
  )
}
