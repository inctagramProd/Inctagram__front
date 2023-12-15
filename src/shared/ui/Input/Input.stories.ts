import { Input } from './Input'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Components/Input',
  parameters: {
    layout: 'centered',
  },
  component: Input,
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Email',
    disabled: false,
    state: 'default',
    placeholder: 'Epam@epam.com',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Email',
    state: 'default',
    placeholder: 'Epam@epam.com',
    disabled: true,
  },
}
