import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { POAPBadge } from '../../components/shared/elements/POAPBadge';
import poap4 from '../assets/poaps/poap4.png';

export default {
  title: 'Elements/POAPBadge',
  component: POAPBadge,
} as ComponentMeta<typeof POAPBadge>;

const Template: ComponentStory<typeof POAPBadge> = (args) => {
  return <POAPBadge {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  imgSrc: poap4 as unknown as string,
  name: 'Float Capital AMA',
  poapTokenId: '1234',
  isFeatured: false,
  isFeaturedLoading: false,
  showHeart: false,
};
