import { PostHeader, PostLower, PostMediafiles } from './'
import type { Comment, Img, Like } from './'

type PostProps = {
  authorName: string
  avatarUrl: string
  postDescription: string | null
  images: Img[]
  likes: Like[]
  comments: Comment[]
}

export const Post = ({
  authorName,
  images,
  postDescription,
  likes,
  comments,
  avatarUrl,
}: PostProps) => {
  return (
    <div className="flex flex-col">
      <PostHeader authorName={authorName} avatarUrl={avatarUrl} />
      <PostMediafiles images={images} />
      <PostLower
        authorName={authorName}
        avatarUrl={avatarUrl}
        postDescription={postDescription}
        likes={likes}
        comments={comments}
      />
    </div>
  )
}
