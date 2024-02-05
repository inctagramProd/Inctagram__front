import { Typography, Icon } from '@/src/shared/ui'
import Link from 'next/link'
import { useTranslate } from '@/src/app/hooks/useTranslate'

type Props = {
  variant: 'policy' | 'terms'
}

export const PolicySwitcher = ({ variant }: Props) => {
  const { locale } = useTranslate()

  const isPrivacyPolicy = variant === 'policy'

  return (
    <div className="py-6">
      <Link href={'/signup'}>
        <div className="inline-flex gap-3 pb-6">
          <Icon iconName="ArrowBack" />
          <Typography variant="regular_14">{locale.auth.backToSignUp}</Typography>
        </div>
      </Link>
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
