import { Group, Stack, Tabs } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useRouter } from 'next/router';
import { rem } from 'polished';
import styled from 'styled-components';
import { StaffApprovalStatus } from '../../../graphql/generated-gql';
import { useUrlState } from '../../../hooks/useUrlState';
import { Header, Input } from '../../shared/elements';
import { GitPOAPRequestTable } from './table';

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

export const AdminGitPOAPRequestContainer = () => {
  const matches500 = useMediaQuery(`(max-width: ${rem(500)})`, false);
  const router = useRouter();
  const { value, setValue, debouncedValue } = useUrlState('search');

  return (
    <Stack my={rem(20)} px={rem(matches500 ? 16 : 32)}>
      <Group position="apart">
        <Header style={{ alignSelf: 'start' }}>{'GitPOAP Requests'}</Header>
        <Input
          placeholder={'Request ID'}
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            // Prevents searches from triggering due to non-numeric characters (spaces, etc.)
            if ((e.target.value && /^\d+$/.test(e.target.value)) || e.target.value === '') {
              setValue(e.target.value);
            }
          }}
        />
      </Group>
      <Tabs
        defaultValue={StatusFilter.Pending}
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
          <GitPOAPRequestTable debouncedValue={debouncedValue} />
        </Panel>

        <Panel value={StatusFilter.Pending}>
          <GitPOAPRequestTable
            staffApprovalStatus={StaffApprovalStatus['Pending']}
            debouncedValue={debouncedValue}
          />
        </Panel>

        <Panel value={StatusFilter.Rejected}>
          <GitPOAPRequestTable
            staffApprovalStatus={StaffApprovalStatus['Rejected']}
            debouncedValue={debouncedValue}
          />
        </Panel>

        <Panel value={StatusFilter.Approved}>
          <GitPOAPRequestTable
            staffApprovalStatus={StaffApprovalStatus['Approved']}
            debouncedValue={debouncedValue}
          />
        </Panel>
      </Tabs>
    </Stack>
  );
};
