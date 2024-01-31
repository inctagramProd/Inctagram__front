import { PolicySwitcher } from '@/src/shared/components/PolicySwitcher/PolicySwitcher'
import { getLayout } from '@/src/widgets/Layout/Layout'

const TermsOfService = () => {
  return <PolicySwitcher privacyPolicy={false} />
}

TermsOfService.getLayout = getLayout

export default TermsOfService
