import type { Meta, StoryObj } from '@storybook/react'
import { SignIn } from './SignIn'

const meta: Meta<typeof SignIn> = {
  title: 'Auth/SignInForm',
  component: SignIn,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof SignIn>

export const Default: Story = {
  args: {},
}
