import { PolicySwitcher } from '@/src/shared/components/PolicySwitcher/PolicySwitcher'
import { getLayout } from '@/src/widgets/Layout/Layout'
import { HeadMeta } from '@/src/widgets/HeadMeta/HeadMeta'

const TermsOfService = () => {
  return (
    <>
      <PolicySwitcher variant="terms" />
      <HeadMeta title="Terms of Service" />
    </>
  )
}

TermsOfService.getLayout = getLayout

export default TermsOfService
