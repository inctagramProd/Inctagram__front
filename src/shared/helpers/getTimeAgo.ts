import { useTranslate } from '@/src/app/hooks/useTranslate'

export const getTimeAgo = (dateString: string): string => {
  const { locale } = useTranslate()
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  const intervals: {
    week: number
    month: number
    hour: number
    year: number
    day: number
    minute: number
    second: number
  } = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  }

  for (const [unit, seconds] of Object.entries(intervals) as [
    Intl.RelativeTimeFormatUnit,
    number
  ][]) {
    const value = Math.floor(diffInSeconds / seconds)
    if (value >= 1) {
      return new Intl.RelativeTimeFormat(locale.locale.language, { numeric: 'auto' }).format(
        -value,
        unit
      )
    }
  }

  return locale.profile.addNewPost.timeCreatePost
}
