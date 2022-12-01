import { DateTime } from 'luxon';
import {
  Group,
  Stack,
  Text,
  Table,
  Button,
  ScrollArea,
  ActionIcon,
  Tooltip,
  Center,
} from '@mantine/core';
import { rem } from 'polished';
import styled from 'styled-components';
import React, { useState, useCallback } from 'react';
import {
  useGitPoapRequestsQuery,
  useTotalGitPoapRequestsCountQuery,
  StaffApprovalStatus,
  GitPoapRequestsQuery,
} from '../../../graphql/generated-gql';
import { HeaderItem } from '../../gitpoap/manage/ManageGitPOAP';
import { GitPOAPBadgePopover } from '../../request/RequestItem/GitPOAPBadgePopover';
import { useDisclosure } from '@mantine/hooks';
import { TableHeaderItem } from '../../gitpoap/manage/TableHeaderItem';
import { RequestStatusBadge } from '../../request/RequestItem/RequestStatusBadge';
import { ButtonStatus } from '../../shared/compounds/StatusButton';
import { useApi } from '../../../hooks/useApi';
import { ContributorModal } from '../../request/RequestItem/ContributorModal';
import {
  MdCheck,
  MdClose,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdOutlineEdit,
  MdRefresh,
} from 'react-icons/md';
import { NextLink } from '@mantine/next';
import { GitPOAPRequestModal } from './modals/Details';
import { Loader } from '../../shared/elements';
import { BackgroundPanel } from '../../../colors';
import { GitPOAPRequestRejectModal } from './modals/Reject';
import { shortenAddress } from '../../../helpers';

const HEADERS: HeaderItem[] = [
  { label: 'ID', key: 'requestId', isSortable: false },
  { label: 'Status', key: 'status', isSortable: false },
  { label: 'Image', key: 'image', isSortable: false },
  { label: 'Name', key: 'name', isSortable: false },
  { label: 'Description', key: 'description', isSortable: false },
  { label: 'Address', key: 'ethAddress', isSortable: false },
  { label: 'Email', key: 'email', isSortable: false },
  { label: 'Creation Date', key: 'createdAt', isSortable: false },
  { label: 'Last Updated', key: 'updatedAt', isSortable: false },
  { label: 'Start Date', key: 'startDate', isSortable: false },
  { label: 'End Date', key: 'endDate', isSortable: false },
  // { label: '# Codes', key: 'numCodes', isSortable: false },
  { label: 'Contributors', key: 'contributors', isSortable: false },
  { label: 'Actions', key: 'actions', isSortable: false },
];

type QueryVars = {
  page: number;
  perPage: number;
};

type Props = {
  staffApprovalStatus?: StaffApprovalStatus;
  debouncedValue?: string;
};

