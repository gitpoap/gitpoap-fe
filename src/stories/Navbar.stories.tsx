import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Navbar as NavbarComponent } from '../components/Navbar';

export default {
  title: 'Layout/Navbar',
  component: NavbarComponent,
  argTypes: {},
} as ComponentMeta<typeof NavbarComponent>;

export const Navbar: ComponentStory<typeof NavbarComponent> = () => {
  return <NavbarComponent />;
};
