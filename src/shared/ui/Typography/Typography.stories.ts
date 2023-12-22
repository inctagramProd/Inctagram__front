import { Typography } from './Typography'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
    title: 'Components/Typography',
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    args: {
        placeholder: 'Text-area'
    },
    component: Typography,
} satisfies Meta<typeof Typography>

export default meta

type Story = StoryObj<typeof meta>

export const Large: Story = {
  args: {
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    variant: 'large',
    as: 'span',
  },
}

