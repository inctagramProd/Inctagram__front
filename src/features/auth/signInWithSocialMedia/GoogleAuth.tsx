import { useEffect, useState } from 'react'
import { Icon } from '@/src/shared/ui'
import { useGoogleAuthMutation } from '@/src/shared/api/AuthApi'
import { api } from '@/src/shared/api/ThirdPartyApi'
import { LoaderSpin } from '@/src/shared/ui/Loader/Loader'

type Props = {
  iconName: 'GoogleLogo' | 'GithubLogo'
}

const GoogleAuth = ({ iconName }: Props) => {
  const [Auth, { data, isLoading, isError }] = useGoogleAuthMutation()
  const [statusGoogle, setStatusGoogle] = useState<boolean>(false)
  function LoginWithApi() {
    setStatusGoogle(true)
    localStorage.setItem('Google', 'true')
    localStorage.removeItem('Git')
    const googlePath =
      api.googleAuth + api.clientGoogleId + api.redirUrl + api.clientUrl + api.googleScope
    window.location.assign(googlePath)
  }

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
  console.log(data)
  if (isLoading) {
    return <LoaderSpin />
  } else if (isError) {
    return (
      <div>
        <h1>{isError}</h1>
      </div>
    )
  }
  return (
    <div onClick={LoginWithApi}>
      <Icon iconName={iconName} />
    </div>
  )
}

export default GoogleAuth
