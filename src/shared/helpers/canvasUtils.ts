import { CroppedArea } from '@/src/shared/types'

const filtersStyle = {
  'image_filter--clarendon': 'saturate(2)',
  'image_filter--gingham': 'contrast(150%)',
  'image_filter--lark': 'grayscale(100%)',
  'image_filter--moon': 'contrast(110%) brightness(110%) saturate(130%)',
  'image_filter--normal': 'none',
  'image_filter--oldSchool': 'opacity(70%)',
  'image_filter--shabby': 'sepia(100%)',
  'image_filter--silentHill': 'hue-rotate(180deg)',
  'image_filter--xRay': 'invert(100%)',
}

export type FilterImage = keyof typeof filtersStyle

type Params = {
  crop?: CroppedArea | null
  fileName?: string
  filter?: FilterImage
  imageSrc: string
  mode?: 'blob' | 'filters' | 'formData' | 'url'
}

export const getModifiedImage = ({
  crop = null,
  fileName = 'file',
  filter,
  imageSrc,
  mode = 'formData',
}: Params): Promise<Blob | FormData | string> => {
  return new Promise((resolve, reject) => {
    const image = new Image()

    image.src = imageSrc

    image.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      if (!crop) {
        canvas.width = image.naturalWidth
        canvas.height = image.naturalHeight

        if (ctx) {
          if (mode === 'filters' && filter) {
            ctx.filter = filtersStyle[filter]
          }

          ctx.drawImage(image, 0, 0)
        }
      } else {
        const scaleX = image.naturalWidth / image.width
        const scaleY = image.naturalHeight / image.height

        canvas.width = crop.width
        canvas.height = crop.height

        if (ctx) {
          if (mode === 'filters' && filter) {
            ctx.filter = filtersStyle[filter]
          }

          ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
          )
        }
      }

      canvas.toBlob(blob => {
        if (!blob) {
          reject(new Error('error'))

          return
        }

        if (mode === 'formData') {
          const formData = new FormData()

          formData.append(fileName, blob)
          resolve(formData)
        } else if (mode === 'url' || mode === 'filters') {
          resolve(URL.createObjectURL(blob))
        } else {
          resolve(blob)
        }
      }, 'image/jpeg')
    }

    image.onerror = () => {
      reject(new Error('error'))
    }
  })
}
