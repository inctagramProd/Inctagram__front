import { Button } from '@/src/shared/ui/Button/Button'
import Icon from '@/src/shared/ui/Icon/Icon'
import Link from 'next/link'
import { useState } from 'react'

type Props = {
  link: string
  iconName: string
  label: string
  style: 'primary' | 'secondary' | 'outline' | 'text' | 'default'
  IconStyle?: string
  fillType?: 'fill' | 'outline'
  mouseEnter?: () => void
  mouseLeave?: () => void
  handleActive?: () => void
  handleFocus?: () => void
  isActive?: boolean
}
export const LinkItem = (props: Props) => {
  const { link, style, iconName, label } = props
  const [focus, setFocus] = useState(false)
  const handleFocus = () => {
    setFocus(true)
  }
  return (
    <Link href={link}>
      <Icon
        iconName={iconName}
        iconStyle={'fill-light-100 hover:fill-primary-100 sm:hidden'}
        fillType={'fill'}
      />
      <div className="hidden sm:block">
        <Button
          size={'medium'}
          label={label}
          style={style}
          iconName={iconName}
          iconStyle={`fill-light-100 group-hover:fill-primary-100 focus:fill-primary-100 group-disable:fill-dark-100`}
          variant="medium_14"
          className="flex justify-content h-[100%] group-active:text-sm group-active:font-bold group-active:leading-normal" /* group-focus:text-light-100 */
          disable={false}
          handleFocus={handleFocus}
        />
      </div>
    </Link>
  )
}
