import type { Meta, StoryObj } from '@storybook/react'
import { SignUpForm } from '@/src/features/auth/signUp/ui/SignUpForm/SignUpForm'

const meta: Meta<typeof SignUpForm> = {
  title: 'Forms/SignUpForm',
  component: SignUpForm,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof SignUpForm>

export const Default: Story = {
  args: {},
}
