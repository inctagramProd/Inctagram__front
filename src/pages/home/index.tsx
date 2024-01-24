import { Typography } from '@/src/shared/ui'
import { getLayoutWithSidebar } from '@/src/widgets/Layout/LayoutWithSidebar'

const HomePage = () => {
  return <Typography variant="h1" className='text-center mt-12'>Hello!</Typography>
}

HomePage.getLayout = getLayoutWithSidebar
export default HomePage
