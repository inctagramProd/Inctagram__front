import { useEffect, useState } from 'react'
import { useViewPostsQuery, Post } from '@/src/entities/Posts'
import { withAuth } from '@/src/features/private_routes/withAuth'
import { getLayoutWithSidebar } from '@/src/widgets/Layout/LayoutWithSidebar'

const HomePage = () => {
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

  const postsMock = [
    {
      comments: [
        {
          name: 'Bear1998[RUS]',
          comment: ' GOOOOOOOOOAAAAAL!!!',
          data: '12/03/2024',
          avatar: '/mock-pics/goal-mini.png',
        },
        {
          name: 'Miura',
          comment: ' Afftar pishi ischo',
          data: '12/03/2024',
          avatar: '/mock-pics/6.jpg',
        },
        {
          name: 'Neco arc',
          comment: ' Dori-dori :3',
          data: '12/03/2024',
          avatar: '/mock-pics/arc.jpeg',
        },
      ],
      likes: [
        {
          name: 'Valera',
          like: true,
          avatar: '/mock-pics/1.png',
        },
        {
          name: 'Alex',
          like: true,
          avatar: '/mock-pics/2.jpg',
        },
        {
          name: 'Shlomo',
          like: true,
          avatar: '/mock-pics/4.jpg',
        },
        {
          name: 'David',
          like: true,
          avatar: '/mock-pics/6.jpg',
        },
      ],
      postDescription: 'Commodi consequatur in laudantium minima natus possimus rem. Lorem ipsum.',
      postImages: [
        {
          imageUrl: '/mock-pics/1.png',
        },
        {
          imageUrl: '/mock-pics/2.jpg',
        },
        {
          imageUrl: '/mock-pics/4.jpg',
        },
        {
          imageUrl: '/mock-pics/6.jpg',
        },
      ],
      name: 'Alex',
    },
    {
      comments: [],
      likes: [
        {
          name: 'Valera',
          like: true,
          avatar: '/mock-pics/1.png',
        },
        {
          name: 'Alex',
          like: true,
          avatar: '/mock-pics/2.jpg',
        },
        {
          name: 'Shlomo',
          like: true,
          avatar: '/mock-pics/4.jpg',
        },
        {
          name: 'David',
          like: true,
          avatar: '/mock-pics/6.jpg',
        },
        {
          name: 'nagibator2001',
          like: true,
          avatar: '/mock-pics/3.jpg',
        },
        {
          name: 'Kira282',
          like: true,
          avatar: '/mock-pics/5.jpg',
        },
      ],
      postDescription: 'It is second post',
      postImages: [
        {
          imageUrl: '/mock-pics/6.jpg',
        },
        {
          imageUrl: '/mock-pics/7.jpg',
        },
      ],
      name: 'Alex',
    },
    {
      comments: [],
      likes: [
        {
          name: 'Kek7',
          like: true,
          avatar: '/mock-pics/1.jpg',
        },
        {
          name: 'Otaku',
          like: true,
          avatar: '/mock-pics/itachi.jpg',
        },
        {
          name: 'Mikha',
          like: true,
          avatar: '/mock-pics/goal-mini.png',
        },
        {
          name: 'Otaku',
          like: true,
          avatar: '/mock-pics/sam.jpg',
        },
      ],
      postDescription: null,
      postImages: [
        {
          imageUrl: '/mock-pics/5.jpg',
        },
        {
          imageUrl: '/mock-pics/3.jpg',
        },
      ],
      name: 'Sveta',
    },
    {
      comments: [],
      likes: [
        {
          name: 'Chud',
          like: true,
          avatar: '/mock-pics/griffith.jpg',
        },
        {
          name: 'Otaku',
          like: true,
          avatar: '/mock-pics/itachi.jpg',
        },
      ],
      postDescription:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus accusantium aspernatur aut, blanditiis consequatur deleniti dolores eos fugiat harum illum iusto magnam nesciunt non officiis perspiciatis possimus tempora tempore temporibus. Commodi consequatur in laudantium minima natus possimus rem. Accusamus alias, cupiditate deserunt error est id illo iusto maxime molestiae officia quos repellendus tempora temporibus?',
      postImages: [
        {
          imageUrl: '/mock-pics/goal.png',
        },
      ],
      name: 'Sasha007',
    },
  ]

  return (
    <div className="flex items-start justify-center w-full min-h-screen h-auto gap-[20px]">
      <div className="flex flex-col w-[46%] h-auto mt-[50px] mb-[50px] gap-20">
        {postsMock.map((el: any, id: any) => {
          return (
            <Post
              name={el.name}
              img={el.postImages}
              postDescription={el.postDescription}
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

HomePage.getLayout = getLayoutWithSidebar
export default withAuth(HomePage)
