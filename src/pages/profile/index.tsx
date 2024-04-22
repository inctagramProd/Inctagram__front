import Posts from '@/src/shared/components/Posts/Posts'
import { Typography } from '@/src/shared/ui'
import { getLayoutWithSidebar } from '@/src/widgets/Layout/LayoutWithSidebar'

const posts = [
  {
    name: 'Alex',
    img: [
      'https://as2.ftcdn.net/v2/jpg/07/40/63/61/1000_F_740636193_LaH6wbGYu9RIIinG1kCDPtJgOLkq494b.jpg',
      'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg',
      'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg',
    ],
    postDescreption: null /* 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum' */,
    like: null,
    comments: null,
  },
  /*   {
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
  }, */
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
