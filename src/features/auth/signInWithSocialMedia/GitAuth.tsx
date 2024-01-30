import { useEffect } from 'react'
import { Icon } from '@/src/shared/ui'
import { useGitAuthMutation } from '@/src/shared/api/AuthApi'
import { api } from '@/src/shared/api/ThirdPartyApi'
import { LoaderSpin } from '@/src/shared/ui/Loader/Loader'

type Props = {
  name: 'Google' | 'Git'
}

const GitAuth = ({ name }: Props) => {
  const [Auth, { data, isLoading, isError }] = useGitAuthMutation()

  useEffect(() => {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const Code = urlParams.get('code')
    if (Code) {
      if (localStorage.getItem('Git') === 'true') {
        Auth({ code: Code }).unwrap()
      }
    }
  }, [])
  function LoginWithApi() {
    localStorage.setItem('Git', 'true')
    localStorage.removeItem('Google')
    const gitPath = api.gitAuth + api.clientGitId + api.gitHubScope
    window.location.assign(gitPath)
  }
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
      <Icon iconName={`${name}Logo`} />
    </div>
  )
}

export default GitAuth
