import { useEffect, useState } from 'react'
import { useTranslate } from '@/src/app/hooks/useTranslate'
import { Button, Typography } from '@/src/shared/ui'
import { SliderArrow, PostIconButton, AvatarImageLink } from './'
import { PostProps } from '../model/types'
import { useCircleBlocks } from '../lib/useCircleBlocks'
// import { Input } from '@/src/shared/ui'
// import Input from './Input'

export const Post = ({ name, images, postDescription, likes, comments, avatarUrl }: PostProps) => {
  const [imgNumber, setImgNumber] = useState<number>(0)
  const [visibleDescription, setVisibleDescription] = useState<boolean>(false)
  const [textArea, setTextArea] = useState<boolean>(false)
  const [commentOpen, setCommentOpen] = useState<boolean>(false)

  const [CircleBlocks] = useCircleBlocks({ imagesLen: images.length, imgNumber, setImgNumber })
  const { locale } = useTranslate()

  const pageText = locale.profile.postViews

  useEffect(() => {}, [imgNumber, visibleDescription])

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

  return (
    <div className="flex flex-col">
      <div className="post__header flex justify-between w-full h-[30px] mb-[10px] items-center">
        <div className="flex items-center justify-center gap-2">
          <div className="flex gap-2 items-center justify-center">
            <AvatarImageLink avatarUrl={avatarUrl} />
            <Typography
              className="ml-1 cursor-pointer"
              variant="bold_16"
              onClick={() => {
                console.log(`> Link "go to profile"`)
              }}
            >
              {name}
            </Typography>
          </div>
          <div className="rounded-full w-1 h-1 bg-white" />
          <div className={'flex items-center'}>
            <Typography variant="small" className="text-light-900 leading-3">
              22 minutes ago
            </Typography>
          </div>
        </div>
        <PostIconButton iconName={'MoreHorizontal'} logMessage={`> Open modal "post actions"`} />
      </div>

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
                {CircleBlocks}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="post__lower">
        <div className="post__lower__buttons-panel w-full h-[30px] flex mt-[7px] mb-2 items-center justify-between">
          <div className="flex gap-4">
            <PostIconButton iconName={'Heart'} logMessage={`> Like post`} />
            <PostIconButton iconName={'MessageCircle'} logMessage={`> Focus on comment field`} />
            <PostIconButton
              iconName={'PaperPlane'}
              logMessage={`> Send message / Share post (??)"`}
            />
          </div>
          <PostIconButton iconName={'Bookmark'} logMessage={`> Add post to bookmarks`} />
        </div>

        <div className="post__lower__description-panel">
          {postDescription ? (
            <div className={`flex flex-col w-full min-h-15 overflow-hidden gap-2`}>
              <div className={`flex gap-2`}>
                <AvatarImageLink avatarUrl={avatarUrl} className="block mt-1" />
                <div className="text-justify text-s">
                  <Typography variant="small_bold" className="inline text-s">
                    {name}
                  </Typography>
                  <Typography className="inline">{' ' + postDescription}</Typography>
                </div>
              </div>
            </div>
          ) : null}
          {postDescription && postDescription.length >= 30 ? (
            <div>
              <span className={'text-dark-100 cursor-pointer italic'} onClick={openDescription}>
                {visibleDescription ? pageText.else : pageText.hide}
              </span>
            </div>
          ) : null}
        </div>

        {likes?.length > 0 ? (
          <div className="post__lower__likes-panel flex flex-row w-full h-[40px] items-center">
            <div className="flex">
              {likes
                .slice(-3)
                .reverse()
                .map((im, idx) => (
                  <img
                    key={idx}
                    src={im.avatar}
                    alt={`Avatar ${idx}`}
                    className={`w-5 h-5 object-cover rounded-full ${
                      idx === 0 ? `ml-[0] z-20` : idx === 1 ? 'ml-[-1vh] z-10' : 'ml-[-1vh] z-0'
                    }`}
                    onClick={() => {
                      console.log(`likes ${im.name}`)
                    }}
                  />
                ))}
            </div>
            <div className={'ml-[14px]'}> {`   ${likes?.length}`} </div>
            <span className="inline-block font-bold pl-[5px]">{pageText.like}</span>
          </div>
        ) : null}
        <div className="post__lower__comments-panel w-full m-h-[30px] h-auto">
          <div
            className="post__lower__comments-panel__spoiler font-bold cursor-pointer"
            onClick={openComments}
          >
            {' '}
            {comments?.length > 0
              ? `${pageText.viewAllComments} (${comments?.length}) `
              : pageText.noComments}
          </div>
          <div className="transition duration-600 ease-in-out">
            {commentOpen
              ? comments.map((el: any, i: any) => {
                  return (
                    <div key={i} className="flex gap-1">
                      <div className="flex justify-start align-center h-100 w-auto ">
                        <img src={el.avatar} className={`h-5 w-5`} alt="avatar" />
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
          {/*border-b-2 border-gray*/}
          <div className={'flex flex-col'}>
            <div className="flex justify-between transition duration-700 ease-in-out">
              <span className="text-dark-100 cursor-pointer" onClick={openTextArea}>
                {pageText.addComment}
              </span>{' '}
              <Button label={pageText.publish} style={'text'} />
            </div>
            {/*<Input />*/}
            {/*{textArea ? <TextArea /> : null}*/}
          </div>
        </div>
      </div>
    </div>
  )
}
