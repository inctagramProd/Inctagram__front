import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from './Checkbox'

const meta: Meta<typeof Checkbox> = {
    title: 'Components/Checkbox',
    component: Checkbox,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    args: {
        children: 'Check-box'
    },
}

export default meta

type Story = StoryObj<typeof Checkbox>

export const Default: Story = {

}

export const Checked: Story = {
    args: {
        checked: true
    }
}

export const Unchecked: Story = {
    args: {
        checked: false
    }
}

export const DisabledUnchecked: Story = {
    args: {
        checked: false,
        disabled: true
    }
}

export const DisabledChecked: Story = {
    args: {
        checked: true,
        disabled: true
    }
}

