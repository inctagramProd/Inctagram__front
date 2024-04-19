import { Icon, Typography } from '@/src/shared/ui'
import { MutableRefObject, useEffect, useRef, useState } from 'react'
import { useTranslate } from '@/src/app/hooks/useTranslate'
import { AspectRatio } from '@/src/entities/post/ui/aspectRatioImage/service/types/aspectRatioType'
import { useAppDispatch } from '@/src/app/store/store'
import { updateImage } from '@/src/entities/post/model/slice/postSlice'

type Props = {
  imageURL: string
  aspectRatio: number
}

export const AspectRatioImage = ({ imageURL, aspectRatio }: Props) => {
  const [isOpenAspect, setIsOpenAspect] = useState<boolean>(false)
  const addRef = useRef() as MutableRefObject<HTMLDivElement>
  const { locale } = useTranslate()
  const dispatch = useAppDispatch()

  const changeAspectHandler = (aspect: number) => () => {
    dispatch(updateImage({ aspect, imageURL }))
  }

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
        <Icon
          iconName="cropIcon"
          height={26}
          width={26}
          iconStyle="fill-light-100 hover:fill-primary-500"
        />
      </div>
      {isOpenAspect && (
        <div className="absolute -top-40 left-0 py-2.5 px-3.5 flex flex-col gap-y-3 rounded-sm bg-dark-500 bg-opacity-75 w-[156px]">
          <div className="flex justify-between cursor-pointer" onClick={changeAspectHandler(4 / 3)}>
            <Typography
              variant={aspectRatio === AspectRatio.original ? 'regular_16' : 'not_active'}
            >
              {locale.profile.profileSetting.original}
            </Typography>
            <Icon
              iconName="imgOutlineIcon"
              width={24}
              height={24}
              iconStyle={aspectRatio === AspectRatio.original ? 'fill-light-100' : 'fill-dark-300'}
            />
          </div>
          <div className="flex justify-between cursor-pointer" onClick={changeAspectHandler(1)}>
            <Typography variant={aspectRatio === AspectRatio['1:1'] ? 'regular_16' : 'not_active'}>
              1:1
            </Typography>
            <Icon
              iconName="rectangleIcon1_1"
              width={18}
              height={18}
              iconStyle={
                aspectRatio === AspectRatio['1:1'] ? 'brightness-0 invert' : ' invert saturate hue-rotate-180'
              }
            />
          </div>
          <div className="flex justify-between cursor-pointer" onClick={changeAspectHandler(4 / 5)}>
            <Typography variant={aspectRatio === AspectRatio['4/5'] ? 'regular_16' : 'not_active'}>
              4:5
            </Typography>
            <Icon iconName="rectangleIcon4_5" width={18} height={26} iconStyle={aspectRatio === AspectRatio["4/5"] ? 'brightness-0 invert' : ' invert saturate hue-rotate-180'} />
          </div>
          <div
            className="flex justify-between cursor-pointer"
            onClick={changeAspectHandler(16 / 9)}
          >
            <Typography variant={aspectRatio === AspectRatio['16/9'] ? 'regular_16' : 'not_active'}>
              16:9
            </Typography>
            <Icon
              iconName="rectangleIcon16_9"
              width={26}
              height={20}
              iconStyle={aspectRatio === AspectRatio['16/9'] ? 'brightness-0 invert' : 'invert saturate hue-rotate-180'}
            />
          </div>
        </div>
      )}
    </div>
  )
}

