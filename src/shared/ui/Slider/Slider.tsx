import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { SliderArrowIcon } from '@/src/shared/assets/icons/SliderArrowIcon'

type Props = {
  children: React.ReactNode
  isShowNavigation?: boolean
  afterChangeCallback?: (value: number) => void
}

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
      // TODO styles refactor
      className='w-[36px] h-[36px] rounded bg-dark-500 opacity-50 text-center align-middle flex justify-center
      items-center cursor-pointer absolute top[50%] z-10'
      onClick={onClick}
    >
      <SliderArrowIcon direction={direction} />
    </div>
  )
}
const settings = {
  swipe: false,
  infinite: true,
  speed: 0,
  variableWidth: false,
  fade: true,
  cssEase: 'linear',
  mobileFirst: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <SliderArrows direction="left" />,
  prevArrow: <SliderArrows direction="right" />,
  dotsClass: `${'absolute w-full bottom-0 flex item-center justify-center gap-2 h-4'}`,
  appendDots: (dots: any) => (
      <ul>{dots}</ul>
  ),
  customPaging: (i: any) => <span className="block w-2 h-2 rounded-full bg-light-100 cursor-pointer [slick-active]:bg-primary-500"></span>,
}

export const SlickSlider = ({ children, isShowNavigation, afterChangeCallback }: Props) => {
  return (
    <Slider
      afterChange={afterChangeCallback}
      arrows={isShowNavigation}
      dots={isShowNavigation}
      {...settings}
    >
      {children}
    </Slider>
  )
}
