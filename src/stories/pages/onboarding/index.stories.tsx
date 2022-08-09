import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Container } from '@mantine/core';
import { Layout } from '../../../components/Layout';
import { IntakeForm } from '../../../components/IntakeForm';

export default {
  title: 'Pages/Onboarding',
  component: IntakeForm,
} as ComponentMeta<typeof IntakeForm>;

const Template: ComponentStory<typeof IntakeForm> = () => {
  return (
    <Layout>
      <Container size={800} mt="xl" style={{ width: '100%' }}>
        <IntakeForm />
      </Container>
    </Layout>
  );
};

export const Default = Template.bind({});
Default.args = {};
