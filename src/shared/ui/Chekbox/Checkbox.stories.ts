import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from './Checkbox'

const meta: Meta<typeof Checkbox> = {
    title: 'Example/Checkbox',
    component: Checkbox,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        backgrounds: {
            values: [
                { name: 'background', value: '#0D0D0D' },
            ],
        },

    },
    args: {
        children: 'Check-box'
    },
}

export default meta

type Story = StoryObj<typeof Checkbox>

export const CheckboxDefault: Story = {
    args: {

    }
}

export const CheckboxChecked: Story = {
    args: {
        checked: true
    }
}

export const CheckboxUnchecked: Story = {
    args: {
        checked: false
    }
}

export const CheckboxDisabledUnchecked: Story = {
    args: {
        checked: false,
        disabled: true
    }
}

export const CheckboxDisabledChecked: Story = {
    args: {
        checked: true,
        disabled: true
    }
}

