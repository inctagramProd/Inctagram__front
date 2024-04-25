import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useEditPostMutation, useGetPostQuery } from "../../service/createPostApi";
import { Button, Modal, TextArea, Typography } from "@/src/shared/ui";
import { useTranslate } from "@/src/app/hooks/useTranslate";
import { useToast } from "@/src/app/hooks/useToast";

type PropsType = {
  id: number,
  isOpen: boolean,
  closeModal: () => void
}

export const EditPost = ({ id, isOpen, closeModal }: PropsType) => {
  const deletePortal = document.getElementById('portal')

  if (!deletePortal) return null

  const [editPost, { isSuccess, isError }] = useEditPostMutation()
  const { data } = useGetPostQuery(id)
  const [post, setPost] = useState('')
  const [postImgUrl, setPostImgUrl] = useState('')
  const { locale } = useTranslate()
  const MAX_NUMBER_OF_CHARACTERS = 500
  const isMaxNumberOfCharacters = post.length > MAX_NUMBER_OF_CHARACTERS

  useEffect(() => {
    if (data) {
      setPost(data.postDescription)
      setPostImgUrl(data.postImages[0].imageUrl)
    }
  }, [data])

  const handleSubmit = () => {
    editPost({
      description: post,
      userPostId: id,
    })
  }

  if (isSuccess) {
    closeModal()
    useToast({ text: 'Post is successfully changed' })
  }
  if (isError) {
    useToast({ text: 'An error has occurred', error: true })
  }

  return createPortal(
    <Modal isOpen={isOpen} onCancel={closeModal} title={locale.profile.editPost.edit} className="min-w-[900px] min-h-[450px]">
      <div className="flex gap-5 ">
        <div className="min-w-[400px] min-h-[400px] w-7/12 h-auto">
          <img src={postImgUrl} alt="img" className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col justify-between w-5/12">
          <div>
            <div className="flex gap-3 justify-start items-center mb-5">
              <div className="w-8 h-8 bg-slate-600 rounded-full"></div>
              <Typography>URL PROFILE</Typography>
            </div>
            <Typography as='p' variant='small'>{locale.profile.editPost.description}</Typography>
            <TextArea
              value={post}
              onChange={e => setPost(e.target.value)}
              className='w-full h-[124px] resize-none text-sm'>
            </TextArea>
            <Typography
              variant="small"
              className={`flex justify-start ${isMaxNumberOfCharacters ? "text-red-600" : ''} `}>
              {isMaxNumberOfCharacters
                ? "No more than 500 symbols allowed"
                : ''
              }
            </Typography>
            <Typography
              variant="small"
              className="flex justify-end">
              {post.length}/{MAX_NUMBER_OF_CHARACTERS}
            </Typography>
          </div>
          <div className="flex justify-end">
            <Button
              style={'primary'}
              label={locale.profile.editPost.save}
              onClick={() => handleSubmit()}
              disable={isMaxNumberOfCharacters}>
            </Button>
          </div>
        </div>
      </div>
    </Modal>,
    deletePortal
  );
}

