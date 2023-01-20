import {
  Group,
  Stack,
  Table as TableUI,
  Button,
  Text,
  Pagination,
  Box,
  MediaQuery,
  Loader,
} from '@mantine/core';
import { Divider, GitPOAPBadge, Header, Input } from '../../shared/elements';
import {
  ClaimOrderByWithRelationInput,
  SortOrder,
  useGitPoapWithClaimsQuery,
} from '../../../graphql/generated-gql';
import { rem } from 'polished';
import { ContributorRow } from './ContributorRow';
import styled from 'styled-components';
import { TextGray, TextLight } from '../../../colors';
import { FaPlus, FaSearch } from 'react-icons/fa';
import { useCallback, useState } from 'react';
import { AddContributorModal } from './AddContributorsModal';
import { AddZone } from './AddZone';
import { useDebouncedValue } from '@mantine/hooks';
import { trackOpenAddContributorsModal } from '../../../lib/tracking/events';
import { HeaderItem, TableHeaderItem, TableWrapper } from '../../shared/elements/Table';

type Props = {
  gitPOAPId: number;
};

const HEADERS: HeaderItem[] = [
  { label: '', key: 'index', isSortable: false },
  { label: 'Issued to', key: 'issuedTo', isSortable: false },
  { label: 'Holder', key: 'mintedAddress', isSortable: false },
  { label: 'Status', key: 'status', isSortable: true },
  { label: 'Minted At', key: 'mintedAt', isSortable: true },
  { label: 'Created At', key: 'createdAt', isSortable: true },
  { label: '', key: 'actions', isSortable: false },
];

type SortOptions = 'status' | 'mintedAddress' | 'mintedAt' | 'createdAt';

const operationsMap: (isReversed: boolean) => Record<SortOptions, ClaimOrderByWithRelationInput> = (
  isReversed: boolean,
) => {
  const sortDirection = isReversed ? SortOrder.Asc : SortOrder.Desc;
  return {
    mintedAt: { mintedAt: sortDirection },
    createdAt: { createdAt: sortDirection },
    status: { status: sortDirection },
    mintedAddress: { mintedAddress: { ensName: sortDirection } },
  };
};

const Table = styled(TableUI)`
  thead th {
    color: ${TextLight} !important;
  }
`;

export const ManageGitPOAP = ({ gitPOAPId }: Props) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [debouncedValue] = useDebouncedValue(searchValue, 200);
  const [sortBy, setSortBy] = useState<SortOptions>('mintedAt');
  const [isReversed, setIsReversed] = useState(true);
  const perPage = 50;
  const [isAddContributorsModalOpen, setIsAddContributorsModalOpen] = useState(false);
  const [variables, setVariables] = useState<{ page: number }>({
    page: 1,
  });
  const [results, refetch] = useGitPoapWithClaimsQuery({
    variables: {
      id: gitPOAPId,
      take: perPage,
      skip: (variables.page - 1) * perPage,
      orderBy: operationsMap(isReversed)[sortBy],
      search: debouncedValue && debouncedValue.length > 0 ? debouncedValue : undefined,
    },
    requestPolicy: 'network-only',
  });

  const totalClaims = results.data?.gitPOAP?._count?.claims ?? 0;
  const claims = results.data?.gitPOAP?.claims;
  const gitPOAP = results.data?.gitPOAP;

  const getTotalPages = () => {
    if (totalClaims < perPage) {
      return 1;
    } else if (searchValue.length > 0 && claims) {
      return Math.ceil(claims.length / perPage);
    } else {
      return Math.ceil(totalClaims / perPage);
    }
  };
  const totalPages = getTotalPages();

  const handlePageChange = useCallback(
    (page: number) =>
      setVariables((variables) => ({
        ...variables,
        page,
      })),
    [],
  );

  const setSorting = (field: SortOptions) => {
    const newIsReversed = field === sortBy ? !isReversed : false;
    setIsReversed(newIsReversed);
    setSortBy(field);
  };

  return (
    <Group position="center" py={0} px={rem(20)}>
      <Stack align="left" justify="flex-start" spacing="xs" style={{ width: '100%' }}>
        <Stack spacing={0} align="stretch" style={{ width: '100%' }}>
          <Group position="apart" align="center" style={{ width: '100%' }}>
            <Group align="center" position="left" noWrap={true}>
              {gitPOAP?.imageUrl && (
                <GitPOAPBadge
                  imgUrl={gitPOAP.imageUrl}
                  altText="preview"
                  size="xxxs"
                  href={`/gp/${gitPOAP.id}`}
                />
              )}
              <Stack spacing={0}>
                <Header style={{ alignSelf: 'start', whiteSpace: 'nowrap' }}>
                  {'Manage GitPOAP'}
                </Header>
                <Text
                  sx={{
                    color: TextGray,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: rem(350),
                  }}
                >
                  {gitPOAP?.name}
                </Text>
              </Stack>
            </Group>
            <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
              <Group position="right">
                <Input
                  placeholder={'SEARCH'}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  icon={
                    results.fetching && searchValue.length > 0 ? <Loader size={18} /> : <FaSearch />
                  }
                />
                <MediaQuery smallerThan="lg" styles={{ display: 'none' }}>
                  <Button
                    leftIcon={<FaPlus />}
                    onClick={() => {
                      trackOpenAddContributorsModal(gitPOAPId);
                      setIsAddContributorsModalOpen(true);
                    }}
                  >
                    {'Add Contributors'}
                  </Button>
                </MediaQuery>
              </Group>
            </MediaQuery>
          </Group>
        </Stack>
        <Divider style={{ width: '100%', marginTop: rem(10), marginBottom: rem(10) }} />
        <Stack style={{ width: '100%' }}>
          {gitPOAP && (
            <TableWrapper border={false}>
              <Table horizontalSpacing="md" verticalSpacing="xs" fontSize="sm">
                <thead>
                  <tr>
                    {HEADERS.map((header, i) => (
                      <TableHeaderItem
                        key={`header-${i}`}
                        isSortable={header.isSortable}
                        isSorted={sortBy === header.key}
                        isReversed={isReversed}
                        onSort={() => setSorting(header.key as SortOptions)}
                      >
                        {header.label}
                      </TableHeaderItem>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {gitPOAP &&
                    claims?.map((claim, i) => {
                      return (
                        <ContributorRow
                          key={claim.id}
                          claim={claim}
                          index={perPage * (variables.page - 1) + i}
                          refetch={refetch}
                        />
                      );
                    })}
                </tbody>
              </Table>
            </TableWrapper>
          )}
          {(!gitPOAP || gitPOAP.claims.length === 0) && !results.fetching && results.operation && (
            <Group position="center" my={rem(20)}>
              <Text size="lg">{'No Contributors Found'}</Text>
            </Group>
          )}
          <Box>
            <AddZone
              onClick={() => {
                trackOpenAddContributorsModal(gitPOAPId);
                setIsAddContributorsModalOpen(true);
              }}
              text={'+ ADD CONTRIBUTORS'}
            />
          </Box>
        </Stack>
        {gitPOAP && results && totalClaims && totalPages > 1 && (
          <Group my={rem(20)} position="center">
            <Pagination
              page={variables.page}
              onChange={handlePageChange}
              total={totalPages}
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
