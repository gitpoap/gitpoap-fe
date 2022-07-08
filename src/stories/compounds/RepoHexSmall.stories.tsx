import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { RepoHexSmall } from '../../components/shared/compounds/RepoHexSmall';

export default {
  title: 'Compounds/RepoHexSmall',
  component: RepoHexSmall,
} as ComponentMeta<typeof RepoHexSmall>;

const Template: ComponentStory<typeof RepoHexSmall> = (args) => {
  return <RepoHexSmall {...args} orgName={'Exchanges'} name={'SushiSwap'} />;
};

export const Default = Template.bind({});
Default.args = {
  orgName: 'SushiSwap',
  name: 'SushiSwap-web',
  memberCount: 48,
  gitPoapCount: 20,
  stars: 984,
};
