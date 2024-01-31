import type { Meta, StoryObj } from '@storybook/react'
import { SignInForm } from '@/src/features/auth/signIn/ui/signInForm/SignInForm'

const meta: Meta<typeof SignInForm> = {
  title: 'Forms/SignInForm',
  component: SignInForm,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof SignInForm>

export const Default: Story = {
  args: {},
}
