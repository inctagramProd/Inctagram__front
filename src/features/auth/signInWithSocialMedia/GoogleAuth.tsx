import { Icon } from '@/src/shared/ui'
import { api } from '@/src/shared/api/ThirdPartyApi'

type Props = {
  name: 'Google' | 'Git'
}

const GoogleAuth = ({ name }: Props) => {
  function LoginWithApi() {
    localStorage.setItem('Google', 'true')
    localStorage.removeItem('Git')
    window.location.assign(api.googlePath)
  }

  return (
    <div className={`cursor-pointer`} onClick={LoginWithApi}>
      <Icon iconName={`${name}Logo`} />
    </div>
  )
}

export default GoogleAuth
