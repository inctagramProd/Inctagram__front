import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { LayoutWithSidebar } from '@/src/widgets/Layout/LayoutWithSidebar'

let isUserAuth = false
export const withAuth = (Component: any) => {
  return function WithAuth(props: any) {
    const router = useRouter()
    let session = isUserAuth

    useEffect(() => {
      if (!session && typeof window !== 'undefined') {
        router.push('/auth/sign-in')
      }
    }, [session, router])

    if (!session) {
      return null
    }

    return (
      <LayoutWithSidebar>
        <Component {...props} />
      </LayoutWithSidebar>
    )
  }
}
