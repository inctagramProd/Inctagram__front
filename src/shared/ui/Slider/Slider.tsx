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
      onClick={onClick}
    >
      <SliderArrowIcon direction={direction} />
    </div>
  )
}
//TODO: 'refactor SliderArrows'
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
  dotsClass: 'slick-dots slick-thumb',
  appendDots: (dots: any) => (
    <div style={{ position: 'absolute', bottom: '0' }}>
      <ul style={{ margin: '0px' }}> {dots} </ul>
    </div>
  ),
  customPaging: (i: any) => <div className="w-2 h-2 rounded-full bg-light-100"></div>,
}

export const SlickSlider = ({ children, isShowNavigation, afterChangeCallback }: Props) => {
  return (
    <Slider afterChange={afterChangeCallback} arrows={isShowNavigation} dots={isShowNavigation} {...settings}>
      {children}
    </Slider>
  )
}
