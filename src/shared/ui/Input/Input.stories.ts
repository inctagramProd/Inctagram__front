import { Input } from './Input'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Components/Input',
  tags: ['autodocs'],
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
    placeholder: 'Epam@epam.com',
    type: 'text',
  },
}

export const Password: Story = {
  args: {
    label: 'Пароль',
    disabled: false,
    type: 'password',
  },
}

export const Search: Story = {
  args: {
    disabled: false,
    type: 'search',
    placeholder: 'Input search',
  },
}

export const Error: Story = {
  args: {
    label: 'Email',
    disabled: false,
    error: 'Error text',
    type: 'text',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Email',
    placeholder: 'Epam@epam.com',
    disabled: true,
    type: 'text',
  },
}
