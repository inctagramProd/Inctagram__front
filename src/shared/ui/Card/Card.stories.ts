import type { Meta, StoryObj } from '@storybook/react'
import { Card } from './Card'

const meta: Meta<typeof Card> = {
    title: 'Components/Card',
    component: Card,
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
        children: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aut blanditiis, deleniti dolor eius eum molestias mollitia nesciunt officia pariatur quae repudiandae sed unde! Accusamus alias architecto doloremque dolores ducimus eaque eligendi eos fugit, id iste libero nam, nesciunt nostrum optio perspiciatis praesentium rem repellat, sint soluta ut vitae voluptatibus.'
    },
}

export default meta

type Story = StoryObj<typeof Card>

export const CardComponent: Story = {

}

