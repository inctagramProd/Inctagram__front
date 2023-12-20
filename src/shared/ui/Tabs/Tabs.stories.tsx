import type { Meta, StoryObj } from '@storybook/react'

import { Tabs } from './Tabs'

const meta = {
    title: 'Tabs',
    component: Tabs,
    parameters: {
        options: [
            { key: 'Option_1', label: 'Week' },
            { key: 'Option_2', label: 'Month', disabled: true }
        ],
        defaultValue: ''
    }
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        options: [
            { key: 'week', label: 'Week' },
            { key: 'month', label: 'Month', disabled: true },
            { key: 'year', label: 'Year' }
        ]
    }
}

// export const Disabled: Story = {
//     args: {
//         ...Default.args,
//         defaultValue: 'option1',
//         disabled: true
//     }
// }