import { Icon } from '@/src/shared/ui'
import { SetStateAction } from 'react'
import type { Img } from '../'

type Props = {
  imgItem: number
  direction: 'left' | 'right'
  images: Img[]
  setImgItem: (value: SetStateAction<number>) => void
}

export const SliderArrow = ({ images, setImgItem, imgItem, direction }: Props) => {
  const slider = () => {
    direction === 'right'
      ? imgItem === images.length - 1
        ? images.length - 1
        : setImgItem(imgItem + 1)
      : imgItem === 0
      ? setImgItem(0)
      : setImgItem(imgItem - 1)
  }

  return (
    <div
      className={`bg-dark-300/30 hover:bg-dark-100/50 cursor-pointer absolute top-[45%] w-[44px] aspect-square ${
        direction === 'left' ? 'left-[15px]' : 'right-[15px]'
      } ${
        (direction === 'left' && imgItem === 0) ||
        (direction === 'right' && imgItem === images.length - 1)
          ? 'hidden'
          : ''
      }`}
      onClick={slider}
    >
      <Icon
        width={44}
        height={44}
        iconName={direction === 'left' ? 'ArrowIosBack' : 'ArrowIosForward'}
        iconStyle="fill-light-100 transition duration-300 ease-in-out hover:fill-primary-100"
      />
    </div>
  )
}
