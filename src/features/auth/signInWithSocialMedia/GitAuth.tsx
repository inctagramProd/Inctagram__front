import { useEffect, useState } from 'react'
import { Icon } from '@/src/shared/ui'
import { useGitAuthMutation } from '@/src/shared/api/AuthApi'
import { api } from '@/src/shared/api/ThirdPartyApi'
import { LoaderSpin } from '@/src/shared/ui/Loader/Loader'

type Props = {
  iconName: 'GoogleLogo' | 'GithubLogo'
}

const GitAuth = ({ iconName }: Props) => {
  const [Auth, { data, isLoading, isError }] = useGitAuthMutation()
  const [statusGit, setStatusGit] = useState<boolean>(false)
  function LoginWithApi() {
    setStatusGit(true)
    const gitPath = api.gitAuth + api.clientGitId + api.gitHubScope
    window.location.assign(gitPath)
  }

  useEffect(() => {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const Code = urlParams.get('code')

    if (Code) {
      if (statusGit) {
        Auth({ code: Code }).unwrap()
        console.log(statusGit)
      }
    }
  }, [])
  console.log(statusGit)
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

export default GitAuth
