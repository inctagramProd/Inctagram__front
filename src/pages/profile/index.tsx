import React from 'react'
import { getLayoutWithSidebar } from '@/src/widgets/Layout/LayoutWithSidebar'
import { Typography } from '@/src/shared/ui'

function Index() {
  return <Typography variant="h1">Profile Page</Typography>
}

Index.getLayout = getLayoutWithSidebar
export default Index
