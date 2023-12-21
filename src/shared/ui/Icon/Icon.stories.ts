import type { Meta, StoryObj } from '@storybook/react'
import Icon from './Icon'

const meta = {
  title: 'Components/Icons',
  parameters: {
    layout: 'centered',
  },
  component: Icon,
} satisfies Meta<typeof Icon>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    iconName: 'Bell',
    width: 24,
    height: 24,
  },
}
