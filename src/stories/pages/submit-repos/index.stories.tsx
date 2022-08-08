import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Container } from '@mantine/core';
import { Layout } from '../../../components/Layout';
import { SubmitReposForm } from '../../../components/SubmitReposForm';

export default {
  title: 'Pages/SubmitRepos',
  component: SubmitReposForm,
} as ComponentMeta<typeof SubmitReposForm>;

const Template: ComponentStory<typeof SubmitReposForm> = () => {
  return (
    <Layout>
      <Container size={800} mt="xl" style={{ width: '100%' }}>
        <SubmitReposForm />
      </Container>
    </Layout>
  );
};

export const Default = Template.bind({});
Default.args = {};
