import { CircleBlocksProps } from '../model/types'

export const useCircleBlocks = ({ imagesLen, imgNumber, setImgNumber }: CircleBlocksProps) => {
  const Circle = []

  for (let i = 1; i <= imagesLen; i++) {
    Circle.push(i)
  }

  const CircleBlocks = Circle.map((e, i, arr) => (
    <div
      className={`rounded-full transition duration-600 ease-in-out ${
        +arr.indexOf(e) === +imgNumber ? `bg-primary-300` : `bg-light-100 cursor-pointer`
      } w-[10px] h-[10px] ${arr.length < 2 && 'hidden'}`}
      onClick={() => setImgNumber(i)}
      key={i}
    />
  ))

  return [CircleBlocks] as const
}
