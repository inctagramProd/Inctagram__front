import { useTranslate } from '@/src/app/hooks/useTranslate'
import { AddCommentPanel, ButtonsPanel, CommentsPanel, DescriptionPanel, LikesPanel } from './'
import type { Comment, Like, PageText } from '../'

type Props = {
  authorName: string
  avatarUrl: string
  postDescription: string | null
  likes: Like[]
  comments: Comment[]
}

export const PostLower = ({ authorName, avatarUrl, postDescription, likes, comments }: Props) => {
  const { locale } = useTranslate()
  const pageText: PageText = locale.profile.postViews

  return (
    <div className="post__lower">
      <ButtonsPanel />
      <DescriptionPanel
        authorName={authorName}
        avatarUrl={avatarUrl}
        pageText={pageText}
        postDescription={postDescription}
      />
      <LikesPanel likes={likes} pageText={pageText} />
      <CommentsPanel comments={comments} pageText={pageText} />
      <AddCommentPanel
        pageText={pageText}
        addComment={() => {
          console.log('> add comment')
        }}
      />
    </div>
  )
}
