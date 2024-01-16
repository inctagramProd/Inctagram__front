import { api } from '@/src/shared/api/api'
import Icon from '@/src/shared/ui/Icon/Icon'
import { useEffect } from 'react'

type Props = {
  iconName: 'GoogleLogo' | 'GitHubLogo'
}

const SignInWithSocialMedia = ({ iconName }: Props) => {
  function LoginWithApi() {
    window.location.assign(api.gitAuth + api.clientGitId)
  }

  useEffect(() => {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const code = urlParams.get('code')
    if (code && localStorage.getItem('accessToken') === null) {
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
    } else {
      getUserData()
    }
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
    </div>
  )
}

export default SignInWithSocialMedia
