import { getLayout } from '@/src/widgets/Layout/Layout'
import { useGetTotalUsersCountQuery } from '@/src/features/profile/api/publicProfileApi'
import { useTranslate } from '@/src/app/hooks/useTranslate'
import { CounterRegisteredUsers } from '@/src/entities/user/CounterRegisteredUsers/CounterRegisteredUsers'
import { useGetAllPublicPostsQuery } from '@/src/features/post/service/publicPostApi'
import { PublicPostsList } from '@/src/entities/post/ui/PublicPostsList/PublicPostsList'
import { HeadMeta } from '@/src/widgets/HeadMeta/HeadMeta'
import { GetTotalUsersResponse } from '@/src/features/profile/model/types/profileTypes'
import { GetPublicPostsResponse } from '@/src/features/post/types/publicPostTypes'
import { api } from '@/src/shared/api/ThirdPartyApi'

export const getStaticProps = async () => {
  try {
    const params = new URLSearchParams({
      pageSize: "4",
      sortDirection: "desc",
    }).toString()

    const [usersRes, postsRes] = await Promise.all([
      fetch(`${api.serverURL}public-user`),
      fetch(`${api.serverURL}public-posts/all?${params}`),
    ])

    if (!usersRes.ok) {
      throw new Error(`Ошибка запроса пользователей: ${usersRes.status} ${usersRes.statusText}`)
    }
    if (!postsRes.ok) {
      throw new Error(`Ошибка запроса постов: ${postsRes.status} ${postsRes.statusText}`)
    }

    const usersData: GetTotalUsersResponse = await usersRes.json()
    const postsData: GetPublicPostsResponse = await postsRes.json()

    return {
      props: {
        usersCount: usersData,
        publicPosts: postsData
      },
      revalidate: 60,
    }
  } catch (error) {
    console.error('Ошибка при загрузке количества пользователей:', error)

    return {
      props: {
        totalCount: { totalCount: 0 },
        publicPosts: { items: [] },
      },
      revalidate: 60,
    }
  }
}

type Props = {
  usersCount: GetTotalUsersResponse
  publicPosts: GetPublicPostsResponse
}

const Public = ({ usersCount, publicPosts }: Props) => {
  const { locale } = useTranslate()

  return (
    <>
      <HeadMeta title="Inctagram | Public page" />
      <div className={'w-[972px] max-w-full m-auto'}>
        <CounterRegisteredUsers totalCount={usersCount?.totalCount} locale={locale} />
        <PublicPostsList publicPosts={publicPosts?.items} />
      </div>
    </>
  )
}

Public.getLayout = getLayout

export default Public
