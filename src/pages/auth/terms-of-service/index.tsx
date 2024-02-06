import { PolicySwitcher } from '@/src/shared/components/PolicySwitcher/PolicySwitcher'
import { getLayout } from '@/src/widgets/Layout/Layout'
import { HeadMeta } from '@/src/widgets/HeadMeta/HeadMeta'

const TermsOfService = () => {
  return (
    <>
      <HeadMeta title="Terms of Service" />
      <PolicySwitcher variant="terms" />
    </>
  )
}

TermsOfService.getLayout = getLayout

export default TermsOfService
