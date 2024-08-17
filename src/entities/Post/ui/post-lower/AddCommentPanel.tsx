import { Button, TextArea, Typography } from '@/src/shared/ui'
import type { Like, PageText } from '../'
import { AvatarImageLink } from '../'
import TextareaAutosize from 'react-textarea-autosize'

type AddCommentPanelProps = {
  pageText: PageText
  addComment: VoidFunction
}

export const AddCommentPanel = ({ pageText, addComment }: AddCommentPanelProps) => {
  const addCommentHandler = () => {
    addComment()
  }

  return (
    <div className="relative">
      <TextArea type={'comment'} pageText={pageText} className={'mt-2'} />
      <Button
        label={pageText.publish}
        style={'text'}
        className="absolute bottom-2 right-0 pr-3 flex items-center"
        onClick={addCommentHandler}
      />
    </div>
  )
}
