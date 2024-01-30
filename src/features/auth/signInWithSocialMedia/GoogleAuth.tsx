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
    const googlePath =
      api.googleAuth + api.clientGoogleId + api.redirUrl + api.clientUrl + api.googleScope
    window.location.assign(googlePath)
  }

  useEffect(() => {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const Code = urlParams.get('code')
    if (Code) {
      if (statusGoogle) {
        Auth({ code: Code }).unwrap()
        console.log(statusGoogle)
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
