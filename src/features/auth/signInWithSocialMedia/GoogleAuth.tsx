import { useEffect } from 'react'
import { Icon } from '@/src/shared/ui'
import { useGoogleAuthMutation } from '@/src/features/auth/signInWithSocialMedia/service/authApi'
import { api } from '@/src/shared/api/ThirdPartyApi'
import { LoaderSpin } from '@/src/shared/ui/Loader/Loader'

type Props = {
  name: 'Google' | 'Git'
}

const GoogleAuth = ({ name }: Props) => {
  const [Auth, { data, isLoading, isError }] = useGoogleAuthMutation()
  useEffect(() => {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const Code = urlParams.get('code')
    console.log(localStorage.getItem('Google'))
    if (Code) {
      if (localStorage.getItem('Google') === 'true') {
        Auth({ code: Code }).unwrap()
      }
    }
  }, [])
  function LoginWithApi() {
    localStorage.setItem('Google', 'true')
    localStorage.removeItem('Git')
    const googlePath =
      api.googleAuth + api.clientGoogleId + api.redirUrl + api.clientUrl + api.googleScope
    window.location.assign(googlePath)
  }
  console.log(data)
  return isLoading ? (
    <LoaderSpin />
  ) : isError ? (
    <h1>isError</h1>
  ) : (
    <div onClick={LoginWithApi}>
      <Icon iconName={`${name}Logo`} />
    </div>
  )
}

export default GoogleAuth
