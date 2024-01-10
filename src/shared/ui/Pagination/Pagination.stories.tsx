import type { Meta, StoryObj } from '@storybook/react'

import { Pagination } from './Pagination'

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  argTypes: {
    // foo is the property we want to remove from the UI
    itemsPerPage: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    total: 100,
    defaultCurrent: 1,
  },
}
