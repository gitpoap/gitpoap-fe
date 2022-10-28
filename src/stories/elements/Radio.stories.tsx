import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { RadioGroup } from '../../components/shared/elements/Radio';
import { Radio } from '@mantine/core';

export default {
  title: 'Elements/Radio',
  component: Radio,
  argTypes: {},
} as ComponentMeta<typeof Radio>;

const Template: ComponentStory<typeof Radio> = (args) => {
  const [value, setValue] = React.useState('react');

  return (
    <RadioGroup defaultValue="react" value={value} onChange={setValue}>
      <Radio {...args} value="contributor" label={'Contributor'} />
    </RadioGroup>
  );
};

export const Default = Template.bind({});
Default.args = {};

export const Disabled = Template.bind({});
Disabled.args = { disabled: true };
