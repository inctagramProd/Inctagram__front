import { PublicPost } from '@/src/entities/post/ui/PublicPost/PublicPost'
import { PublicPostType } from '@/src/features/post/types/publicPostTypes'

type Props = {
  publicPosts: PublicPostType[] | undefined
}

export const PublicPostsList = ({ publicPosts }: Props) => {
  if(!publicPosts) return null

  return (
    <div className={'flex flex-wrap justify-center items-center gap-x-3 mt-8'}>
      {publicPosts?.map(post => (
        <PublicPost key={post.id} post={post} />
      ))}
    </div>
  )
}

