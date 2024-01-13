import { api } from '@/src/features/api'
import Icon from '@/src/shared/ui/Icon/Icon'
import jwt from 'jsonwebtoken'
import { useEffect } from 'react'

type Props = {
  iconName: 'GoogleLogo' | 'GitHubLogo'
}
const SignInWithSocialMedia = ({ iconName }: Props) => {
  /* useEffect(() => {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const code = urlParams.get('code')

    if (code && localStorage.getItem('accessToken') === null) {
      const getAccessToken = async () => {
        console.log('Code is start')
        console.log(localStorage.getItem('accessToken'))
        //await fetch('')
      }
    }
  }) */
  function ApiAuth() {
    /*  window.location.assign(
      'https://github.com/login/oauth/authorize?client_id=ffe4468450558d55d4e0'
    ) */
    let url = iconName === 'GitHubLogo' ? api.gitLoginURL : api.googleLoginURL
    window.location.assign(url)
  }
  return (
    <div onClick={ApiAuth}>
      <Icon iconName={iconName} />
    </div>
  )
}

export default SignInWithSocialMedia
