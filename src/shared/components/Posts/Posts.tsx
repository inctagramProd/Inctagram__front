import { useEffect, useState } from 'react'
import SliderArrow from './service/ui/sliderArrow/sliderArrow'
import CircleBlock from './service/ui/CircleBlock/CircleBlock'
import { Button, Icon } from '../../ui'

export type PostsProps = {
  name: string
  img: string[]
  postDescreption: string | null
  like: number | null
  comments: string[] | null
}
const Posts = ({ name, img, postDescreption, like, comments }: PostsProps) => {
  const [imgItem, setImgItem] = useState<number>(0)
  useEffect(() => {}, [imgItem])
  const Circle = []
  for (let i = 1; i <= img.length; i++) {
    Circle.push(i)
  }
  const CircleBlock = Circle.map((e, i, arr) => {
    return (
      <div
        className={`rounded-full transition duration-600 ease-in-out bg-${
          +arr.indexOf(e) === +imgItem ? `dark-100` : `light-100`
        } w-[10px] h-[10px]`}
        key={i}
      />
    )
  })

  return (
    <div className="flex flex-col gap-[5px]">
      <div className="flex justify-between border border-solid border-indigo-500 w-full h-[30px] ">
        <div className="flex gap-1 items-center justify-center">
          <div className="rounded-full bg-dark-100 w-[30px] h-[30px]">A</div>
          {name}
        </div>
        <div className="cursor-pointer " onClick={() => alert('123')}>
          <Icon
            iconName="MoreHorizontal"
            iconStyle="fill-light-100 transition duration-700 ease-in-out hover:fill-primary-100"
          />
        </div>
      </div>
      <div className="border border-solid border-indigo-500 w-full h-auto">
        <div className="d-flex align-center justify-center">
          <div className={'relative inline-block h-[400px] flex '}>
            <SliderArrow img={img} setImgItem={setImgItem} imgItem={imgItem} direction={'left'} />
            <img src={img[imgItem]} alt={'img'} className="w-full h-auto" />
            <SliderArrow img={img} setImgItem={setImgItem} imgItem={imgItem} direction={'right'} />
            <div className="absolute bottom-[10px] w-full flex  justify-center">
              <div className="w-auto bg-dark-100/50 flex flex-column justify-center gap-3 p-2">
                {CircleBlock}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border border-solid border-indigo-500 w-full h-[30px]">settings</div>
      <div className="border border-solid border-indigo-500 w-full h-[60px]">{postDescreption}</div>
      <div className="border border-solid border-indigo-500 w-full h-[30px]">Likes:{like}</div>
      <div className="border border-solid border-indigo-500 w-full h-[30px]">
        Comments:{comments}
      </div>
    </div>
  )
}

export default Posts