export const GitPOAPRequestTable = ({ staffApprovalStatus, debouncedValue }: Props) => {
  const [variables, setVariables] = useState<QueryVars>({
    page: 1,
    perPage: 20,
  });
  const [totalCountResult, refetchTotalCount] = useTotalGitPoapRequestsCountQuery({
    variables: {
      approvalStatus: staffApprovalStatus,
    },
  });
  const [result, refetch] = useGitPoapRequestsQuery({
    variables: {
      take: variables.perPage,
      skip: (variables.page - 1) * variables.perPage,
      approvalStatus: staffApprovalStatus,
      search: debouncedValue ? parseInt(debouncedValue, 10) : undefined,
    },
    pause: false,
    requestPolicy: 'network-only',
  });
  const [activeGitPOAPRequest, setActiveGitPOAPRequest] = useState<number | null>(null);
  const [rejectGitPOAPRequest, setRejectGitPOAPRequest] = useState<number | null>(null);

  const handlePageChange = useCallback(
    (page: number) =>
      setVariables((variables) => ({
        ...variables,
        page,
      })),
    [],
  );

  const totalCount = totalCountResult.data?.aggregateGitPOAPRequest._count?.id ?? 0;
  const totalPages = Math.floor(totalCount / variables.perPage + 1);
  const gitPOAPRequests = result.data?.gitPOAPRequests;

  return (
    <Stack
      align="center"
      justify="flex-start"
      spacing="sm"
      py={0}
      sx={{ border: `${rem(1)} solid ${BackgroundPanel}` }}
    >
      <Group position="apart" p={rem(16)} pr={rem(8)} sx={{ width: '100%' }}>
        <ActionIcon
          onClick={() => {
            refetch();
            refetchTotalCount();
          }}
        >
          {result.fetching ? <Loader /> : <MdRefresh size="20" />}
        </ActionIcon>
        <Group>
          <Text color="dimmed">
            {`${(variables.page - 1) * variables.perPage + 1}-${
              variables.page * variables.perPage
            } of ${totalCount}`}
          </Text>
          <ActionIcon
            disabled={variables.page === 1}
            onClick={() => void handlePageChange(variables.page - 1)}
          >
            <MdKeyboardArrowLeft size="20" />
          </ActionIcon>
          <ActionIcon
            disabled={variables.page === totalPages - 1}
            onClick={() => void handlePageChange(variables.page + 1)}
          >
            <MdKeyboardArrowRight size="20" />
          </ActionIcon>
        </Group>
      </Group>
      {result.fetching ? (
        <Center style={{ height: '40vh' }}>
          <Loader />
        </Center>
      ) : gitPOAPRequests && gitPOAPRequests.length === 0 ? (
        <Center style={{ height: '40vh' }}>
          <Text mt={rem(20)} size={18}>
            {'No GitPOAP Requests Found'}
          </Text>
        </Center>
      ) : (
        <ScrollArea style={{ width: '100%' }}>
          <Table highlightOnHover horizontalSpacing="md" verticalSpacing="xs" fontSize="sm">
            <thead>
              <tr>
                {HEADERS.map((header, i) => (
                  <TableHeaderItem
                    key={`header-${i}`}
                    isSortable={header.isSortable}
                    isSorted={false}
                    isReversed={false}
                    onSort={() => {}}
                  >
                    {header.label}
                  </TableHeaderItem>
                ))}
              </tr>
            </thead>
            <tbody>
              {!result.fetching &&
                gitPOAPRequests &&
                gitPOAPRequests.length > 0 &&
                gitPOAPRequests.map((gitPOAPRequest, i) => {
                  return (
                    <GitPOAPRequestRow
                      key={gitPOAPRequest.id}
                      active={activeGitPOAPRequest === i}
                      gitPOAPRequest={gitPOAPRequest}
                      setActiveGitPOAPRequest={() => setActiveGitPOAPRequest(i)}
                      setRejectGitPOAPRequest={() => setRejectGitPOAPRequest(gitPOAPRequest.id)}
                    />
                  );
                })}
            </tbody>
          </Table>
        </ScrollArea>
      )}
      {gitPOAPRequests && activeGitPOAPRequest !== null && (
        <GitPOAPRequestModal
          gitPOAPRequest={gitPOAPRequests[activeGitPOAPRequest]}
          opened={true}
          onClose={() => setActiveGitPOAPRequest(null)}
          nextActiveGitPOAPRequest={() =>
            setActiveGitPOAPRequest(
              (((activeGitPOAPRequest + 1) % gitPOAPRequests.length) + gitPOAPRequests.length) %
                gitPOAPRequests.length,
            )
          }
          prevActiveGitPOAPRequest={() =>
            setActiveGitPOAPRequest(
              (((activeGitPOAPRequest - 1) % gitPOAPRequests.length) + gitPOAPRequests.length) %
                gitPOAPRequests.length,
            )
          }
          setRejectGitPOAPRequest={setRejectGitPOAPRequest}
        />
      )}
      {rejectGitPOAPRequest !== null && (
        <GitPOAPRequestRejectModal
          gitPOAPRequestId={rejectGitPOAPRequest}
          onClose={() => setRejectGitPOAPRequest(null)}
          onSubmit={() => {
            setRejectGitPOAPRequest(null);
            setActiveGitPOAPRequest(null);
          }}
        />
      )}
    </Stack>
  );
};

const TableRow = styled.tr<{ active: boolean }>`
  cursor: pointer;
  &:hover {
    background-color: ${BackgroundPanel} !important;
  }
  ${({ active }) => active && `background-color: ${BackgroundPanel}`}
`;

type RowProps = {
  active: boolean;
  gitPOAPRequest: Exclude<GitPoapRequestsQuery['gitPOAPRequests'], undefined | null>[number];
  setActiveGitPOAPRequest: () => void;
  setRejectGitPOAPRequest: () => void;
};

