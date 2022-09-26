import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ProfileSearchItem } from '../../components/search/box/SearchItem';

export default {
  title: 'Compounds/SearchItem',
  component: ProfileSearchItem,
} as ComponentMeta<typeof ProfileSearchItem>;

const Container = styled.div`
  width: ${rem(150)};
`;

const Template: ComponentStory<typeof ProfileSearchItem> = (args) => {
  return (
    <Container>
      <ProfileSearchItem {...args} />;
    </Container>
  );
};

export const Default = Template.bind({});
Default.args = {
  address: '0x4uqvt3uh4otvqn3u4htvqou3ih4tvmqih34t',
  ensName: 'hello.eth',
  href: 'https://example.com',
};
