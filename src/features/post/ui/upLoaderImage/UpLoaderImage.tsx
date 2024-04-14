import React, { ChangeEvent, useRef } from 'react'
import { Button, Icon } from '@/src/shared/ui'
import { useTranslate } from '@/src/app/hooks/useTranslate'
import { uploadFile } from '@/src/shared/helpers/uploadFile'

type Props = {
  setImage: (imageUrl: string) => void
}

export const UpLoaderImage = ({ setImage }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { locale } = useTranslate()

  const uploadImageHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    await uploadFile(event, locale).then(imageUrl => {
      if (imageUrl) {
        setImage(imageUrl?.url)
      }
    })
  }

  const handlerPick = () => {
    inputRef.current?.click()
  }

  return (
    <>
      <input
        ref={inputRef}
        onChange={uploadImageHandler}
        type="file"
        accept="image*/,.png,.jpeg,.jpg"
        className="hidden"
      />
      <div className="flex justify-center items-center flex-col mt-[72px]">
        <div className="bg-dark-500 w-[222px] h-[228px] flex items-center justify-center mb-[60px]">
          <Icon iconName="imgOutlineIcon" height={48} width={48} />
        </div>
        <Button onClick={handlerPick} style="primary" label={locale.profile.selectFromComputer} />
      </div>
    </>
  )
}
