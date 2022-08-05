import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ProjectForm } from '../../components/ProjectForm';

export default {
  title: 'Compounds/ProjectForm',
  component: ProjectForm,
} as ComponentMeta<typeof ProjectForm>;

const Template: ComponentStory<typeof ProjectForm> = () => {
  return <ProjectForm />;
};

export const Default = Template.bind({});
Default.args = {};
