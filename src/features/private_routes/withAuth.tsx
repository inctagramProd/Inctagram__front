import { redirect } from 'next/navigation'
import { useEffect } from 'react'

let isUserAuth = true
export const withAuth = (Component: any) => {
  return function WithAuth(props: any) {
    let session = isUserAuth

    useEffect(() => {
      if (!session) {
        redirect('/auth/sign-in')
      }
    }, [])

    if (!session) {
      return null
    }

    return <Component {...props} />
  }
}
