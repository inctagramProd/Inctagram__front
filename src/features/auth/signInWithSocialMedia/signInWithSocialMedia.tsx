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
  // const { data, isLoading, error } = useGetUserQuery(0)
  // console.log(data)
  function LoginWithApi() {
    window.location.assign(api.gitAuth + api.clientGitId + `&scope=read:user,user:email`)
  }
  const [addUser, {}] = useAddUserMutation()
  function handleAddUser() {
    addUser({ name: 'Alina', id: 4 })
  }
  useEffect(() => {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const Code = urlParams.get('code')
    const URL = `https://deepwaterhorizon.ru/api/v1/auth/github-auth`
    const githubAuth = async () => {
      let data = { code: Code }
      await fetch(URL, {
        method: 'POST',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error))
    }
    console.log(Code)
    if (Code) {
      githubAuth()
    }
    /* if (code && localStorage.getItem('accessToken') === null) {
      const getAccessToken = async () => {
        await fetch(`${api.serverURL}/getAccessToken?code=${code}`, { method: 'GET' })
          .then(response => {
            return response.json()
          })
          .then(data => {
            console.log(data)
            if (data.access_token) {
              localStorage.setItem('accessToken', data.access_token)
            }
          })
      }
      getAccessToken()
      getUserData()
    } else {
      getUserData()
    } */
  }, [])
  async function getUserData() {
    await fetch(`${api.serverURL}/getUserData`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
      },
    })
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log(data)
      })
  }
  return (
    <div onClick={LoginWithApi}>
      <Icon iconName={iconName} />
      <ul>
        {/* {data?.map((e: any) => (
          <li> {e?.name}</li>
        ))} */}
      </ul>
      {/* <button onClick={handleAddUser}>add user</button> */}
    </div>
  )
}

export default SignInWithSocialMedia
