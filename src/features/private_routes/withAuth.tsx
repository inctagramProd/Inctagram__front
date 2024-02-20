import React, { useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import { LayoutWithSidebar } from '@/src/widgets/Layout/LayoutWithSidebar'
import { useAppSelector } from '@/src/app/hooks/useAppSelectorAndDispatch'
import { RootState } from '@/src/app/store/store'
import { useToast } from '@/src/app/hooks/useToast'

export const withAuth = (Component: any) => {
  return React.memo((props: any) => {
    const router = useRouter()
    const accessToken = useAppSelector((state: RootState) => state.signIn?.accessToken)

    useEffect(() => {
      if (!accessToken && typeof window !== 'undefined') {
        router.push('/auth/sign-in')
        useToast('Please get logged in to proceed', true)
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
