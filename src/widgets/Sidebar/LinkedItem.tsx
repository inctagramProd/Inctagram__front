import { CreatePost } from '@/src/features/post/ui/createPost'
import { Icon, Button } from '@/src/shared/ui'
import Link from 'next/link'
import { useState } from 'react'

type Props = {
  link: string
  iconName: string
  label: string
  style: 'primary' | 'secondary' | 'outline' | 'text' | 'default'
  IconStyle?: string
  fillType?: 'fill' | 'outline'
  handleActive?: () => void
  handleFocus?: () => void
  isActive?: boolean
  isCreatePost?: boolean
}
export const LinkItem = (props: Props) => {
  const { link, style, iconName, label } = props
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleClick = () => {
    if (props.isCreatePost) {
      setIsModalOpen(prev => !prev)
    }
  }

  return (
    <>
      <Link href={link} className="group" onClick={handleClick}>
        <Icon
          iconName={iconName}
          iconStyle={'fill-light-100 group-hover:fill-primary-100 sm:hidden'}
          fillType={'fill'}
        />
        <Button
          size={'medium'}
          label={label}
          style={style}
          iconName={iconName}
          iconStyle={`${
            props.isActive ? 'fill-blue-500' : 'fill-light-100'
          } group-hover:fill-primary-100 focus:fill-primary-100 group-disable:fill-dark-100`}
          variant="medium_14"
          className={`${
            props.isActive ? 'text-primary-500' : 'text-light-100'
          } group-hover:text-primary-100 hidden sm:flex justify-content h-[100%] py-0 px-0 group-active:text-sm group-active:font-bold group-active:leading-normal `}
        />
      </Link>
      {props.isCreatePost && (
        <CreatePost isBaseModalOpen={isModalOpen} setIsBaseModalOpen={setIsModalOpen} />
      )}
    </>
  )
}
