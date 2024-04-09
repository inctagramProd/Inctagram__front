import { CroppedImage } from '@/src/entities/post/model/types/postSliceTypes'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { SliderArrowIcon } from '@/src/shared/assets/icons/SliderArrowIcon'
import React, { useCallback, useMemo, useState } from 'react'
import Image from 'next/image'
import { FilterImage } from '@/src/shared/helpers/canvasUtils'
import { useAppDispatch } from '@/src/app/store/store'
import { updateFilterCroppedImage } from '@/src/entities/post/model/slice/postSlice'
import { Typography } from '@/src/shared/ui'

type SamplePrevArrow = {
  onClick?: () => void
  direction?: 'left' | 'right'
}
const SliderArrows = ({ direction, onClick }: SamplePrevArrow) => {
  return (
    <div
      style={{
        width: '36px',
        height: '36px',
        borderRadius: '2px',
        backgroundColor: '#171717',
        opacity: '50%',
        textAlign: 'center',
        verticalAlign: 'middle',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        position: 'absolute',
        top: '50%',
        left: direction === 'left' ? '10px' : undefined,
        right: direction === 'right' ? '10px' : undefined,
        zIndex: '10',
      }}
      onClick={onClick}
    >
      <SliderArrowIcon direction={direction} />
    </div>
  )
}
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  fade: true,
  cssEase: 'linear',
  mobileFirst: true,
  nextArrow: <SliderArrows direction="left" />,
  prevArrow: <SliderArrows direction="right" />,
}

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
  // { name: '1977', value: 'image_filter--1977' },
]

type Props = {
  images: CroppedImage[]
}
export const FilteredImage = ({ images }: Props) => {
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
    return filtersScreen.map((filter, i) => {
      const activeFilter = filter.value === images[activeIndex].filter
      return (
        <div
          className={`${
            activeFilter && 'text-primary-500 underline underline-offset-4'
          } text-center  cursor-pointer`}
          key={`${filter.name}` + i}
          onClick={() => handleChangeFilter(filter.value)}
        >
          <Image
            alt={filter.name}
            style={{ filter: filter.value }}
            className={`${filter.value} object-contain h-auto mb-1.5`}
            height={108}
            width={108}
            src={images[activeIndex].imageURL}
          />
          <Typography variant="regular_16">{filter.name}</Typography>
        </div>
      )
    })
  }, [images, activeIndex, handleChangeFilter])
  return (
    <div className="flex gap-x-2.5">
      <div className="w-1/2">
        <Slider
          arrows={images.length !== 1}
          {...settings}
          afterChange={currentSlide => {
            setActiveIndex(currentSlide)
          }}
        >
          {images.map(img => {
            return (
              <Image
                key={img.imageURL}
                src={img.imageURL}
                width={100}
                height={100}
                alt={img.filter}
                className={img.filter}
              />
            )
          })}
        </Slider>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-6 w-1/2 h-full p-6">
        {filtersArray}
      </div>
    </div>
  )
}

