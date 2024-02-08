import { useEffect } from 'react'
import { Icon } from '@/src/shared/ui'
import { api } from '@/src/shared/api/ThirdPartyApi'
import { LoaderSpin } from '@/src/shared/ui/Loader/Loader'
import { useGitAuthMutation } from '../signIn/service/signInApi'

type Props = {
  name: 'Google' | 'Git'
  setApiStatus: (status: boolean) => void
}
const GitAuth = ({ name, setApiStatus }: Props) => {
  const [Auth, { data, isLoading, isError }] = useGitAuthMutation()
  useEffect(() => {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const Code = urlParams.get('code')
    if (Code) {
      if (localStorage.getItem('Git') === 'true') {
        Auth({ code: Code }).unwrap()
        setApiStatus(true)
      }
    }
  }, [])
  function LoginWithApi() {
    localStorage.setItem('Git', 'true')
    localStorage.removeItem('Google')
    localStorage.setItem('api', 'true')
    const gitPath = api.gitAuth + api.clientGitId + api.gitHubScope
    window.location.assign(gitPath)
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

export default GitAuth
