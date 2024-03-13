import { Icon } from '@/src/shared/ui'
import { api } from '@/src/shared/api/ThirdPartyApi'

type Props = {
  name: 'Google' | 'Git'
}
const GitAuth = ({ name }: Props) => {
  function LoginWithApi() {
    localStorage.setItem('Git', 'true')
    localStorage.removeItem('Google')
    window.location.assign(api.gitPath)
  }

  return (
    <div className={`cursor-pointer`} onClick={LoginWithApi}>
      <Icon iconName={`${name}Logo`} />
    </div>
  )
}

export default GitAuth
