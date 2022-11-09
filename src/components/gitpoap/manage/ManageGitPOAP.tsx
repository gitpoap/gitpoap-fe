import { Group, Stack, Table as TableUI, Button, Text, Pagination } from '@mantine/core';
import { Divider, Header } from '../../shared/elements';
import { useGitPoapWithClaimsQuery } from '../../../graphql/generated-gql';
import { rem } from 'polished';
import { ClaimRow } from './ClaimRow';
import styled from 'styled-components';
import { TextLight } from '../../../colors';
import { FaPlus } from 'react-icons/fa';
import { Link } from '../../shared/compounds/Link';
import { useCallback, useState } from 'react';
import { AddContributorModal } from './AddContributorsModal';
import { AddZone } from './AddZone';

const Table = styled(TableUI)`
  thead th {
    color: ${TextLight} !important;
  }
`;

type Props = {
  gitPOAPId: number;
};

const HEADERS = ['', '', 'Status', 'Holder', , 'Issued to', 'Minted At', 'Created At', ''];

export const ManageGitPOAP = ({ gitPOAPId }: Props) => {
  const perPage = 20;
  const [isAddContributorsModalOpen, setIsAddContributorsModalOpen] = useState(false);
  const [variables, setVariables] = useState<{ page: number }>({
    page: 1,
  });
  const [results, refetch] = useGitPoapWithClaimsQuery({
    variables: {
      id: gitPOAPId,
      take: perPage,
      skip: (variables.page - 1) * perPage,
    },
    requestPolicy: 'network-only',
  });

  const totalClaims = results.data?.gitPOAP?._count?.claims ?? 0;
  const claims = results.data?.gitPOAP?.claims;
  const gitPOAP = results.data?.gitPOAP;
  const totalPage = totalClaims / perPage;

  const handlePageChange = useCallback(
    (page: number) =>
      setVariables((variables) => ({
        ...variables,
        page,
      })),
    [],
  );

  return (
    <Group position="center" py={0} px={rem(20)}>
      <Stack align="left" justify="flex-start" spacing="sm" style={{ width: '100%' }}>
        <Group align="left">
          <Link href={`/gp/${gitPOAPId}`}>
            <Text color="grey" mb="md">
              {'< BACK TO GITPOAP PAGE'}
            </Text>
          </Link>
        </Group>
        <Group position="apart" align="center" grow style={{ width: '100%' }}>
          <Header style={{ alignSelf: 'start' }}>{'Edit GitPOAP'}</Header>
          <Group position="right">
            <Button leftIcon={<FaPlus />} onClick={() => setIsAddContributorsModalOpen(true)}>
              {'Add Contributors'}
            </Button>
          </Group>
        </Group>
        <Divider style={{ width: '100%', marginTop: rem(10), marginBottom: rem(10) }} />
        <Stack style={{ width: '100%' }}>
          {gitPOAP && (
            <>
              <Table horizontalSpacing="md" verticalSpacing="xs" fontSize="md">
                <thead>
                  <tr>
                    {HEADERS.map((header, i) => (
                      <th key={`header-${i}`}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {gitPOAP &&
                    claims?.map((claim, i) => {
                      return (
                        <ClaimRow
                          key={claim.id}
                          claim={claim}
                          index={i}
                          gitPOAPType={gitPOAP?.type}
                          refetch={refetch}
                        />
                      );
                    })}
                </tbody>
              </Table>
              <AddZone onClick={() => setIsAddContributorsModalOpen(true)} />
            </>
          )}
          {!gitPOAP && !results.fetching && results.operation && (
            <Group position="center">
              <Text size="lg">{'No GitPOAP found'}</Text>
            </Group>
          )}
        </Stack>
        {gitPOAP && results && totalClaims && totalClaims > perPage && (
          <Group my={rem(20)} position="center">
            <Pagination
              page={variables.page}
              onChange={handlePageChange}
              total={totalPage}
              mt={rem(20)}
            />
          </Group>
        )}
        <AddContributorModal
          gitPOAPId={gitPOAPId}
          isOpen={isAddContributorsModalOpen}
          refetch={refetch}
          onClose={() => {
            setIsAddContributorsModalOpen(false);
          }}
        />
      </Stack>
    </Group>
  );
};
