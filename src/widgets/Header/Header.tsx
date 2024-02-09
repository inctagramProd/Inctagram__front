import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Typography, Icon, Button, Select, SelectOptionType } from '@/src/shared/ui'
import { useTranslate } from '@/src/app/hooks/useTranslate'

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
    className = 'fixed top-0 left-0 right-0  z-[20] flex',
  } = props
  const { locale } = useTranslate()
  const [isOpen, setIsOpen] = useState(false)
  const { locale: defaultLocale, push, pathname, query, asPath, locales } = useRouter()

  const localeOptions = [
    { title: 'Russian', value: locales ? locales[0] : ''},
    { title: 'English', value: locales ? locales[1] : ''},
  ]
  const changeLangHandler = (event: SelectOptionType) => {
    const locale = event.value.toString()
    push({ pathname, query }, asPath, { locale })
  }

  const fontColor = theme === 'dark' ? 'text-light-100' : 'text-dark-100'
  const linkOptions = [
    { title: locale.auth.signIn, value: 'sign-in' },
    { title: locale.auth.signUp, value: 'sign-up' },
  ]

  const routerPath = (i: number) => {
    push(`${linkOptions[i].value}`)
  }

  const handleLink = (selectedValue: SelectOptionType) => {
    push(String(selectedValue?.value))
  }
  return (
    <div
      className={`border-b-[1px] h-[60px] bg-dark-700 border-dark-300 flex flex-row justify-center items-center ${className}`}
    >
      <div
        className={
          'max-w-screen-xl w-full flex flex-row justify-between items-center px-4 max-sm:px-4'
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
            <Select
              defaultValue={defaultLocale}
              options={localeOptions}
              onChange={changeLangHandler}
            />
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
                <Button label={locale.auth.signIn} style="text" onClick={() => routerPath(0)} />
              </div>
              <div>
                <Button label={locale.auth.signUp} style="primary" onClick={() => routerPath(1)} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
