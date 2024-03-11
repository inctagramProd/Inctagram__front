import { useEffect, useState } from 'react'
import SliderArrow from './service/ui/sliderArrow/sliderArrow'
import CircleBlock from './service/ui/CircleBlock/CircleBlock'
import { Button, Icon, Typography } from '../../ui'
import DescriptionBlock from './service/ui/DescreptionBlock/DescriptionBlock'

export type PostsProps = {
  name: string
  img: string[]
  postDescreption: string | null
  like: number | null
  comments: string[] | null
}
const Posts = ({ name, img, postDescreption, like, comments }: PostsProps) => {
  const [imgItem, setImgItem] = useState<number>(0)
  const [visibleDescription, setVisibleDescription] = useState(false)

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
          <div className="rounded-full bg-dark-100 w-[30px] h-[30px]" />
          <Typography variant="bold_16">{name}</Typography>
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
      <div className="border border-solid border-indigo-500 w-full h-[30px] flex  justify-between w-full">
        <div className="flex gap-3">
          <Icon
            iconName="Heart"
            iconStyle="cursor-pointer fill-light-100 transition duration-700 ease-in-out hover:fill-primary-100"
          />
          <Icon
            iconName="MessageCircle"
            iconStyle="cursor-pointer fill-light-100 transition duration-700 ease-in-out hover:fill-primary-100"
          />
          <Icon
            iconName="PaperPlane"
            iconStyle="cursor-pointer fill-light-100 transition duration-700 ease-in-out hover:fill-primary-100"
          />
        </div>
        <Icon
          iconName="Bookmark"
          iconStyle="cursor-pointer fill-light-100 transition duration-700 ease-in-out hover:fill-primary-100"
        />
      </div>

      {postDescreption ? (
        <div className="border border-solid border-indigo-500 w-full min-h-[60px] h-auto flex gap-1">
          <div className="rounded-full bg-dark-100 w-[30px] h-[30px]" />

          <div className="w-[90%] text-justify">
            <Typography variant="bold_16" className="w-auto">
              {name}
            </Typography>
            <div>
              <div>
                <Typography
                  variant="regular_14"
                  className={`h-${visibleDescription ? 'auto' : '20'} overflow-hidden`}
                >
                  {postDescreption}{' '}
                </Typography>
                <Typography
                  variant="small"
                  className={
                    'text-dark-100 cursor-pointer italic hover:text-dark-300 transition duration-300 ease-in-out'
                  }
                  onClick={() => setVisibleDescription(!visibleDescription)}
                >
                  {visibleDescription ? 'свернуть' : 'еще'}
                </Typography>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div className="border border-solid border-indigo-500 w-full h-[30px]">Likes:{like}</div>
      <div className="border border-solid border-indigo-500 w-full h-[30px]">
        Comments:{comments}
      </div>
    </div>
  )
}

export default Posts
