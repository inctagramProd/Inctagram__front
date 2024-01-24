import { useTranslate } from '@/src/app/hooks/useTranslate'
import TimeIsOverIcon from '@/src/shared/assets/icons/TimeIsOverIcon'
import { Typography, Button } from '@/src/shared/ui'

export const InvalidLinkVerification = () => {
  const { locale } = useTranslate()
  const onClickHandler = () => {}

  return (
    <div className="flex flex-col items-center ">
      <div className="mt-[35px] mb-[31px] text-center">
        <Typography variant="h1" className="mb-[19px]">
          {locale.auth.emailVerificationTitle}
        </Typography>
        <Typography variant="regular_16" className="mb-[30px]">
          {locale.auth.emailVerificationText}
        </Typography>
        <Button
          style="primary"
          label={locale.auth.resendLink}
          className=""
          onClick={onClickHandler}
        />
      </div>
      <div>
        <TimeIsOverIcon width={480} height={320} />
      </div>
    </div>
  )
}
