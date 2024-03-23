import { CreatePost } from '@/src/features/post/createPost'
import { getLayoutWithSidebar } from '@/src/widgets/Layout/LayoutWithSidebar'

const CreatePostPage = () => {
  return <CreatePost />
}

CreatePostPage.getLayout = getLayoutWithSidebar
export default CreatePostPage