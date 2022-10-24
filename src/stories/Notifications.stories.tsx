import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Notification } from '@mantine/core';
import { Button } from '../components/shared/elements/Button';
import styled from 'styled-components';
import { Notifications } from '../notifications';

export default {
  title: 'Compounds/Notification',
  component: Notification,
} as ComponentMeta<typeof Notification>;

const Container = styled.div`
  display: inline-flex;
`;

export const Error: ComponentStory<typeof Notification> = () => {
  return (
    <Container>
      <Button
        variant="outline"
        onClick={() => Notifications.error('Error - Request Failed', 'Oops, something went wrong!')}
      >
        Show customized notification
      </Button>
    </Container>
  );
};
