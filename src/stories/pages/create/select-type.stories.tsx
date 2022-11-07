import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import SelectType from '../../../pages/create/select-type';
import { Layout } from '../../../components/Layout';

export default {
  title: 'Create/select-type',
  component: SelectType,
} as ComponentMeta<typeof SelectType>;

const Template: ComponentStory<typeof SelectType> = () => {
  return (
    <Layout>
      <SelectType />
    </Layout>
  );
};

export const Default = Template.bind({});
