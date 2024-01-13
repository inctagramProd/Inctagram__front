import type { Meta, StoryObj } from '@storybook/react'

import { Button } from './Button'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    style: 'primary',
    label: 'Button',
    size: 'medium',
    disable: false,
  },
}

export const Secondary: Story = {
  args: {
    style: 'secondary',
    label: 'Button',
    size: 'medium',
    disable: false,
  },
}
export const Outline: Story = {
  args: {
    style: 'outline',
    label: 'Button',
    size: 'medium',
    disable: false,
  },
}
export const Text: Story = {
  args: {
    style: 'text',
    label: 'Button',
    size: 'medium',
  },
}
export const Default: Story = {
  args: {
    style: 'default',
    label: 'Button',
    size: 'medium',
  },
}
export const Small: Story = {
  args: {
    style: 'primary',
    label: 'Button',
    size: 'small',
  },
}
export const Medium: Story = {
  args: {
    style: 'primary',
    label: 'Button',
    size: 'medium',
  },
}
export const Large: Story = {
  args: {
    style: 'primary',
    label: 'Button',
    size: 'large',
  },
}
export const Able: Story = {
  args: {
    style: 'primary',
    label: 'Button',
    size: 'medium',
    disable: false,
  },
}
export const Disable: Story = {
  args: {
    style: 'primary',
    label: 'Button',
    size: 'medium',
    disable: true,
  },
}
