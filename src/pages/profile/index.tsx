import Posts from '@/src/shared/components/Posts/Posts'
import { useViewPostsQuery } from '@/src/shared/components/Posts/service/api/viewPost.api'
import { Button, LoaderSpin, Typography } from '@/src/shared/ui'
import { getLayoutWithSidebar } from '@/src/widgets/Layout/LayoutWithSidebar'
import { useEffect, useState } from 'react'

const ProfilePage = () => {
  const [page, setPage] = useState<number>(1)
  const { data, isLoading, isError, isFetching } = useViewPostsQuery(page)
  const posts = data ? data : []
  useEffect(() => {
    const onScroll = () => {
      const scrolledToBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight
      if (scrolledToBottom && !isFetching) {
        console.log('Fetching more data...')
        setPage(page + 1)
      }
    }

    document.addEventListener('scroll', onScroll)

    return function () {
      document.removeEventListener('scroll', onScroll)
    }
  }, [page, isFetching])

  return (
    <div className="flex items-start justify-center w-full min-h-screen h-auto gap-[20px]">
      <div className="w-[46%] h-auto mt-[50px]">
        {isLoading ? (
          <LoaderSpin />
        ) : (
          posts.map((el: any, id: any) => {
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
