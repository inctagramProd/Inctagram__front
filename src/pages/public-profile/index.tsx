import { HeadMeta } from '@/src/widgets/HeadMeta/HeadMeta'
import { PublicProfileModule } from '@/src/features/publicProfile'
import {getLayout} from "@/src/widgets/Layout/Layout";

const PublicProfilePage = () => {
  return (
    <>
      <HeadMeta title="Public Profile" />
      <PublicProfileModule />
    </>
  )
}

PublicProfilePage.getLayout = getLayout

export default PublicProfilePage