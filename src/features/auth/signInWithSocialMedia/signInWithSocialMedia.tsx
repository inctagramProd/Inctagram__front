//import { useGetUserDataQuery } from '@/src/app/store/users/users.api'

import { useEffect } from 'react'
import { Icon } from '@/src/shared/ui'
import { useAddUserMutation, useGetUserQuery } from '@/src/shared/api/gitAuthApi'

type Props = {
  iconName: 'GoogleLogo' | 'GitHubLogo'
}
class api {
  static serverURL: string = 'https://deepwaterhorizon.ru/api/v1' /* 'http://localhost:3001' */ //backend

  //GITHUB CONFIGS
  static gitHubURL: string = `https://github.com`
  static clientGitId: string = '52f747905128092efbce' /* 'b4ff3618c27e31dfa252' */
  static gitAuth: string = this.gitHubURL + '/login/oauth/authorize?client_id='
  //GOOGLE CONFIGS
}

const SignInWithSocialMedia = ({ iconName }: Props) => {
  const [gitAuth, { data, isError }] = useAddUserMutation()
  function LoginWithApi() {
    window.location.assign(api.gitAuth + api.clientGitId + `&scope=read:user,user:email`)
  }

  useEffect(() => {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const Code = urlParams.get('code')
    if (Code) {
      gitAuth({ code: Code }).unwrap()
    }
  }, [])
  console.log(data)
  return (
    <div onClick={LoginWithApi}>
      <Icon iconName={iconName} />
      <h1>{data?.username}</h1>
    </div>
  )
}

export default SignInWithSocialMedia
