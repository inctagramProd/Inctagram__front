import type { Meta, StoryObj } from '@storybook/react'
import { TextArea } from './TextArea'

const meta: Meta<typeof TextArea> = {
  title: 'Components/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    placeholder: 'Text-area',
  },
}

export default meta

type Story = StoryObj<typeof TextArea>

export const Default: Story = {}

export const Error: Story = {
  args: {
    errorMessage: 'error text',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

