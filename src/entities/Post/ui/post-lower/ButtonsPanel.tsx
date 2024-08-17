import { PostIconButton } from '../'

export const ButtonsPanel = () => {
  return (
    <div className="post__lower__buttons-panel w-full h-[30px] flex mt-[7px] mb-2 items-center justify-between">
      <div className="flex gap-4">
        <PostIconButton iconName={'Heart'} logMessage={`> Like post`} />
        <PostIconButton iconName={'MessageCircle'} logMessage={`> Focus on comment field`} />
        <PostIconButton iconName={'PaperPlane'} logMessage={`> Send message / Share post (??)"`} />
      </div>
      <PostIconButton iconName={'Bookmark'} logMessage={`> Add post to bookmarks`} />
    </div>
  )
}
