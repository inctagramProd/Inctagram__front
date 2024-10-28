import type { Meta, StoryObj } from '@storybook/react'

import { DatePickerInput } from '@/src/shared/ui'

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
  args: {
    name: 'date',
    label: 'Date',
  },
}