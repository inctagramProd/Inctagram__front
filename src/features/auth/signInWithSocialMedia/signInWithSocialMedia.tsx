import { useEffect } from 'react'
import { Icon } from '@/src/shared/ui'
import { useGitAuthMutation, useGoogleAuthMutation } from '@/src/shared/api/AuthApi'
import { api } from '@/src/shared/api/ThirdPartyApi'
import Loader from '@/src/shared/ui/Loader/Loader'

type Props = {
  iconName: 'GoogleLogo' | 'GithubLogo'
  name: 'Git' | 'Google'
}

const SignInWithSocialMedia = ({ iconName, name }: Props) => {
  const [Auth, { data, isLoading, isError }] =
    name === 'Git' ? useGitAuthMutation() : useGoogleAuthMutation()
  function LoginWithApi() {
    const gitPath = api.gitAuth + api.clientGitId + `&scope=read:user,user:email`
    const googlePath = api.gitAuth + api.clientGitId + `&scope=read:user,user:email`
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
    return <Loader />
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
