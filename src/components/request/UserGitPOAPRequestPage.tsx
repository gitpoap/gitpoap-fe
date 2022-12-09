import React from 'react';
import { rem } from 'polished';
import { Button, Group, Stack, Tabs } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { StaffApprovalStatus } from '../../graphql/generated-gql';
import { Header, Input } from '../shared/elements';
import { useUrlState } from '../../hooks/useUrlState';
import { useRouter } from 'next/router';
import { useUser } from '../../hooks/useUser';
import styled from 'styled-components';
import { UserGitPOAPRequestTable } from './table';

const Panel = styled(Tabs.Panel)`
  overflow: hidden;
  width: 100%;
`;

enum StatusFilter {
  All = 'all',
  Pending = 'pending',
  Rejected = 'rejected',
  Approved = 'approved',
}

export const UserGitPOAPRequestPage = () => {
  const matches500 = useMediaQuery(`(max-width: ${rem(500)})`, false);
  const user = useUser();
  const address = user?.address;
  const router = useRouter();
  const { value, setValue, debouncedValue } = useUrlState('search');

  return (
    <Stack my={rem(20)} px={rem(matches500 ? 16 : 32)}>
      <Group position="apart" align="center" grow style={{ width: '100%' }}>
        <Header style={{ alignSelf: 'start' }}>{'My GitPOAPs'}</Header>
        <Group position="right" spacing="lg">
          <Input
            placeholder={'Search for request'}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button onClick={() => router.push('/create')}>{'+ CREATE GITPOAP'}</Button>
        </Group>
      </Group>
      <Tabs
        defaultValue={StatusFilter.All}
        orientation={matches500 ? 'horizontal' : 'vertical'}
        onTabChange={(value) =>
          router.push({ query: { filter: value } }, undefined, { shallow: true })
        }
        value={router.query.filter as string}
        variant="pills"
      >
        <Tabs.List pr={rem(10)} pt={rem(10)}>
          <Tabs.Tab value={StatusFilter.All}>{'All'}</Tabs.Tab>
          <Tabs.Tab value={StatusFilter.Pending}>{'Pending'}</Tabs.Tab>
          <Tabs.Tab value={StatusFilter.Rejected}>{'Rejected'}</Tabs.Tab>
          <Tabs.Tab value={StatusFilter.Approved}>{'Approved'}</Tabs.Tab>
        </Tabs.List>

        <Panel value={StatusFilter.All}>
          <UserGitPOAPRequestTable address={address ?? ''} debouncedValue={debouncedValue} />
        </Panel>

        <Panel value={StatusFilter.Pending}>
          <UserGitPOAPRequestTable
            address={address ?? ''}
            staffApprovalStatus={StaffApprovalStatus['Pending']}
            debouncedValue={debouncedValue}
          />
        </Panel>

        <Panel value={StatusFilter.Rejected}>
          <UserGitPOAPRequestTable
            address={address ?? ''}
            staffApprovalStatus={StaffApprovalStatus['Rejected']}
            debouncedValue={debouncedValue}
          />
        </Panel>

        <Panel value={StatusFilter.Approved}>
          <UserGitPOAPRequestTable
            address={address ?? ''}
            staffApprovalStatus={StaffApprovalStatus['Approved']}
            debouncedValue={debouncedValue}
          />
        </Panel>
      </Tabs>
    </Stack>
  );
};