const GitPOAPRequestRow = ({
  active,
  gitPOAPRequest,
  setActiveGitPOAPRequest,
  setRejectGitPOAPRequest,
}: RowProps) => {
  const {
    id,
    createdAt,
    updatedAt,
    name,
    description,
    imageUrl,
    contributors,
    startDate,
    endDate,
    // numRequestedCodes,
    staffApprovalStatus,
    creatorEmail,
    address,
  } = gitPOAPRequest;

  const api = useApi();

  const [isContributorModalOpen, { open: openContributorModal, close: closeContributorModal }] =
    useDisclosure(false);
  const [isImagePopoverOpen, { open: openImagePopover, close: closeImagePopover }] =
    useDisclosure(false);
  const [approveStatus, setApproveStatus] = useState<ButtonStatus>(ButtonStatus.INITIAL);
  // const [rejectStatus, setRejectStatus] = useState<ButtonStatus>(ButtonStatus.INITIAL);

  const areButtonsDisabled =
    approveStatus === ButtonStatus.LOADING ||
    // rejectStatus === ButtonStatus.LOADING ||
    approveStatus === ButtonStatus.SUCCESS;
  // rejectStatus === ButtonStatus.SUCCESS;

  const numberOfContributors = Object.values(contributors).flat().length;

  const submitApproveGitPOAPRequest = useCallback(async () => {
    setApproveStatus(ButtonStatus.LOADING);
    const data = await api.gitPOAPRequest.approve(id);
    if (data === null) {
      setApproveStatus(ButtonStatus.ERROR);
      return;
    }

    setApproveStatus(ButtonStatus.SUCCESS);
  }, [id, api.gitPOAPRequest]);

  return (
    <>
      <TableRow active={active} onClick={setActiveGitPOAPRequest}>
        <td>
          <Text>{id}</Text>
        </td>
        <td>
          <RequestStatusBadge status={staffApprovalStatus} />
        </td>
        <td>
          <GitPOAPBadgePopover
            isOpen={isImagePopoverOpen}
            onClose={closeImagePopover}
            onOpen={openImagePopover}
            imageUrl={imageUrl}
            showWithoutTemplate
            size="xxs"
          />
        </td>
        <td>
          <Text lineClamp={3}>{name}</Text>
        </td>
        <td>
          <Text lineClamp={3}>{description}</Text>
        </td>
        <td>
          <Tooltip label={address.ethAddress}>
            <Text sx={{ whiteSpace: 'nowrap' }}>{shortenAddress(address.ethAddress)}</Text>
          </Tooltip>
        </td>
        <td>
          <Text>{creatorEmail.emailAddress}</Text>
        </td>
        <td>
          <Text sx={{ whiteSpace: 'nowrap' }}>
            {DateTime.fromISO(createdAt, { zone: 'utc' }).toFormat('yyyy-MM-dd')}
          </Text>
        </td>
        <td>
          <Text sx={{ whiteSpace: 'nowrap' }}>
            {DateTime.fromISO(updatedAt, { zone: 'utc' }).toFormat('yyyy-MM-dd')}
          </Text>
        </td>
        <td>
          <Text sx={{ whiteSpace: 'nowrap' }}>
            {DateTime.fromISO(startDate, { zone: 'utc' }).toFormat('yyyy-MM-dd')}
          </Text>
        </td>
        <td>
          <Text sx={{ whiteSpace: 'nowrap' }}>
            {DateTime.fromISO(endDate, { zone: 'utc' }).toFormat('yyyy-MM-dd')}
          </Text>
        </td>
        {/* <td><Text>{numRequestedCodes}</Text></td> */}
        <td>
          <Center>
            <Button
              compact
              disabled={numberOfContributors === 0}
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                openContributorModal();
              }}
            >
              {numberOfContributors}
            </Button>
          </Center>
        </td>
        <td>
          <Group align="center" spacing="md" noWrap>
            <Tooltip label="Approve" withArrow withinPortal>
              <ActionIcon
                color="blue"
                disabled={
                  areButtonsDisabled || ['APPROVED'].includes(gitPOAPRequest.staffApprovalStatus)
                }
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  void submitApproveGitPOAPRequest();
                }}
                variant="filled"
              >
                <MdCheck />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Reject" withArrow withinPortal>
              <ActionIcon
                color="blue"
                disabled={
                  areButtonsDisabled ||
                  ['APPROVED', 'REJECTED'].includes(gitPOAPRequest.staffApprovalStatus)
                }
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  setRejectGitPOAPRequest();
                }}
                variant="filled"
              >
                <MdClose />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Edit" withArrow withinPortal>
              <ActionIcon
                color="blue"
                component={NextLink}
                disabled={
                  areButtonsDisabled || ['APPROVED'].includes(gitPOAPRequest.staffApprovalStatus)
                }
                href={`/create/${id}`}
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
                variant="filled"
              >
                <MdOutlineEdit />
              </ActionIcon>
            </Tooltip>
          </Group>
        </td>
      </TableRow>
      <ContributorModal
        isOpen={isContributorModalOpen}
        onClose={closeContributorModal}
        contributors={contributors}
      />
    </>
  );
};
