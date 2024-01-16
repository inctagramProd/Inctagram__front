import { PolicySwitcher } from '@/src/shared/components/PolicySwitcher/PolicySwitcher'
import { getLayout } from '@/src/widgets/Layout/Layout'

const PrivacyPolicy = () => {
  return <PolicySwitcher privacyPolicy={true} />
}

PrivacyPolicy.getLayout = getLayout

export default PrivacyPolicy
