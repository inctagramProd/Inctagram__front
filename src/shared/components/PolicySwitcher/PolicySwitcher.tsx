import { Icon, Typography } from '@/src/shared/ui'
import { useTranslate } from '@/src/app/hooks/useTranslate'
import { useRouter } from 'next/router'

type Props = {
  variant: 'policy' | 'terms'
}

export const PolicySwitcher = ({ variant }: Props) => {
  const { locale } = useTranslate()
  const router = useRouter()

  const showBtnNavigateToPrev = router.query.sender !== 'profile'
  const navigateToPrevPageHandler = () => router.back()

  const isPrivacyPolicy = variant === 'policy'

  return (
    <div className="py-6">
      {showBtnNavigateToPrev && (
        <div
          className="inline-flex gap-x-3 mb-6 cursor-pointer"
          onClick={navigateToPrevPageHandler}
        >
          <Icon iconName="ArrowBack" />
          <Typography variant="regular_14">{locale.auth.backToSignUp}</Typography>
        </div>
      )}
      <div className="flex flex-col gap-5 items-center">
        <Typography variant="h1">
          {isPrivacyPolicy
            ? locale.auth.privacyAndTermsPages.titleOfPrivacyPolicy
            : locale.auth.privacyAndTermsPages.titleOfTermsOfService}
        </Typography>
        <div className="text-justify px-9">
          <Typography variant="regular_14" className="whitespace-break-spaces">
            {isPrivacyPolicy
              ? locale.auth.privacyAndTermsPages.textOfPrivacy
              : locale.auth.privacyAndTermsPages.textOfTerms}
          </Typography>
        </div>
      </div>
    </div>
  )
}
