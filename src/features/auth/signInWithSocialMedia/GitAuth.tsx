import { Icon } from '@/src/shared/ui'
import { api } from '@/src/shared/api/ThirdPartyApi'

type Props = {
  name: 'Google' | 'Git'
}
const GitAuth = ({ name }: Props) => {
  function LoginWithApi() {
    localStorage.setItem('Git', 'true')
    localStorage.removeItem('Google')
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
