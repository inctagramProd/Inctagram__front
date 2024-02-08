import { useEffect } from 'react'
import { Icon } from '@/src/shared/ui'
import { api } from '@/src/shared/api/ThirdPartyApi'
import { LoaderSpin } from '@/src/shared/ui/Loader/Loader'
import { useGitAuthMutation } from '../signIn/service/signInApi'
import { useRouter } from 'next/router'

type Props = {
  name: 'Google' | 'Git'
}
const GitAuth = ({ name }: Props) => {
  function LoginWithApi() {
    localStorage.setItem('Git', 'true')
    localStorage.removeItem('Google')
    localStorage.setItem('api', 'true')
    const gitPath = api.gitAuth + api.clientGitId + api.gitHubScope
    window.location.assign(gitPath)
  }

  return (
    <div onClick={LoginWithApi}>
      <Icon iconName={`${name}Logo`} />
    </div>
  )
}

export default GitAuth
