import type { Meta, StoryObj } from '@storybook/react'
import { SignIn } from './SignIn'

const meta: Meta<typeof SignIn> = {
    title: 'Components/Card',
    component: SignIn,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    args: {
    },
}

export default meta

type Story = StoryObj<typeof SignIn>

export const Default: Story = {

}
