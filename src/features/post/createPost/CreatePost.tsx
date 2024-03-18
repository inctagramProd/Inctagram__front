import React, { ChangeEvent, useState } from 'react'
import Cropper from 'react-easy-crop'
import './postStyle.css'
import { useCreatePostMutation } from '@/src/features/post/service/createPostApi'

export const CreatePost = () => {
  const [createPost, { isLoading }] = useCreatePostMutation()
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [aspectRatio, setAspectRatio] = useState<number>()
  const [image, setImage] = useState<any>()
  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    console.log(croppedArea, croppedAreaPixels)
    // createPost({ files: '', description: 'descriptions' })
  }
  const filePicker: React.RefObject<HTMLInputElement> = React.createRef()

  const uploadPhotoHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      // const file = event.target.files[0]
      const file = new File([event.target.files[0]], 'hello', { type: 'image/jpeg' })
      const formData = new FormData()
      formData.append('images', file)
      formData.append('description', 'some text')
      createPost(formData)
      const readFile = new FileReader()
      readFile.readAsDataURL(file)
      readFile.onload = () => {
        setImage(readFile.result)
        // console.log(readFile.result)
      }
    }
  }

  const handlerPick = () => {
    filePicker.current?.click()
  }

  return (
    <div className="App">
      <input
        ref={filePicker}
        className={''}
        type="file"
        accept="image*/,.png,.jpeg, .jpg"
        onChange={uploadPhotoHandler}
      />
      <button onClick={handlerPick}>pick file</button>
      <div className="crop-container">
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={aspectRatio}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
      <form action="" className="flex gap-2">
        <label htmlFor="ratio4/5">aspect ratio 4:5</label>
        <input
          name={'ratio4/5'}
          type="radio"
          value={aspectRatio}
          checked={aspectRatio === AspectRatio['4/5']}
          onChange={e => {
            setAspectRatio(4 / 5)
          }}
        />
        <label htmlFor="ratio16/8">aspect ratio 16:8</label>
        <input
          name={'ratio16/8'}
          type="radio"
          value={aspectRatio}
          checked={aspectRatio === AspectRatio['16/9']}
          onChange={e => {
            setAspectRatio(16 / 9)
          }}
        />
        <label htmlFor="ratio1/1">aspect ratio 1:1</label>
        <input
          name={'ratio1/1'}
          type="radio"
          value={aspectRatio}
          checked={aspectRatio === AspectRatio['1/1']}
          onChange={e => {
            setAspectRatio(1)
          }}
        />
      </form>

      <div className="controls">
        <input
          type="range"
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          aria-labelledby="Zoom"
          onChange={e => {
            setZoom(Number(e.target.value))
          }}
          className="zoom-range"
        />
      </div>
    </div>
  )
}

// types
enum AspectRatio {
  '1/1' = 1 / 1,
  '4/5' = 4 / 5,
  '16/9' = 16 / 9,
}

// "https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000"