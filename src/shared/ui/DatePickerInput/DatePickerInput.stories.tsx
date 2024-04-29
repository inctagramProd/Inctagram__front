import type { Meta, StoryObj } from '@storybook/react'

import { DatePickerInput } from './DatePickerInput'

const meta = {
  component: DatePickerInput,
  parameters: {
    onChange: () => console.log('done'),
  },
  tags: ['autodocs'],
  title: 'Components/DatePickerInput',
} satisfies Meta<typeof DatePickerInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
export const Range: Story = {
  args: {
    isRange: true,
  },
}
export const DefaultError: Story = {
  args: {
    errorMsg: 'wrong date',
    hasError: true,
  },
}
export const RangeError: Story = {
  args: {
    errorMsg: 'User shoul bee at least 13 y.o.',
    hasError: true,
    isRange: true,
  },
}
