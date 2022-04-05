import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { RoundedGitPOAPBadge } from '../../components/shared/elements/RoundedGitPOAPBadge';
import badgeImg1 from '../assets/gitPOAPs/badge1.png';
import realBadge1 from '../assets/gitPOAPs/real_badge1.png';
import realBadge2 from '../assets/gitPOAPs/real_badge2.png';
import realBadge3 from '../assets/gitPOAPs/real_badge3.png';
import realBadge4 from '../assets/gitPOAPs/real_badge4.png';
import realBadge5 from '../assets/gitPOAPs/real_badge5.png';
import realBadge6 from '../assets/gitPOAPs/real_badge6.png';
import realBadge7 from '../assets/gitPOAPs/real_badge7.png';
import realBadge8 from '../assets/gitPOAPs/real_badge8.png';
import realBadge9 from '../assets/gitPOAPs/real_badge9.png';
import realBadge10 from '../assets/gitPOAPs/real_badge10.png';
import realBadge11 from '../assets/gitPOAPs/real_badge11.png';
import realBadge12 from '../assets/gitPOAPs/real_badge12.png';
import { Group } from '@mantine/core';

const badges = [
  realBadge1,
  realBadge2,
  realBadge3,
  realBadge4,
  realBadge5,
  realBadge6,
  realBadge7,
  realBadge8,
  realBadge9,
  realBadge10,
  realBadge11,
  realBadge12,
];

const url = badgeImg1 as unknown as string;

export default {
  title: 'Elements/RoundedGitPOAPBadge',
  component: RoundedGitPOAPBadge,
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
} as ComponentMeta<typeof RoundedGitPOAPBadge>;

const Template: ComponentStory<typeof RoundedGitPOAPBadge> = (args) => {
  return <RoundedGitPOAPBadge {...args} />;
};

export const Default = Template.bind({});
Default.args = { imgUrl: url, size: 'md' };

export const DefaultSmall = Template.bind({});
DefaultSmall.args = { imgUrl: url, size: 'sm' };

export const DefaultLarge = Template.bind({});
DefaultLarge.args = { imgUrl: url, size: 'lg' };

export const Disabled = Template.bind({});
Disabled.args = { imgUrl: url, size: 'md', disabled: true };

const GalleryTemplate: ComponentStory<typeof RoundedGitPOAPBadge> = (args) => {
  return (
    <Group>
      {badges.map((badge, i) => (
        <RoundedGitPOAPBadge key={i} {...args} imgUrl={badge as unknown as string} />
      ))}
    </Group>
  );
};

export const Gallery = GalleryTemplate.bind({});
Gallery.args = { size: 'md' };
