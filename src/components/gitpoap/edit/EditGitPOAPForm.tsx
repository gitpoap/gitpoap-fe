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

const Table = styled(TableUI)`
  thead th {
    color: ${TextLight} !important;
  }
`;

type Props = {
  gitPOAPId: number;
};

const HEADERS = ['', '', 'Status', 'Holder', , 'Issued to', 'Minted At', 'Created At', ''];

export const EditGitPOAPForm = ({ gitPOAPId }: Props) => {
  const perPage = 20;
  const [isAddContributorsModalOpen, setIsAddContributorsModalOpen] = useState(false);
  const [variables, setVariables] = useState<{ page: number }>({
    page: 1,
  });
  const [results] = useGitPoapWithClaimsQuery({
    variables: {
      id: gitPOAPId,
      take: perPage,
      skip: (variables.page - 1) * perPage,
    },
  });

  const totalClaims = results.data?.gitPOAP?._count?.claims ?? 0;
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
          <Table horizontalSpacing="md" verticalSpacing="xs" fontSize="lg">
            <thead>
              <tr>
                {HEADERS.map((header) => (
                  <th key={header}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {results.data?.gitPOAP?.claims.map((claim, i) => {
                return <ClaimRow key={claim.id} claim={claim} index={i} />;
              })}
            </tbody>
          </Table>
        </Stack>
        {totalClaims && totalClaims > perPage && (
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
          isOpen={isAddContributorsModalOpen}
          onClose={() => setIsAddContributorsModalOpen(false)}
        />
      </Stack>
    </Group>
  );
};
