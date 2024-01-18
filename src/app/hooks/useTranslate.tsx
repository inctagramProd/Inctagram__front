import { en } from '@/public/locales/en'
import { ru } from '@/public/locales/ru'
import { useRouter } from 'next/router'

export const useTranslate = () => {
  const router = useRouter()
  const locale = router.locale === 'en' ? en : ru
  return { locale }
}
