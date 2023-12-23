import type { Meta, StoryObj } from '@storybook/react'

import {UIDatePicker} from './DatePicker'

const meta = {
    title: 'Components/DatePicker',
    component: UIDatePicker,
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

