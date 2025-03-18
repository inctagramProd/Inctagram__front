import { getLayout } from '@/src/widgets/Layout/Layout'
import { useGetTotalUsersCountQuery } from '@/src/features/profile/api/publicProfileApi'
import { useTranslate } from '@/src/app/hooks/useTranslate'
import { CounterRegisteredUsers } from '@/src/entities/user/CounterRegisteredUsers/CounterRegisteredUsers'

const Public = () => {
  const { locale } = useTranslate()
  const { data } = useGetTotalUsersCountQuery()

  return (
    <div className={'w-full'}>
      <CounterRegisteredUsers totalCount={data?.totalCount} locale={locale} />
    </div>
  )
}

Public.getLayout = getLayout

export default Public
