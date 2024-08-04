import { SetStateAction } from 'react'
import { Icon } from '@/src/shared/ui'

type imgType = {
  imageId: number
  imageUrl: string
}
type Props = {
  img: imgType[]
  setImgItem: (value: SetStateAction<number>) => void
  imgItem: number
  direction: 'left' | 'right'
}

export const SliderArrow = ({ img, setImgItem, imgItem, direction }: Props) => {
  const slider = () => {
    direction === 'right'
      ? imgItem === img.length - 1
        ? img.length - 1
        : setImgItem(imgItem + 1)
      : imgItem === 0
      ? setImgItem(0)
      : setImgItem(imgItem - 1)
  }

  return (
    <div
      className={`bg-dark-300/30 hover:bg-dark-100/50 cursor-pointer absolute top-[45%] w-[44px] aspect-square ${
        direction === 'left' ? 'left-[15px]' : 'right-[15px]'
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
