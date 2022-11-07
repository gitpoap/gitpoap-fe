import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SearchBox } from '../../components/search/box/SearchBox';

export default {
  title: 'Compounds/SearchBox',
  component: SearchBox,
} as ComponentMeta<typeof SearchBox>;

const Template: ComponentStory<typeof SearchBox> = () => {
  return <SearchBox />;
};

export const Default = Template.bind({});
Default.args = {};
