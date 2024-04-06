'use client'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PostsState, UpdateImageModel } from '@/src/entities/post/model/types/postSliceTypes'

const initialState: PostsState = {
  images: [],
  croppedImages: [],
  imagesWithFilters: [],
}

export const postsSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setImage(state, action: PayloadAction<string>) {
      state.images.push({
        aspect: 4/3,
        crop: { x: 0, y: 0 },
        croppedAreaPixels: null,
        imageURL: action.payload,
        zoom: 1,
      })
    },
    removeImage(state, action: PayloadAction<string>) {
      state.images = state.images.filter(image => image.imageURL !== action.payload)
    },
    updateImage(state, action: PayloadAction<UpdateImageModel>) {
      const { imageURL, ...updatedEntries } = action.payload

      const imageIdx = state.images.findIndex(el => el.imageURL === imageURL)

      if (imageIdx !== -1) {
        state.images[imageIdx] = { ...state.images[imageIdx], ...updatedEntries }
      }
    },
    setCroppedImage(state: PostsState, action: PayloadAction<string[]>) {
      state.croppedImages = action.payload.map(el => ({
        filter: 'image_filter--normal',
        imageURL: el,
      }))
    },
    resetImage: (state, action: PayloadAction) => {
      state.images = []
      state.croppedImages = []
      state.imagesWithFilters = []
    },
  },
})

export const { setImage, removeImage, updateImage, setCroppedImage, resetImage } =
  postsSlice.actions
export const postsReducer = postsSlice.reducer