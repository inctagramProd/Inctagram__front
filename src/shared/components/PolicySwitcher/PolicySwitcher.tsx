import { Typography } from '../../ui/Typography/Typography'
import Icon from '../../ui/Icon/Icon'
import Link from 'next/link'
import { useTranslate } from '@/src/app/hooks/useTranslate'

type Props = {
  privacyPolicy: boolean
}

export const PolicySwitcher = ({ privacyPolicy }: Props) => {
  const { locale } = useTranslate()

  return (
    <div className="py-6">
      <Link href={'./signup'}>
        <div className="inline-flex gap-3 pb-6">
          <Icon iconName="ArrowBack" />
          <Typography variant="regular_14">{locale.auth.backToSignUp}</Typography>
        </div>
      </Link>
      <div className="flex flex-col gap-5 items-center">
        <Typography variant="h1">
          {privacyPolicy
            ? locale.auth.privacyAndTermsPages.titleOfPrivacyPolicy
            : locale.auth.privacyAndTermsPages.titleOfTermsOfService}
        </Typography>
        <div className="text-justify px-8">
          <Typography variant="regular_14">
            {privacyPolicy
              ? locale.auth.privacyAndTermsPages.textOfPrivacy
              : locale.auth.privacyAndTermsPages.textOfTerms}
          </Typography>
        </div>
      </div>
    </div>
  )
}
