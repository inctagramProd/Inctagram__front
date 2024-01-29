import { useTranslate } from '@/src/app/hooks/useTranslate'
import TimeIsOverIcon from '@/src/shared/assets/icons/TimeIsOverIcon'
import { Typography, Button } from '@/src/shared/ui'

export const InvalidLinkVerification = () => {
  const { locale } = useTranslate()
  const onClickHandler = () => {}

  return (
    <div className="flex flex-col items-center mt-[35px]">
      <div className="mb-[31px] text-center max-w-[300px]">
        <Typography variant="h1" className="mb-[19px]">
          {locale.auth.emailVerificationTitle}
        </Typography>
        <Typography variant="regular_16">{locale.auth.emailVerificationText}</Typography>
      </div>
      <div className="mb-[30px]">
        <Button style="primary" label={locale.auth.resendLink} onClick={onClickHandler} />
      </div>
      <div>
        <TimeIsOverIcon />
      </div>
    </div>
  )
}
