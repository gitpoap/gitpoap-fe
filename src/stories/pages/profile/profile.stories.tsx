import Profile from '../../../pages/p/[id]';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Layout } from '../../../components/Layout';

export default {
  title: 'Pages/Profile',
  component: Profile,
} as ComponentMeta<typeof Profile>;

const Template: ComponentStory<typeof Profile> = () => {
  return (
    <Layout>
      <Profile addressOrEns="peebeejay.eth" />
    </Layout>
  );
};

export const Default = Template.bind({});
Default.args = {};
