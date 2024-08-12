import { useEffect, useState } from 'react'
import { useTranslate } from '@/src/app/hooks/useTranslate'
import { Button, Typography } from '@/src/shared/ui'
import { AvatarImageLink, PostIconButton, SliderArrow } from './'
import { truncateDescription, useCircleBlocks } from '../lib'
import { Comment, PostProps } from '../model/types'
// import { Input } from '@/src/shared/ui'
// import Input from './Input'

export const Post = ({ name, images, postDescription, likes, comments, avatarUrl }: PostProps) => {
  const [imgNumber, setImgNumber] = useState<number>(0)
  const [showDescription, setShowDescription] = useState<boolean>(false)
  const [textArea, setTextArea] = useState<boolean>(false)
  const [commentOpen, setCommentOpen] = useState<boolean>(false)

  const [CircleBlocks] = useCircleBlocks({ imagesLen: images.length, imgNumber, setImgNumber })
  const { locale } = useTranslate()

  const pageText = locale.profile.postViews

  useEffect(() => {}, [imgNumber, showDescription])

  const openDescription = () => {
    console.log(`> open description ${showDescription}`)
    setShowDescription(!showDescription)
  }
  const openTextArea = () => {
    setTextArea(!textArea)
  }
  const openComments = () => {
    setCommentOpen(!commentOpen)
  }

  return (
    <div className="flex flex-col">
      <div className="post__header flex justify-between items-center w-full h-[30px] mb-4">
        <div className="flex items-center justify-center gap-2">
          <div className="flex gap-2 items-center justify-center">
            <AvatarImageLink src={avatarUrl} />
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
                <AvatarImageLink src={avatarUrl} className="block mt-1" />
                <div className="text-justify text-s">
                  <Typography variant="small_bold" className="inline text-s">
                    {name}
                  </Typography>
                  <Typography variant="small" className="inline ml-2">
                    {showDescription ? postDescription : truncateDescription(postDescription)}
                  </Typography>
                  {postDescription && postDescription.length >= 97 ? (
                    <Typography
                      className={
                        'text-dark-100 hover:text-light-900  cursor-pointer italic inline ml-2'
                      }
                      onClick={openDescription}
                    >
                      {showDescription ? pageText.hide : pageText.else}
                    </Typography>
                  ) : null}
                </div>
              </div>
            </div>
          ) : null}
        </div>

        {likes?.length > 0 ? (
          <div className="post__lower__likes-panel flex flex-row w-full h-[40px] items-center mt-2">
            <div className="flex">
              {likes
                .slice(-3)
                .reverse()
                .map((im, idx) => (
                  <AvatarImageLink
                    size="small"
                    src={im.avatar}
                    className={`object-cover rounded-full ${
                      idx === 0 ? `ml-[0] z-20` : idx === 1 ? 'ml-[-1vh] z-10' : 'ml-[-1vh] z-0'
                    }`}
                  />
                ))}
            </div>
            <Typography variant="medium_14" className={'inline-block pl-3'}>
              {likes.length}
              <span className="font-bold">{pageText.like}</span>
            </Typography>
          </div>
        ) : null}

        <div className="post__lower__comments-panel w-full m-h-[30px] h-auto mt-4">
          <div
            className="post__lower__comments-panel__spoiler cursor-pointer"
            onClick={openComments}
          >
            <Typography
              variant="bold_14"
              className="text-dark-100 hover:text-light-900 transition duration-500 ease-in-out"
            >
              {comments?.length > 0
                ? `${pageText.viewAllComments} (${comments?.length}) `
                : pageText.noComments}
            </Typography>
          </div>
          {/*transition styles do not work - fix it!!*/}
          <div className="transition duration-600 ease-in-out my-3">
            {commentOpen
              ? comments.map((el: Comment, i: number) => {
                  return (
                    <div key={i} className="flex gap-2 mb-1">
                      <AvatarImageLink size="small" src={el.avatar} />
                      <div className="inline">
                        <div className="text-justify text-s">
                          <Typography variant="small_bold" className="inline">
                            {el.name}
                          </Typography>
                          <Typography variant="small" className="inline ml-1">
                            {el.comment}
                          </Typography>
                        </div>
                        <Typography
                          variant="small"
                          className={
                            'text-dark-100 hover:text-light-900 cursor-pointer italic transition duration-300 ease-in-out'
                          }
                        >
                          {el.date}
                        </Typography>
                      </div>
                    </div>
                  )
                })
              : null}
          </div>
          ///
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
          ///
        </div>
      </div>
    </div>
  )
}
