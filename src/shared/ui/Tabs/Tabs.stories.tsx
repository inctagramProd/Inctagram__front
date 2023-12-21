import type { Meta, StoryObj } from '@storybook/react'

import { Tabs } from './Tabs'

const meta = {
    title: 'Tabs',
    component: Tabs,
    parameters: {
        disabled: false,
        options: [
            { key: 'week', label: 'Week' },
            { key: 'month', label: 'Month', disabled: true },
            { key: 'year', label: 'Year' }
        ],
        defaultActiveKey: '',
        onChange: (selectedObject: object) => console.log(selectedObject)
    }
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        disabled: false,
        options: [
            { key: 'week', label: 'Week' },
            { key: 'month', label: 'Month', disabled: true },
            { key: 'year', label: 'Year' }
        ]
    }
}

export const Disabled: Story = {
    args: {
        ...Default.args,
        disabled: true
    }
}