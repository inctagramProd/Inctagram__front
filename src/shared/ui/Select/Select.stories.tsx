import type { Meta, StoryObj } from '@storybook/react'

import { Select } from './Select'

const meta = {
    title: 'Select',
    component: Select,
    parameters: {
        title: 'Hello world',
        options: [
            { title: 'Option 1', value: '1' }
        ]
    }
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        title: 'Select title',
        options: [
            { title: 'Option 1', value: 'option1' },
            { title: 'Option 2', value: 'option2' },
            { title: 'Option 3', value: 'option3' },
        ],
        defaultValue: 'option3',
        onChange: (selectedObject: object) => console.log(selectedObject)
    }
}

export const Disabled: Story = {
    args: {
        ...Default.args,
        defaultValue: 'option1',
        disabled: true
    }
}