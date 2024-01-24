import { useTranslate } from '@/src/app/hooks/useTranslate'
import { useRouter } from 'next/navigation'
import { Typography, Button } from '@/src/shared/ui'
import EmailConfirmedIcon from '@/src/shared/assets/icons/EmailConfirmedIcon'

export const EmailVerification = () => {
  const { locale } = useTranslate()
  const route = useRouter()
  const onClickHandler = () => {
    route.push('auth/sign-in')
  }

  return (
    <div className="flex flex-col items-center ">
      <div className="mt-[35px] mb-[72px]  text-center">
        <Typography variant="h1" className="mb-[19px]">
          {locale.auth.emailConfirmTitle}
        </Typography>
        <Typography variant="regular_16" className="mb-[54px]">
          {locale.auth.emailConfirmText}
        </Typography>
        <Button style="primary" label={locale.auth.signIn} className="" onClick={onClickHandler} />
      </div>
      <div>
        <EmailConfirmedIcon />
      </div>
    </div>
  )
}
