export type PostsProps = {
  name: string
  img: string[]
  postDescreption: string | null
  like: number | null
  comments: string[] | null
}
const Posts = ({ name, img, postDescreption, like, comments }: PostsProps) => {
  return (
    <>
      <div className="border border-solid border-indigo-500 w-full h-[30px]">{name}</div>
      <div className="border border-solid border-indigo-500 w-full h-[450px]">{img}</div>
      <div className="border border-solid border-indigo-500 w-full h-[30px]">settings</div>
      <div className="border border-solid border-indigo-500 w-full h-[60px]">{postDescreption}</div>
      <div className="border border-solid border-indigo-500 w-full h-[30px]">Likes:{like}</div>
      <div className="border border-solid border-indigo-500 w-full h-[30px]">
        Comments:{comments}
      </div>
    </>
  )
}

export default Posts
