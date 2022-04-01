import React from 'react';
import styled from 'styled-components';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Title } from '../../components/shared/elements/Title';

export default {
  title: 'Elements/Title',
  component: Title,
} as ComponentMeta<typeof Title>;

const StyledTitle = styled(Title)`
  width: 170px;
`;

const Template: ComponentStory<typeof Title> = (args) => {
  return <StyledTitle {...args}>{'AAVE Core Contributor'}</StyledTitle>;
};

export const Default = Template.bind({});
Default.args = {};

export const Disabled = Template.bind({});
Disabled.args = { disabled: true };
