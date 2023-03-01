import React from 'react';
import { Container } from '@mantine/core';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { usePrivy } from '@privy-io/react-auth';
import { HiOutlineMail } from 'react-icons/hi';
import { Layout } from '../../../components/Layout';
import { ProfileProvider } from '../../../components/profile/ProfileContext';
import { AccountConnection } from '../../../components/settings/AccountConnection';
import { truncateString } from '../../../helpers';

export default {
  title: 'Pages/Settings/Email',
  component: AccountConnection,
} as ComponentMeta<typeof AccountConnection>;

const Template: ComponentStory<typeof AccountConnection> = () => {
  const { user: privyUser, linkEmail, unlinkEmail } = usePrivy();

  return (
    <Layout>
      <ProfileProvider addressOrEns="0x12345">
        <Container my={48} size={600} style={{ width: '100%' }}>
          <AccountConnection
            user={privyUser}
            accountValue={''}
            label={'Email'}
            icon={<HiOutlineMail size={32} />}
            description={truncateString(privyUser?.email?.address ?? '', 18)}
            linkAccount={linkEmail}
            unlinkAccount={unlinkEmail}
          />
        </Container>
      </ProfileProvider>
    </Layout>
  );
};

export const Connected = Template.bind({});
Connected.args = { accountValue: 'test@gitpoap.io' };

export const Disconnected = Template.bind({});
Disconnected.args = { accountValue: '' };
