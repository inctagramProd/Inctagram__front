import { Alerts } from './Alerts'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Components/Alerts',
  parameters: {
    layout: 'centered',
  },
  component: Alerts,
} satisfies Meta<typeof Alerts>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    error: false,
    text: 'Your settings are saved',
  },
}

export const Error: Story = {
  args: {
    error: true,
    text: 'Server is not available',
  },
}
