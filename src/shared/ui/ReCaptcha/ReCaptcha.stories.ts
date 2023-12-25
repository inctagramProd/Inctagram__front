import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { ReCaptcha } from './ReCaptcha'

const meta: Meta<typeof ReCaptcha> = {
    title: 'Components/ReCAPTCHA',
    component: ReCaptcha,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
}

export default meta

type Story = StoryObj<typeof ReCaptcha>

export const Default: Story = {
    args: {
        onChange: action('click event')
    },
    argTypes:{
      theme:{
          control: {type: 'inline-radio'},
          options: ['dark', 'light']
      }
    }
}

export const Error: Story = {
    args:{
      errorMessage: 'Please verify that you are not a robot'
    },
    argTypes: {
        errorMessage: {
            control: { type: 'inline-radio' },
            options: ['Error message', null],
        }
    }
}