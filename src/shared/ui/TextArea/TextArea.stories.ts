import type { Meta, StoryObj } from '@storybook/react'
import { TextArea } from './TextArea'

const meta: Meta<typeof TextArea> = {
    title: 'Components/TextArea',
    component: TextArea,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    args: {
        placeholder: 'Text-area'
    },
}

export default meta

type Story = StoryObj<typeof TextArea>

export const Default: Story = {
    args: {

    }
}

export const Error: Story = {
    args: {
        error: 'error text'
    }
}

export const Focus: Story = {
    args: {
        onFocus: event => event
    }
}

export const Disabled: Story = {
    args: {
        disabled: true
    }
}

