type imgType = {
    imageId: number
    imageUrl: string
}
type likeType = {
    name: string
    like: boolean
    avatar: string
}
type comment = {
    name: string
    comment: string
    data: string
}
export type PostsProps = {
    comments: any
    name: string
    img: imgType[]
    postDescreption: string | null
    likes: likeType[]
}