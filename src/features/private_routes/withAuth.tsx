import React, { useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import { LayoutWithSidebar } from '@/src/widgets/Layout/LayoutWithSidebar'
import { useAppSelector } from '@/src/app/hooks/useAppSelectorAndDispatch'
import { RootState } from '@/src/app/store/store'

export const withAuth = (Component: any) => {
  return React.memo((props: any) => {
    const router = useRouter()
    const accessToken = useAppSelector((state: RootState) => state.signIn?.accessToken)

    useEffect(() => {
      if (!accessToken && typeof window !== 'undefined') {
        router.push('/auth/sign-in')
      }
    }, [accessToken, router])

    if (!accessToken) {
      return null
    }

    return (
      <LayoutWithSidebar>
        <Component {...props} />
      </LayoutWithSidebar>
    )
  })
}
