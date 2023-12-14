import { Input, InputProps } from './Input'
import type { Meta, StoryObj } from '@storybook/react'

export default {
  title: 'Components/Input',
  parameters: {
    layout: 'centered',
  },
  component: Input,
} as Meta

type Story = StoryObj<InputProps>

export const Default: Story = {
  args: {
    label: 'Email',
    state: 'default',
    placeholder: 'example@epam.com',
  },
}
