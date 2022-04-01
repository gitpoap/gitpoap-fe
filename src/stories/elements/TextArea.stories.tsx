import React, { useState } from 'react';
import { rem } from 'polished';
import styled from 'styled-components';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TextArea } from '../../components/shared/elements/TextArea';

export default {
  title: 'Elements/TextArea',
  component: TextArea,
  argTypes: {},
} as ComponentMeta<typeof TextArea>;

const StyledTextArea = styled(TextArea)`
  min-width: ${rem(300)};
`;

const Template: ComponentStory<typeof TextArea> = (args) => {
  const [value, setValue] = useState('');
  return (
    <StyledTextArea
      {...args}
      value={value}
      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setValue(e.target.value)}
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

export const Error: ComponentStory<typeof TextArea> = () => {
  const [value, setValue] = useState('123456');
  return (
    <StyledTextArea
      placeholder={'github.com/stake-house/wagyu'}
      label={'GitHub Repo Url'}
      value={value}
      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setValue(e.target.value)}
      error={'Incorrect URL'}
    />
  );
};
