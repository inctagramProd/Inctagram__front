import { useEffect, useState } from 'react'
import { Img } from '@/src/entities/Posts/model/types'
import { CircleBlocks, SliderArrow } from './'

type PostMediafilesProps = {
  images: Img[]
}

export const PostMediafiles = ({ images }: PostMediafilesProps) => {
  const [imgNumber, setImgNumber] = useState<number>(0)

  useEffect(() => {}, [imgNumber])

  return (
    <div className="post__mediafiles w-full h-auto">
      <div className="d-flex align-center justify-center">
        <div className={'relative max-w-[504px] flex aspect-square'}>
          <SliderArrow
            images={images}
            setImgItem={setImgNumber}
            imgItem={imgNumber}
            direction={'left'}
          />
          <img
            src={images[imgNumber].imageUrl}
            alt={'img'}
            className="object-contain w-full h-full bg-dark-100/25"
          />
          <SliderArrow
            images={images}
            setImgItem={setImgNumber}
            imgItem={imgNumber}
            direction={'right'}
          />
          <div className="absolute bottom-[10px] w-full flex justify-center">
            <div className="w-auto bg-dark-100/50 flex flex-column justify-center gap-3 p-2">
              <CircleBlocks
                imagesLen={images.length}
                imgNumber={imgNumber}
                setImgNumber={setImgNumber}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
