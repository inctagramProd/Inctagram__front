import type { Meta, StoryObj } from '@storybook/react'

import {UIDatePicker} from './DatePicker'

const meta = {
    title: 'Components/DatePicker',
    component: UIDatePicker,
    tags: ['autodocs'],
    parameters: {
        onChange: () => console.log('done')
    }
} satisfies Meta<typeof UIDatePicker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
    }
}
export const Range: Story = {
    args: {
        isRange: true
    }
}

