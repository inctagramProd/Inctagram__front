import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';

const meta = {
  title: 'Example/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LogIn: Story = {
  args: {
    user: false,
    theme:'dark'
  },
};
export const LogOut: Story = {
  args: {
    user: true,
    fillType:'outline',
    theme:'dark'
  },

};
