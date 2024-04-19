import React, { useCallback, useMemo, useState } from 'react'
import Image from 'next/image'
import { FilterImage } from '@/src/shared/helpers/canvasUtils'
import { useAppDispatch } from '@/src/app/store/store'
import { updateFilterCroppedImage } from '@/src/entities/post/model/slice/postSlice'
import { Typography } from '@/src/shared/ui'
import { SlickSlider } from '@/src/shared/ui/Slider/Slider'
import { CroppedImage } from '@/src/entities/post/model/types/postSliceTypes'

const filtersScreen: { name: string; value: FilterImage }[] = [
  { name: 'Normal', value: 'image_filter--normal' },
  { name: 'Clarendon', value: 'image_filter--clarendon' },
  { name: 'Lark', value: 'image_filter--lark' },
  { name: 'Gingham', value: 'image_filter--gingham' },
  { name: 'Moon', value: 'image_filter--moon' },
  { name: 'Xray', value: 'image_filter--xRay' },
  { name: 'Shabby', value: 'image_filter--shabby' },
  { name: 'Old school', value: 'image_filter--oldSchool' },
  { name: 'Silent Hill', value: 'image_filter--silentHill' },
]

type Props = {
  images: CroppedImage[]
}
export const FilteredImageScreen = ({ images }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0)

  const dispatch = useAppDispatch()

  const handleChangeFilter = useCallback(
    (filter: FilterImage) => {
      const imageURL = images[activeIndex].imageURL
      dispatch(updateFilterCroppedImage({ filter, imageURL }))
    },
    [activeIndex, images, dispatch]
  )

  const filtersArray = useMemo(() => {
    return filtersScreen.map((filter) => {
      const activeFilter = filter.value === images[activeIndex].filter
      return (
        <div
          className={`${
            activeFilter && 'text-primary-500 underline underline-offset-4'
          } text-center cursor-pointer h-[138px] mb-1`}
          key={filter.name}
          onClick={() => handleChangeFilter(filter.value)}
        >
          <Image
            src={images[activeIndex].imageURL}
            alt={filter.name}
            style={{ filter: filter.value }}
            width={108}
            height={108}
            className={`${filter.value} object-cover h-[108px] mb-1.5`}
          />
          <Typography variant="regular_16">{filter.name}</Typography>
        </div>
      )
    })
  }, [images, activeIndex, handleChangeFilter])

  return (
    <div className="flex gap-x-2.5">
      <div className="w-1/2">
        <SlickSlider isShowNavigation={images.length !== 1} afterChangeCallback={setActiveIndex}>
          {images.map(img => {
            return (
              <Image
                key={img.imageURL}
                src={img.imageURL}
                alt={img.filter}
                width={1}
                height={1}
                className={`${img.filter} object-contain h-[508px]`}
              />
            )
          })}
        </SlickSlider>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-6 w-1/2 h-full p-6 relative">
        {filtersArray}
      </div>
    </div>
  )
}

