import { Icon, Typography } from '@/src/shared/ui'
import { MutableRefObject, useEffect, useRef, useState } from 'react'
import { useTranslate } from '@/src/app/hooks/useTranslate'
import {AspectRatio} from "@/src/features/post/createPost/editImage/aspectRatioImage/service/types/aspectRatioType";

type Props = {
  aspectRatio: number
  setAspectRatio: (value: number) => void
}

export const AspectRatioImage = ({ aspectRatio, setAspectRatio }: Props) => {
  const [isOpenAspect, setIsOpenAspect] = useState<boolean>(false)
  const addRef = useRef() as MutableRefObject<HTMLDivElement>
  const { locale } = useTranslate()

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (addRef.current && !e.composedPath().includes(addRef.current)) {
        setIsOpenAspect(false)
      }
    }
    document.body.addEventListener('click', handleClickOutside)
    return () => document.body.removeEventListener('click', handleClickOutside)
  }, [])

  return (
    <div
      ref={addRef}
      className="relative w-9 h-9 flex items-center justify-center rounded-sm bg-dark-500 bg-opacity-75"
    >
      <div
        className="cursor-pointer"
        onClick={() => {
          setIsOpenAspect(prev => !prev)
        }}
      >
        <Icon iconName="cropIcon" height={26} width={26} />
      </div>
      {isOpenAspect && (
        <div className="absolute -top-40 left-0 py-2.5 px-3.5 flex flex-col gap-y-3 rounded-sm bg-dark-500 bg-opacity-75 w-[156px]">
          <div
            className="flex justify-between cursor-pointer"
            onClick={() => {
              setAspectRatio(4 / 3)
            }}
          >
            <Typography variant={aspectRatio === AspectRatio.original ? 'regular_16' : 'not_active'}>
              {locale.profile.profileSetting.original}
            </Typography>
            <Icon iconName="imgOutlineIcon" width={24} height={24} />
          </div>
          <div
            className="flex justify-between cursor-pointer"
            onClick={() => {
              setAspectRatio(1)
            }}
          >
            <Typography variant={aspectRatio === AspectRatio["1:1"] ? 'regular_16' : 'not_active'}>1:1</Typography>
            <Icon iconName="rectangleIcon" width={18} height={18} />
          </div>
          <div
            className="flex justify-between cursor-pointer"
            onClick={() => {
              setAspectRatio(4 / 5)
            }}
          >
            <Typography variant={aspectRatio === AspectRatio["4/5"]? 'regular_16' : 'not_active'}>
              4:5
            </Typography>
            <Icon iconName="rectangleIcon" width={18} height={26} />
          </div>
          <div
            className="flex justify-between cursor-pointer"
            onClick={() => {
              setAspectRatio(16 / 9)
            }}
          >
            <Typography variant={aspectRatio === AspectRatio["16/9"] ? 'regular_16' : 'not_active'}>
              16:9
            </Typography>
            <Icon iconStyle={'border'} iconName="rectangleIcon" width={26} height={20} />
          </div>
        </div>
      )}
    </div>
  )
}

