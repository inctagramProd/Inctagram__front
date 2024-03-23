import { useEffect, useState } from 'react'
import SliderArrow from './service/ui/sliderArrow/sliderArrow'

import { Icon, TextArea, Typography } from '../../ui'
import { Button } from '@/src/shared/ui'

type imgType = {
  imageId: number
  imageUrl: string
}
type likeType = {
  name: string
  like: boolean
  avatar: string
}
type comment = {
  name: string
  comment: string
  data: string
}
export type PostsProps = {
  comments: any
  name: string
  img: imgType[]
  postDescreption: string | null
  likes: likeType[]
}
const Posts = ({ name, img, postDescreption, likes, comments }: PostsProps) => {
  const [imgItem, setImgItem] = useState<number>(0)
  const [visibleDescription, setVisibleDescription] = useState<boolean>(false)
  const [textArea, setTextArea] = useState<boolean>(false)
  const [commentOpen, setCommentOpen] = useState<boolean>(false)
  useEffect(() => {}, [imgItem, visibleDescription])
  const openDescription = () => {
    console.log(`openDescription ${visibleDescription}`)
    setVisibleDescription(!visibleDescription)
  }
  const openTextArea = () => {
    setTextArea(!textArea)
  }
  const openComments = () => {
    setCommentOpen(!commentOpen)
  }
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
    <div className="flex flex-col">
      <div className="flex justify-between w-full h-[30px] ">
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
      <div className="w-full h-auto">
        <div className="d-flex align-center justify-center">
          <div className={'relative inline-block h-[400px] flex '}>
            <SliderArrow img={img} setImgItem={setImgItem} imgItem={imgItem} direction={'left'} />
            <img
              src={img[imgItem].imageUrl}
              alt={'img'}
              className="object-contain w-full h-full bg-dark-100/25"
            />
            <SliderArrow img={img} setImgItem={setImgItem} imgItem={imgItem} direction={'right'} />
            <div className="absolute bottom-[10px] w-full flex  justify-center">
              <div className="w-auto bg-dark-100/50 flex flex-column justify-center gap-3 p-2">
                {CircleBlock}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[30px] flex  justify-between w-full">
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
        <div className="flex flex-col w-full min-h-15 h-full overflow-hidden gap-2">
          <div className={`${visibleDescription ? 'h-5 ' : 'h-full'} flex gap-1`}>
            <div className="w-[30px] h-full flex align-center justify-center">
              <div className=" rounded-full bg-light-500 w-5 h-5" />
            </div>
            <div className="w-auto text-justify">{postDescreption}</div>
          </div>
        </div>
      ) : null}
      {postDescreption && postDescreption.length >= 30 ? (
        <div>
          <span className={'text-dark-100 cursor-pointer italic'} onClick={openDescription}>
            {visibleDescription ? 'Else' : 'Hide'}
          </span>
        </div>
      ) : null}
      {likes?.length > 0 ? (
        <div className="flex flex-row w-full h-[30px] ">
          {likes
            ?.filter((e, i) => (i <= 2 ? e : null))
            .map((el, index) => {
              return (
                <div className="d-flex align-start justify-center" key={index}>
                  <img
                    src={el.avatar}
                    className="w-5 h-5"
                    onClick={() => {
                      console.log(`likes ${el.name}`)
                    }}
                  />
                </div>
              )
            })}
          {`   ${likes?.length}`} <span className="inline-block font-bold">"Like"</span>
        </div>
      ) : null}
      <div className=" w-full m-h-[30px] h-auto">
        <span className="font-bold cursor-pointer" onClick={openComments}>
          {' '}
          {comments?.length > 0
            ? `View all comments (${comments?.length}) `
            : 'There are no comments'}
        </span>
        <div className="transition duration-600 ease-in-out">
          {commentOpen
            ? comments.map((el: any, i: any) => {
                return (
                  <div key={i} className="flex gap-1">
                    <div className="flex justify-start align -center  h-100 w-auto ">
                      <img src={el.avatar} className={`h-5 w-5`} />
                    </div>
                    <div>
                      <div>
                        <span className="inline-block font-bold">{el.name}</span>
                        {`${el.comment}`}
                      </div>
                      <Typography
                        variant="small"
                        className={
                          'text-dark-100 cursor-pointer italic hover:text-dark-300 transition duration-300 ease-in-out'
                        }
                      >
                        {el.data}
                      </Typography>
                    </div>
                  </div>
                )
              })
            : null}
        </div>

        <div className={'flex flex-col border-b-2 border-gray'}>
          <div className="flex justify-between transition duration-700 ease-in-out">
            <span
              className="text-dark-100 cursor-pointer italic hover:not-italic "
              onClick={openTextArea}
            >
              Add comment...
            </span>{' '}
            <Button label="Publish" style={'text'} />
          </div>
          {textArea ? <TextArea /> : null}
        </div>
      </div>
    </div>
  )
}

export default Posts
