import { Typography } from '@/src/shared/ui'
import { LocaleType } from '@/public/locales/en'

type Props = {
  totalCount: number | undefined
  locale: LocaleType
}

export const CounterRegisteredUsers = ({ totalCount, locale }: Props) => {
  if (totalCount === undefined) return null

  const arrTotalUsers = totalCount.toString().split('')

  return (
    <div
      className={
        'w-[972px] h-[72px] py-3 px-6 bg-dark-500 border rounded border-dark-300 m-auto mt-6 flex justify-between items-center'
      }
    >
      <Typography variant="h2">{locale.profile.registeredUsers}</Typography>
      <div className={'flex border rounded border-dark-300 bg-dark-700 py-2 px-2 cursor-default'}>
        {arrTotalUsers.map((el, index) => (
          <span
            className={'[&:not(:last-child)]:border-r border-dark-300 w-7 text-center text-lg'}
            key={index}
          >
            {el}
          </span>
        ))}
      </div>
    </div>
  )
}