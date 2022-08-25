import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Group, Stack } from '@mantine/core';
import { GitPOAPBadge } from '../../components/shared/elements/GitPOAPBadge';
import ethBadge from '../assets/gitPOAPs/newDefaultImage.png';
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

const url = ethBadge as unknown as string;

export default {
  title: 'Elements/GitPOAPBadge',
  component: GitPOAPBadge,
  args: {
    altText: 'GitPOAP Badge',
  },
  argTypes: {
    level: { control: 'select', options: [null, 'bronze', 'silver', 'gold', 'platinum'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
} as ComponentMeta<typeof GitPOAPBadge>;

const Template: ComponentStory<typeof GitPOAPBadge> = (args) => {
  return <GitPOAPBadge {...args} />;
};

export const Default = Template.bind({});
Default.args = { imgUrl: url, size: 'md' };

export const DefaultSmall = Template.bind({});
DefaultSmall.args = { imgUrl: url, size: 'sm' };

export const Disabled = Template.bind({});
Disabled.args = { imgUrl: url, size: 'md', disabled: true };

const GalleryTemplate: ComponentStory<typeof GitPOAPBadge> = (args) => {
  return (
    <Group>
      {badges.map((badge, i) => (
        <GitPOAPBadge key={i} {...args} imgUrl={badge as unknown as string} />
      ))}
    </Group>
  );
};

export const Gallery = GalleryTemplate.bind({});
Gallery.args = { size: 'md' };

const GallerySizesTemplate: ComponentStory<typeof GitPOAPBadge> = (args) => {
  return (
    <Stack>
      {['bronze', 'silver', 'gold', 'platinum'].map((level: any, i: number) => (
        <Group noWrap style={{ width: 'fit-content' }} key={`group-${i}`}>
          {['xxxs', 'xxs', 'xs', 'sm', 'md', 'lg'].map((size: any, j: number) => (
            <GitPOAPBadge key={`badge-${i}-${j}`} size={size} imgUrl={url} level={level} />
          ))}
        </Group>
      ))}
    </Stack>
  );
};

export const GallerySizes = GallerySizesTemplate.bind({});
GallerySizes.args = {};

const GallerLevelsTemplate: ComponentStory<typeof GitPOAPBadge> = (args) => {
  return (
    <Group>
      {['bronze', 'silver', 'gold', 'platinum'].map((level: any, i: number) => (
        <GitPOAPBadge key={i} size="md" imgUrl={url} level={level} />
      ))}
    </Group>
  );
};

export const GalleryLevels = GallerLevelsTemplate.bind({});
GalleryLevels.args = {};
