import type { Meta, StoryObj } from '@storybook/react'
import { SignUp } from './SignUp'

const meta: Meta<typeof SignUp> = {
  title: 'Auth/SignUpForm',
  component: SignUp,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof SignUp>

export const Default: Story = {
  args: {},
}
