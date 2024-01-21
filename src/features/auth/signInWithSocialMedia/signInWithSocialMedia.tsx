//import { useGetUserDataQuery } from '@/src/app/store/users/users.api'

import { useEffect } from 'react'
import { Icon } from '@/src/shared/ui'
import { useGitAuthMutation, useGoogleAuthMutation } from '@/src/shared/api/AuthApi'

type Props = {
  iconName: 'GoogleLogo' | 'GitHubLogo'
  name: 'Git' | 'Google'
}
class api {
  static serverURL: string = 'https://deepwaterhorizon.ru/api/v1' /* 'http://localhost:3001' */ //backend

  //GITHUB CONFIGS
  static gitHubURL: string = `https://github.com`
  static clientGitId: string = '52f747905128092efbce' /* 'b4ff3618c27e31dfa252' */
  static gitAuth: string = this.gitHubURL + '/login/oauth/authorize?client_id='
  //GOOGLE CONFIGS
}

const SignInWithSocialMedia = ({ iconName, name }: Props) => {
  iconName = 'GoogleLogo'

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
    return (
      <div>
        <h1>Is Loading....</h1>
      </div>
    )
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
      <h1>{data?.username}</h1>
    </div>
  )
}

export default SignInWithSocialMedia
