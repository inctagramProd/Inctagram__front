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
    <div className="flex flex-col items-center">
      <div className="mt-[35px] mb-[54px] text-center">
        <Typography variant="h1" className="mb-[19px]">
          {locale.auth.emailConfirmTitle}
        </Typography>
        <Typography variant="regular_16">{locale.auth.emailConfirmText}</Typography>
      </div>
      <div className="mb-[72px]">
        <Button style="primary" label={locale.auth.signIn} onClick={onClickHandler} />
      </div>
      <div>
        <EmailConfirmedIcon />
      </div>
    </div>
  )
}
