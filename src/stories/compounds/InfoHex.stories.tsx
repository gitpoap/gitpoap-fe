import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { InfoHexBase } from '../../components/shared/elements/InfoHexBase';
import { InfoHexMetric } from '../../components/home/InfoHexMetric';
import { InfoHexSummary } from '../../components/gitpoap/InfoHexSummary';
import { People } from '../../components/shared/elements/icons/People';

export default {
  title: 'Compounds/InfoHex',
  component: InfoHexBase,
  argTypes: {},
} as ComponentMeta<typeof InfoHexBase>;

const Template: ComponentStory<typeof InfoHexBase> = (args) => {
  return <InfoHexBase {...args}></InfoHexBase>;
};

export const Base = Template.bind({});
Base.args = {};

export const Metrics: ComponentStory<typeof InfoHexMetric> = (args) => {
  return (
    <InfoHexMetric
      {...args}
      value={Number('17545').toLocaleString()}
      unit={'contributors'}
      rate={'+345 / past week '}
      icon={<People />}
    />
  );
};

export const Profile: ComponentStory<typeof InfoHexBase> = (args) => {
  return (
    <InfoHexSummary
      {...args}
      bio="Recovering physicist turned programmer. Soccer aficionado."
      twitterHandle="nd_certora"
      githubHandle="nd_certora"
      gitpoapId={10}
      numGitPOAPs={12}
      address="0x0"
      ensAvatarUrl={null}
      ensName="nd_certora.eth"
    />
  );
};
