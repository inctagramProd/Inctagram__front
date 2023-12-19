import type { Meta, StoryObj } from '@storybook/react'
import { Icon } from './Icon'

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
    value:0,
    width: 24,
    height:24,
    fillType: 'outline',
    theme: 'dark',
  },
}
export const Light: Story = {
  args: {
    value:0,
    width: 24,
    height:24,
    fillType: 'outline',
    theme: 'light',
  },
}
export const Dark: Story = {
  args: {
    value:0,
    width: 24,
    height:24,
    fillType: 'outline',
    theme: 'dark',
  },
}
export const Outline: Story = {
  args: {
    value:0,
    width: 24,
    height:24,
    fillType: 'outline',
    theme: 'dark',
  },
}
export const Fill: Story = {
  args: {
    value:0,
    width: 24,
    height:24,
    fillType: 'fill',
    theme: 'dark',
  },
}



