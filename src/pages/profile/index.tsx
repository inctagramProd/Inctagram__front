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
  const post = [
    {
      comments: [
        {
          name: 'Aex',
          comment: ' Comment N1',
          data: '12/03/2024',
          avatar: 'https://www.pngall.com/wp-content/uploads/12/Male-Face-PNG-File.png',
        },
        {
          name: 'Aex',
          comment: ' Comment N2',
          data: '12/03/2024',
          avatar: 'https://imgpng.ru/d/face_PNG5658.png',
        },
        {
          name: 'Aex',
          comment: ' Comment N3',
          data: '12/03/2024',
          avatar: 'https://imgpng.ru/d/face_PNG5658.png',
        },
      ],
      likes: [
        {
          name: 'Valera',
          like: true,
          avatar: 'https://www.pngall.com/wp-content/uploads/12/Male-Face-PNG-File.png',
        },
        {
          name: 'Alex',
          like: true,
          avatar: 'https://imgpng.ru/d/face_PNG5658.png',
        },
        {
          name: 'Luka',
          like: true,
          avatar: 'https://c3.klipartz.com/pngpicture/992/674/sticker-png-kanye-west.png',
        },
        {
          name: 'David',
          like: true,
          avatar: 'https://www.pngall.com/wp-content/uploads/12/Male-Face-PNG-File.png',
        },
      ],
      postDescription: 'It is first post',
      postImages: [
        {
          imageUrl:
            'https://img.goodfon.com/original/360x640/b/5d/sport-snoubord-sneg-spusk-gory-pryzhok-nebo-snoubording-1.jpg',
        },
        {
          imageUrl: 'https://abali.ru/wp-content/uploads/2013/12/uporotij_lis.png',
        },
      ],
      name: 'Alex',
    },
    {
      comments: [],
      likes: [],
      postDescription: 'It is second post',
      postImages: [
        {
          imageUrl: 'https://abali.ru/wp-content/uploads/2013/12/uporotij_lis.png',
        },
        {
          imageUrl:
            'https://img.goodfon.com/original/360x640/b/5d/sport-snoubord-sneg-spusk-gory-pryzhok-nebo-snoubording-1.jpg',
        },
      ],
      name: 'Valera',
    },
    {
      comments: [],
      likes: [],
      postDescription: null,
      postImages: [
        {
          imageUrl:
            'https://img.goodfon.com/original/360x640/b/5d/sport-snoubord-sneg-spusk-gory-pryzhok-nebo-snoubording-1.jpg',
        },
        {
          imageUrl:
            'https://img.goodfon.com/original/360x640/b/5d/sport-snoubord-sneg-spusk-gory-pryzhok-nebo-snoubording-1.jpg',
        },
      ],
      name: 'Sveta',
    },
    {
      comments: [],
      likes: [],
      postDescription:
        'It is fouth post.saddddd ddd ddddd dddddddd ddddd ddd ddd ddddddd dddd dddddd ddddddddd dddddd dsssssss ssssssss sss ddd ddddddd  ssssss ddd ddddddd   ddd ddddd dddddddd ddddd ddd ddd ddddddd dddd dddddd ddddddddd dddddd dsssssss ssssssss sss ddd ddddddd  ssssss ddd ddddddd  ddd ddddddd  sss sssss ddd ddddddd  ssssss sss ddd ddddddd s sssss sssss sssss sssss ss  ddd ddddddd sssss sssssssss',
      postImages: [
        {
          imageUrl:
            'https://img.goodfon.com/original/360x640/b/5d/sport-snoubord-sneg-spusk-gory-pryzhok-nebo-snoubording-1.jpg',
        },
        {
          imageUrl: 'https://abali.ru/wp-content/uploads/2013/12/uporotij_lis.png',
        },
      ],
      name: 'Lexa',
    },
  ]
  return (
    <div className="flex items-start justify-center w-full min-h-screen h-auto gap-[20px]">
      <div className="flex flex-col w-[46%] h-auto mt-[50px] gap-20">
        {post.map((el: any, id: any) => {
          return (
            <Posts
              name={'Alex'}
              img={el.postImages}
              postDescreption={el.postDescription}
              likes={el.likes}
              comments={el.comments}
              key={id}
            />
          )
        })}
        {/* {isLoading ? (
          <LoaderSpin />
        ) : (
          post.map((el: any, id: any) => {
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
        )} */}
      </div>
    </div>
  )
}
ProfilePage.getLayout = getLayoutWithSidebar
export default ProfilePage
