import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { GitPOAP } from '../../components/shared/compounds/GitPOAP';
import { gitPOAPs } from '../data';

export default {
  title: 'Compounds/GitPOAP',
  component: GitPOAP,
} as ComponentMeta<typeof GitPOAP>;

const Template: ComponentStory<typeof GitPOAP> = (args) => {
  return <GitPOAP {...args} />;
};

export const Default = Template.bind({});
Default.args = gitPOAPs[0];

export const NoDescription = Template.bind({});
NoDescription.args = {
  id: gitPOAPs[0].id,
  imgSrc: gitPOAPs[0].imgSrc,
  name: gitPOAPs[0].name,
  orgName: gitPOAPs[0].orgName,
};
