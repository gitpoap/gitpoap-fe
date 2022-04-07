import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ClaimBlock } from '../../components/shared/compounds/ClaimBlock';
import badgeImg1 from '../assets/gitPOAPs/badge1.png';

export default {
  title: 'Compounds/ClaimBlock',
  component: ClaimBlock,
} as ComponentMeta<typeof ClaimBlock>;

const Template: ComponentStory<typeof ClaimBlock> = (args) => {
  return <ClaimBlock {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  gitPOAPId: 1,
  imgSrc: badgeImg1 as unknown as string,
  name: 'GitPOAP: 2017 OpenZeppelin Contracts Contributor',
  orgName: 'Polygon',
  description: 'To the creators of Polygon Network',
};

export const LongDescription = Template.bind({});
LongDescription.args = {
  gitPOAPId: 1,
  imgSrc: badgeImg1 as unknown as string,
  name: 'Swype Protocol Purple Contributor',
  orgName: 'Swype',
  description:
    'Minted to core contributors who have given back to the community enough to meet the requirements of level purple',
};
