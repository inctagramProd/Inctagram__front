import { ChangeEvent } from 'react'

export const uploadFile = async (
  event: ChangeEvent<HTMLInputElement>
): Promise<
  | {
      url: string
    }
  | undefined
> => {
  try {
    if (event.target.files?.length) {
      const file = event.target.files[0]
      const url = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = e => {
          resolve(e.target?.result as string)
        }
        reader.onerror = e => {
          reject(e.target?.error)
        }
        reader.readAsDataURL(file)
      })
      return { url }
    }
  } catch (error) {
    console.error('Ошибка при обработке файла: ', error)
  }
}