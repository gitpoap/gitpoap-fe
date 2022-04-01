import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Select } from '../../components/shared/elements/Select';

export default {
  title: 'Elements/Select',
  component: Select,
  argTypes: {},
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => {
  const [value, setValue] = useState('total');
  return <Select {...args} value={value} onChange={(value: string) => setValue(value)} />;
};

export const Default = Template.bind({});
Default.args = {
  data: [
    { value: 'total', label: 'Total Poaps' },
    { value: 'claim', label: 'Mint Date' },
    { value: 'name', label: 'Name' },
  ],
  value: 'total',
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  data: [
    { value: 'total', label: 'Total Poaps' },
    { value: 'claim', label: 'Mint Date' },
    { value: 'name', label: 'Name' },
  ],
  value: 'total',
};
