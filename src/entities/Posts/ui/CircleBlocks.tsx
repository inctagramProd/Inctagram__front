import { CircleBlocksProps } from '../model/types'

export const CircleBlocks = ({ imagesLen, imgNumber, setImgNumber }: CircleBlocksProps) => {
  return (
    <>
      {[...Array(imagesLen)].map((_, i) => (
        <div
          key={i}
          className={`rounded-full w-[10px] h-[10px] transition duration-600 ease-in-out ${
            i === imgNumber ? 'bg-primary-300' : 'bg-light-100 cursor-pointer'
          } ${imagesLen < 2 && 'hidden'}`}
          onClick={() => setImgNumber(i)}
        />
      ))}
    </>
  )
}
