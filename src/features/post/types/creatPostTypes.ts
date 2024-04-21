export type CurrentWindow = 'description' | 'crop' | 'filter' | 'upload'

export type CreatePostResponse = {
    postId: number;
    postDescription: string;
    createdAt: string;
    updatedAt: string;
    postImages: PostImage[];
}
type PostImage = {
    imageId: number;
    imageUrl: string;
}