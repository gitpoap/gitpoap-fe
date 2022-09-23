import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { FeedbackButton } from '../../components/shared/compounds/FeedbackButton';
import styled from 'styled-components';
import { rem } from 'polished';

export default {
  title: 'Compounds/FeedbackButton',
  component: FeedbackButton,
} as ComponentMeta<typeof FeedbackButton>;

const Container = styled.div`
  margin: ${rem(100)};
  position: relative;
`;

const Template: ComponentStory<typeof FeedbackButton> = (args) => {
  return (
    <Container>
      <FeedbackButton href="https://google.com" />
    </Container>
  );
};

export const Default = Template.bind({});
Default.args = {};
