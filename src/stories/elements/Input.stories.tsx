import React, { useState } from 'react';
import { rem } from 'polished';
import styled from 'styled-components';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Input } from '../../components/shared/elements/Input';

export default {
  title: 'Elements/Input',
  component: Input,
  argTypes: {},
} as ComponentMeta<typeof Input>;

const StyledInput = styled(Input)`
  min-width: ${rem(300)};
`;

const Template: ComponentStory<typeof Input> = (args) => {
  const [value, setValue] = useState('');
  return (
    <StyledInput
      {...args}
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
    />
  );
};

export const Default = Template.bind({});
Default.args = { label: 'GitHub Repo Url', placeholder: 'github.com/stake-house/wagyu' };

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'GitHub Repo Url',
  placeholder: 'github.com/stake-house/wagyu',
  disabled: true,
};

export const Error: ComponentStory<typeof Input> = () => {
  const [value, setValue] = useState('123456');
  return (
    <StyledInput
      placeholder={'github.com/stake-house/wagyu'}
      label={'GitHub Repo Url'}
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
      error={'Incorrect URL'}
    />
  );
};
