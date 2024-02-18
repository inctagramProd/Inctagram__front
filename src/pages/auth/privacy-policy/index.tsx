import { PolicySwitcher } from '@/src/shared/components/PolicySwitcher/PolicySwitcher'
import { getLayout } from '@/src/widgets/Layout/Layout'
import { HeadMeta } from '@/src/widgets/HeadMeta/HeadMeta'

const PrivacyPolicy = () => {
  return (
    <>
      <HeadMeta title="Privacy Policy" />
      <PolicySwitcher variant="policy" />
    </>
  )
}

PrivacyPolicy.getLayout = getLayout

export default PrivacyPolicy
