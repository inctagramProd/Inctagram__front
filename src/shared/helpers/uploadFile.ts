import { ChangeEvent } from 'react'
import { LocaleType } from '@/public/locales/en'
import { useToast } from '@/src/app/hooks/useToast'

const MAX_FILE_SIZE_MB = 5 // 5MB
const MAX_FILE_SIZE_KB = MAX_FILE_SIZE_MB * 1024 // Размер в килобайтах

export const uploadFile = async (
  event: ChangeEvent<HTMLInputElement>,
  locale: LocaleType
): Promise<{ url: string } | undefined> => {
  try {
    if (event.target.files?.length) {
      const file = event.target.files[0]
      const fileSizeKilobytes = file.size / 1024 // Преобразуем размер файла в килобайты

      // Проверка на тип файла (только png и jpeg)
      if (!(file.type === 'image/png' || file.type === 'image/jpeg')) {
        useToast({ text: locale.profile.addNewPost.imageError.format, error: true })
        return undefined
      }

      // Проверка на размер файла (не более 5MB)
      if (fileSizeKilobytes > MAX_FILE_SIZE_KB) {
        useToast({ text: locale.profile.addNewPost.imageError.size, error: true })
        return undefined
      }

      // Преобразование файла в data URL
      const url = await readFileAsDataURL(file)
      return { url }
    }
  } catch (error) {
    useToast({ text: locale.profile.addNewPost.imageError.file, error: true })
    return undefined
  }
}

// Функция для чтения файла как data URL
const readFileAsDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = e => {
      resolve(e.target?.result as string)
    }
    reader.onerror = e => {
      reject(e.target?.error)
    }
    reader.readAsDataURL(file)
  })
}
