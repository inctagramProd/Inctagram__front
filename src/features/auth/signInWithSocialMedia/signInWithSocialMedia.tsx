import { useEffect } from 'react'
import { Icon } from '@/src/shared/ui'
import { useGitAuthMutation, useGoogleAuthMutation } from '@/src/shared/api/AuthApi'
import { api } from '@/src/shared/api/ThirdPartyApi'
import { LoaderProgressBar } from '@/src/shared/ui/Loader/Loader'

type Props = {
  iconName: 'GoogleLogo' | 'GithubLogo'
  name: 'Git' | 'Google'
}

const SignInWithSocialMedia = ({ iconName, name }: Props) => {
  const [Auth, { data, isLoading, isError }] =
    name === 'Git' ? useGitAuthMutation() : useGoogleAuthMutation()
  function LoginWithApi() {
    const gitPath = api.gitAuth + api.clientGitId + `&scope=read:user`
    const googlePath = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=621596965505-n57cqu1ifnmd34rqls715cao17t8r8n5.apps.googleusercontent.com&redirect_uri=https://inctagram-front.vercel.app/&scope=email profile`
    const targetPath = name === 'Git' ? gitPath : googlePath
    window.location.assign(targetPath)
  }
  useEffect(() => {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const Code = urlParams.get('code')
    if (Code) {
      Auth({ code: Code }).unwrap()
    }
  }, [])
  console.log(data)

  if (isLoading) {
    return <LoaderProgressBar />
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

export default SignInWithSocialMedia
