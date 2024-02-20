import React, { useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import { LayoutWithSidebar } from '@/src/widgets/Layout/LayoutWithSidebar'
import { useAppSelector } from '@/src/app/hooks/useAppSelectorAndDispatch'
import { RootState } from '@/src/app/store/store'
import { useToast } from '@/src/app/hooks/useToast'
import { useTranslate } from '@/src/app/hooks/useTranslate'

export const withAuth = (Component: any) => {
  return React.memo((props: any) => {
    const router = useRouter()
    const accessToken = useAppSelector((state: RootState) => state.signIn?.accessToken)
    const { locale } = useTranslate()

    useEffect(() => {
      if (!accessToken && typeof window !== 'undefined') {
        router.push('/auth/sign-in')
        useToast(`${locale.auth.getLoggedToProceed}`, true)
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
