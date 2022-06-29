import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { InfoHexBase } from '../../components/shared/elements/InfoHexBase';
import { InfoHexProfileDetail } from '../../components/profile/InfoHexProfileDetail';
import profileImg6 from '../assets/profile6-large.png';
import { projectData } from '../data';

export default {
  title: 'Compounds/InfoHexProfile',
  component: InfoHexBase,
  argTypes: {},
} as ComponentMeta<typeof InfoHexBase>;

export const WithProjects: ComponentStory<typeof InfoHexBase> = (args) => {
  return (
    <InfoHexProfileDetail
      {...args}
      isLoading={false}
      imgSrc={profileImg6 as unknown as string}
      name="miguelmota.eth"
      address="0xe4feb387cb1daff4bf9108581b116e5fa737bea2"
      bio="Passionate for Ethereum, Bitcoin, and client-side development."
      twitterHref="https://twitter.com/miguelmota"
      githubHref="github.com/miguelmota"
      websiteHref="https://miguelmota.com"
      projects={projectData.slice(0, 3)}
      onClickEditProfile={() => console.warn('onClickEditProfile')}
      showEditProfileButton={true}
    />
  );
};

export const WithoutProjects: ComponentStory<typeof InfoHexBase> = (args) => {
  return (
    <InfoHexProfileDetail
      {...args}
      isLoading={false}
      imgSrc={profileImg6 as unknown as string}
      name="miguelmota.eth"
      address="0xe4feb387cb1daff4bf9108581b116e5fa737bea2"
      bio="Passionate for Ethereum, Bitcoin, and client-side development."
      twitterHref="https://twitter.com/miguelmota"
      githubHref="github.com/miguelmota"
      websiteHref="https://miguelmota.com"
      onClickEditProfile={() => console.warn('onClickEditProfile')}
      showEditProfileButton={true}
    />
  );
};

export const Loading: ComponentStory<typeof InfoHexBase> = (args) => {
  return (
    <InfoHexProfileDetail
      {...args}
      isLoading={true}
      imgSrc={null}
      name={null}
      address={null}
      bio={null}
      onClickEditProfile={() => console.warn('onClickEditProfile')}
      showEditProfileButton={false}
    />
  );
};
