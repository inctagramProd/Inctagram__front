import { ChangeEvent } from 'react'
import { useToast } from '@/src/app/hooks/useToast'
import { LocaleType } from '@/public/locales/en'

const MAX_FILE_SIZE = 1024 // 1MB

export const uploadFile = async (
  event: ChangeEvent<HTMLInputElement>,
  locale: LocaleType
): Promise<{ url: string } | undefined> => {
  try {
    if (event.target.files?.length) {
      const file = event.target.files[0]
      const fileSizeKilobytes = file.size / 1024

      if (!(file.type === 'image/png' || file.type === 'image/jpeg')) {
        useToast({ text: locale.profile.addNewPost.imageError.format, error: true })
        return undefined
      }
      if (fileSizeKilobytes > MAX_FILE_SIZE) {
        useToast({ text: locale.profile.addNewPost.imageError.size, error: true })
        return undefined
      }

      const url = await readFileAsDataURL(file)
      return { url }
    }
  } catch (error) {
    useToast({ text: locale.profile.addNewPost.imageError.file, error: true })
    return undefined
  }
}

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