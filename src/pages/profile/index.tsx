import Posts from '@/src/shared/components/Posts/Posts'
import { useViewPostsQuery } from '@/src/shared/components/Posts/service/api/viewPost.api'
import { LoaderSpin, Typography } from '@/src/shared/ui'
import { getLayoutWithSidebar } from '@/src/widgets/Layout/LayoutWithSidebar'

const ProfilePage = () => {
  const { data, isLoading, isError, isFetching } = useViewPostsQuery(8)
  const username = localStorage.getItem('Google Data')
    ? localStorage.getItem('Google Data')
    : localStorage.getItem('Git Data')
    ? localStorage.getItem('Git Data')
    : null
  const name = username ? JSON.parse(username).username : null
  return (
    <div className="flex items-start justify-center w-full min-h-screen h-auto gap-[20px]">
      <div className="w-[46%] h-auto mt-[50px]">
        {isLoading ? (
          <LoaderSpin />
        ) : (
          data.map((el: any, id: any) => {
            return (
              <Posts
                name={name}
                img={el.postImages}
                postDescreption={el.postDescription}
                like={6}
                comments={['123']}
                key={id}
              />
            )
          })
        )}
      </div>
    </div>
  )
}
ProfilePage.getLayout = getLayoutWithSidebar
export default ProfilePage
