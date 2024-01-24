import { getLayoutWithSidebar } from '@/src/widgets/Layout/LayoutWithSidebar'
import { Button, Icon, Input, Select, Tabs, Typography, TextArea } from '@/src/shared/ui'
import { RefObject, useRef, useState } from 'react'

const EditProfile = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
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
                src={selectedImage}
                alt="Profile"
                className="rounded-full w-full h-full object-cover"
              />
            ) : (
              <Icon iconName="Picture" width={48} height={48} />
            )}
          </div>
          <div className={'mt-6 upload'}>
            <label>
              <Button
                label={'Add a Profile Photo'}
                style={'outline'}
                onClick={handleOpenFileUploadWindow}
              ></Button>
              <input
                type="file"
                accept="image/jpeg, image/png"
                onChange={handleImageUpload}
                className={'hidden'}
                id="upload-button"
                ref={uploadRef}
              />
            </label>
          </div>
        </div>
        <div className={'flex-1 flex flex-col gap-4'}>
          <Input label={'Username'} type={'text'}></Input>
          <Input label={'First Name'} type={'text'}></Input>
          <Input label={'Last Name'} type={'text'}></Input>
          <div className={'flex flex-row gap-4'}>
            <div className={'flex-1'}>
              <Typography
                variant={'regular_14'}
                children={'About Me'}
                className={'text-light-900'}
              />
              <Select
                className={'max-w-none'}
                options={[
                  { title: 'Belarus', value: 'Belarus' },
                  { title: 'Russia', value: 'Russia' },
                ]}
              />
            </div>
            <div className={'flex-1'}>
              <Typography
                variant={'regular_14'}
                children={'About Me'}
                className={'text-light-900'}
              />
              <Select
                className={'max-w-none w-full'}
                options={[
                  { title: 'Minsk', value: 'Minsk' },
                  { title: 'Moscow', value: 'Moscow' },
                ]}
              />
            </div>
          </div>
          <div>
            <Typography variant={'regular_14'} children={'About Me'} className={'text-light-900'} />
            <TextArea placeholder={'Enter text'} />
          </div>
        </div>
      </div>
      <div className={'flex items-end flex-col'}>
        <div className={'w-full h-px bg-dark-300 mt-4 mb-4'}></div>
        <div>
          <Button style={'primary'} label={'Save Changes'} />
        </div>
      </div>
    </div>
  )
}

EditProfile.getLayout = getLayoutWithSidebar

export default EditProfile
