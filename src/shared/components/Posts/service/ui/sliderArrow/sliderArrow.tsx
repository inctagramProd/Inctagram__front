import { Icon } from '@/src/shared/ui'
import { SetStateAction } from 'react'

type Props = {
  img: string[]
  setImgItem: (value: SetStateAction<number>) => void
  imgItem: number
  direction: 'left' | 'right'
}
const SliderArrow = ({ img, setImgItem, imgItem, direction }: Props) => {
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
      className={`bg-dark-300/80 hover:bg-dark-100 cursor-pointer absolute top-1/2 ${
        direction === 'left' ? 'left-[10px]' : 'right-[10px]'
      }`}
      onClick={slider}
    >
      <Icon
        iconName={direction === 'left' ? 'ArrowIosBack' : 'ArrowIosForward'}
        iconStyle="fill-light-100 transition duration-300 ease-in-out hover:fill-primary-100"
      />
    </div>
  )
}
export default SliderArrow
