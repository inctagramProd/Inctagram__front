import React, { ChangeEvent, useState } from 'react'
import Cropper from 'react-easy-crop'
import './postStyle.css'
import { useCreatePostMutation } from '@/src/features/post/service/createPostApi'

export const CreatePost = () => {
  const [createPost, { isLoading }] = useCreatePostMutation()
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [image, setImage] = useState<any>()
  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    console.log(croppedArea, croppedAreaPixels)
  }
  const filePicker: React.RefObject<HTMLInputElement> = React.createRef()
  const uploadPhotoHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      console.log(event.target.files)
      setImage(event.target.files[0].name)
      // createPost({ files: event.target.files[0] })
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
      <button onClick={handlerPick}>file</button>
      <div className="crop-container">
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={4 / 3}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
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

// "https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000"