import { getLayout } from '@/src/widgets/Layout/Layout'
import { useGetTotalUsersCountQuery } from '@/src/features/profile/api/publicProfileApi'
import { useTranslate } from '@/src/app/hooks/useTranslate'
import { CounterRegisteredUsers } from '@/src/entities/user/CounterRegisteredUsers/CounterRegisteredUsers'
import { useGetAllPublicPostsQuery } from '@/src/features/post/service/publicPostApi'
import { PublicPostsList } from '@/src/entities/post/ui/PublicPostsList/PublicPostsList'
import { HeadMeta } from '@/src/widgets/HeadMeta/HeadMeta'


const Public = () => {
  const { locale } = useTranslate()
  const { data: totalCountUser } = useGetTotalUsersCountQuery()
  const { data: publicPosts } = useGetAllPublicPostsQuery({})


  return (
    <>
      <HeadMeta title="Inctagram | Public page" />
      <div className={'w-[972px] max-w-full m-auto'}>
        <CounterRegisteredUsers totalCount={totalCountUser?.totalCount} locale={locale} />
        <PublicPostsList publicPosts={publicPosts?.items} />
      </div>
    </>
  )
}

Public.getLayout = getLayout

export default Public
