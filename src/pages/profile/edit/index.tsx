import { RefObject, useRef, useState } from 'react'

import {
  Button,
  DatePickerInput,
  Icon,
  Input,
  Select,
  Tabs,
  TextArea,
  Typography,
} from '@/src/shared/ui'
import { getLayoutWithSidebar } from '@/src/widgets/Layout/LayoutWithSidebar'

const EditProfile = () => {
  const [selectedImage, setSelectedImage] = useState<null | string>(null)
  const uploadRef: RefObject<HTMLInputElement> = useRef(null)

  const handleImageUpload = (e: { target: any }): void => {
    const file = e.target.files[0]
    const reader = new FileReader()

    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        setSelectedImage(reader.result)
      }
    }

    if (file) {
      reader.readAsDataURL(file)
    }
  }

  const handleOpenFileUploadWindow = () => {
    if (uploadRef.current) {
      uploadRef.current.click()
    }
  }

  return (
    <div className={'pt-6 pl-6'}>
      <Tabs
        options={[
          { key: 'general_information', label: 'General information' },
          { key: 'devices', label: 'Devices' },
          { key: 'account_management', label: 'Account Management' },
          { key: 'my_payments', label: 'My payments' },
        ]}
      ></Tabs>
      <div className={'flex gap-12 flex-row mt-6'}>
        <div className={'w-full max-w-[196px]'}>
          <div
            className={
              'photo_block w-[196px] h-[196px] bg-dark-500 rounded-full flex justify-center items-center'
            }
          >
            {selectedImage ? (
              <img
                alt={'Profile'}
                className={'rounded-full w-full h-full object-cover'}
                src={selectedImage}
              />
            ) : (
              <Icon height={48} iconName={'Picture'} width={48} />
            )}
          </div>
          <div className={'mt-6 upload'}>
            <label>
              <Button
                label={'Add a Profile Photo'}
                onClick={handleOpenFileUploadWindow}
                style={'outline'}
              ></Button>
              <input
                accept={'image/jpeg, image/png'}
                className={'hidden'}
                id={'upload-button'}
                onChange={handleImageUpload}
                ref={uploadRef}
                type={'file'}
              />
            </label>
          </div>
        </div>
        <div className={'flex-1 flex flex-col gap-4'}>
          <Input label={'Username'} required type={'text'}></Input>
          <Input label={'First Name'} required type={'text'}></Input>
          <Input label={'Last Name'} required type={'text'}></Input>
          <DatePickerInput label={'Date of birth'} />
          <div className={'flex flex-row gap-4'}>
            <div className={'flex-1'}>
              <Typography
                children={'About Me'}
                className={'text-light-900'}
                variant={'regular_14'}
              />
              <Select
                className={'max-w-none z-10'}
                options={[
                  { title: 'Belarus', value: 'Belarus' },
                  { title: 'Russia', value: 'Russia' },
                ]}
              />
            </div>
            <div className={'flex-1'}>
              <Typography
                children={'About Me'}
                className={'text-light-900'}
                variant={'regular_14'}
              />
              <Select
                className={'max-w-none w-full z-10'}
                options={[
                  { title: 'Minsk', value: 'Minsk' },
                  { title: 'Moscow', value: 'Moscow' },
                ]}
              />
            </div>
          </div>
          <div>
            <Typography children={'About Me'} className={'text-light-900'} variant={'regular_14'} />
            <TextArea placeholder={'Enter text'} />
          </div>
        </div>
      </div>
      <div className={'flex items-end flex-col'}>
        <div className={'w-full h-px bg-dark-300 mt-4 mb-4'}></div>
        <div>
          <Button label={'Save Changes'} style={'primary'} />
        </div>
      </div>
    </div>
  )
}

EditProfile.getLayout = getLayoutWithSidebar

export default EditProfile
