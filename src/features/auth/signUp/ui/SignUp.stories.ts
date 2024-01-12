import type { Meta, StoryObj } from '@storybook/react'
import { SignUp } from './SignUp'

const meta: Meta<typeof SignUp> = {
    title: 'Components/Card',
    component: SignUp,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    args: {
    },
}

export default meta

type Story = StoryObj<typeof SignUp>

export const Default: Story = {

}
