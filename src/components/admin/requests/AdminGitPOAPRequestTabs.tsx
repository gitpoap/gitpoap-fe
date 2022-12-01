import { Group, Stack, Tabs } from '@mantine/core';
import { useRouter } from 'next/router';
import { rem } from 'polished';
import styled from 'styled-components';
import { AdminApprovalStatus } from '../../../graphql/generated-gql';
import { useUrlState } from '../../../hooks/useUrlState';
import { Header, Input } from '../../shared/elements';
import { GitPOAPRequestTable } from './AdminGitPOAPRequestTable';

const Panel = styled(Tabs.Panel)`
  overflow: hidden;
  width: 100%;
`;

export const GitPOAPRequestTabs = () => {
  const { value, setValue, debouncedValue } = useUrlState('search');
  const router = useRouter();
  return (
    <Stack>
      <Group position="apart">
        <Header style={{ alignSelf: 'start' }}>{'GitPOAP Requests'}</Header>
        <Input
          placeholder={'Request ID'}
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if ((e.target.value && /^\d+$/.test(e.target.value)) || e.target.value === '') {
              setValue(e.target.value);
            }
          }}
        />
      </Group>
      <Tabs
        defaultValue="all"
        orientation="vertical"
        onTabChange={(value) =>
          router.push({ query: { filter: value } }, undefined, { shallow: true })
        }
        value={router.query.filter as string}
        variant="pills"
      >
        <Tabs.List pr={rem(10)} pt={rem(10)}>
          <Tabs.Tab value="all">{'All'}</Tabs.Tab>
          <Tabs.Tab value="pending">{'Pending'}</Tabs.Tab>
          <Tabs.Tab value="rejected">{'Rejected'}</Tabs.Tab>
          <Tabs.Tab value="approved">{'Approved'}</Tabs.Tab>
        </Tabs.List>

        <Panel value="all">
          <GitPOAPRequestTable debouncedValue={debouncedValue} />
        </Panel>

        <Panel value="pending">
          <GitPOAPRequestTable
            adminApprovalStatus={AdminApprovalStatus['Pending']}
            debouncedValue={debouncedValue}
          />
        </Panel>

        <Panel value="rejected">
          <GitPOAPRequestTable
            adminApprovalStatus={AdminApprovalStatus['Rejected']}
            debouncedValue={debouncedValue}
          />
        </Panel>

        <Panel value="approved">
          <GitPOAPRequestTable
            adminApprovalStatus={AdminApprovalStatus['Approved']}
            debouncedValue={debouncedValue}
          />
        </Panel>
      </Tabs>
    </Stack>
  );
};
