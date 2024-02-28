import Posts from '@/src/shared/components/Posts/Posts'
import { Typography } from '@/src/shared/ui'
import { getLayoutWithSidebar } from '@/src/widgets/Layout/LayoutWithSidebar'

const posts = [
  {
    name: 'Alex',
    img: ['1.jpg', '2.jpg', '3.jpg'],
    postDescreption: null,
    like: null,
    comments: null,
  },
  {
    name: 'Alex',
    img: ['1.jpg', '2.jpg', '3.jpg'],
    postDescreption: null,
    like: 10,
    comments: null,
  },

  {
    name: 'Alex',
    img: ['1.jpg', '2.jpg', '3.jpg'],
    postDescreption: null,
    like: 10,
    comments: null,
  },

  {
    name: 'Alex',
    img: ['1.jpg', '2.jpg', '3.jpg'],
    postDescreption: null,
    like: 10,
    comments: null,
  },

  {
    name: 'Alex',
    img: ['1.jpg', '2.jpg', '3.jpg'],
    postDescreption: null,
    like: 10,
    comments: null,
  },

  {
    name: 'Alex',
    img: ['1.jpg', '2.jpg', '3.jpg'],
    postDescreption: null,
    like: 10,
    comments: null,
  },

  {
    name: 'Alex',
    img: ['1.jpg', '2.jpg', '3.jpg'],
    postDescreption: null,
    like: 10,
    comments: null,
  },
]
const ProfilePage = () => {
  return (
    <div className="flex items-start justify-center w-full min-h-screen h-auto gap-[20px]">
      <div className="w-[46%] h-auto mt-[50px]">
        {posts.map((el, id) => {
          return (
            <Posts
              name={el.name}
              img={el.img}
              postDescreption={el.postDescreption}
              like={el.like}
              comments={el.comments}
              key={id}
            />
          )
        })}
      </div>
    </div>
  )
}

ProfilePage.getLayout = getLayoutWithSidebar
export default ProfilePage
