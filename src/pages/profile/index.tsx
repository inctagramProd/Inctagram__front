import Posts from '@/src/shared/components/Posts/Posts'
import { useViewPostsQuery } from '@/src/shared/components/Posts/service/api/viewPost.api'
import { LoaderSpin, Typography } from '@/src/shared/ui'
import { getLayoutWithSidebar } from '@/src/widgets/Layout/LayoutWithSidebar'
import { useEffect } from 'react'

const posts = [
  {
    name: 'Alex',
    img: [
      'https://as2.ftcdn.net/v2/jpg/07/40/63/61/1000_F_740636193_LaH6wbGYu9RIIinG1kCDPtJgOLkq494b.jpg',
      'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg',
      'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg',
    ],
    postDescreption: null,
    like: null,
    comments: null,
  },
]
const ProfilePage = () => {
  const { data, isLoading, isError, isFetching } = useViewPostsQuery(1)
  console.log(`outside`, data)
  return (
    <div className="flex items-start justify-center w-full min-h-screen h-auto gap-[20px]">
      <div className="w-[46%] h-auto mt-[50px]">
        {isLoading ? (
          <LoaderSpin />
        ) : (
          data.map((el: any, id: any) => {
            return (
              <Posts
                name={'Alex'}
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
