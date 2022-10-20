import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { DateTime } from 'luxon';
import { useAuthContext } from '../../components/github/AuthContext';
import { Stack, Group, Text, Button, Divider as DividerUI } from '@mantine/core';
import { GitPOAPBadge } from '../shared/elements/GitPOAPBadge';
import { SubmitButtonRow, ButtonStatus } from './SubmitButtonRow';
import { BackgroundPanel2, ExtraRedDark } from '../../colors';
import { approveGitPOAPRequest, rejectGitPOAPRequest } from '../../lib/gitpoapRequest';

type ContributorsType = {
  githubHandles?: string[];
  ethAddresses?: string[];
  ensNames?: string[];
  emails?: string[];
};

type Props = {
  id: number;
  name: string;
  description: string;
  imageKey: string;
  startDate: string;
  endDate: string;
  expiryDate: string;
  numRequestedCodes: number;
  email: string;
  contributors: ContributorsType;
  projectName?: string;
  organizationName?: string;
};

const Divider = styled(DividerUI)`
  border-top-color: ${BackgroundPanel2};

  &:last-child {
    display: none;
  }
`;

const dateToTimeAgo = (date: string): string => {
  const startDate = DateTime.fromISO(date);
  return startDate.toRelative() ?? '';
};

export const GitPOAPRequest = (props: Props) => {
  const { canSeeAdmin, tokens } = useAuthContext();
  const [approveStatus, setApproveStatus] = useState<ButtonStatus>(ButtonStatus.INITIAL);
  const [rejectStatus, setRejectStatus] = useState<ButtonStatus>(ButtonStatus.INITIAL);

  const accessToken = tokens?.accessToken ?? '';

  const submitApproveGitPOAPRequest = useCallback(async () => {
    setApproveStatus(ButtonStatus.LOADING);

    const data = await approveGitPOAPRequest(props.id, accessToken);

    if (data === null) {
      setApproveStatus(ButtonStatus.ERROR);
      return;
    }

    setApproveStatus(ButtonStatus.SUCCESS);
  }, [props.id, accessToken]);

  const submitRejectGitPOAPRequest = useCallback(async () => {
    setRejectStatus(ButtonStatus.LOADING);

    const data = await rejectGitPOAPRequest(props.id, accessToken);

    if (data === null) {
      setRejectStatus(ButtonStatus.ERROR);
      return;
    }

    setRejectStatus(ButtonStatus.SUCCESS);
  }, [props.id, accessToken]);

  return (
    <>
      <Group align="center" spacing="md">
        <GitPOAPBadge
          imgUrl={props.imageKey}
          altText=""
          size="sm"
          onClick={() => console.log('click image')}
        />
        <Group align="start" spacing="sm">
          <Stack>
            <Text size={'sm'}>Name: {props.name}</Text>
            <Text size={'sm'}>Description: {props.description}</Text>
            <Text size={'sm'}>Email: {props.email}</Text>
            <Text size={'sm'}>RequestCodes: {props.numRequestedCodes}</Text>
          </Stack>
          <Stack>
            <Text size={'sm'}>StartedAt: {dateToTimeAgo(props.startDate)}</Text>
            <Text size={'sm'}>EndAt: {dateToTimeAgo(props.endDate)}</Text>
            <Text size={'sm'}>ExpiryAt: {dateToTimeAgo(props.expiryDate)}</Text>
          </Stack>
        </Group>
        <Stack align="center" spacing="md">
          <Button
            onClick={submitApproveGitPOAPRequest}
            loading={approveStatus === ButtonStatus.LOADING}
            disabled={
              approveStatus === ButtonStatus.LOADING || rejectStatus === ButtonStatus.LOADING
            }
          >
            Accept
          </Button>
          <Button
            onClick={submitRejectGitPOAPRequest}
            loading={rejectStatus === ButtonStatus.LOADING}
            disabled={
              approveStatus === ButtonStatus.LOADING || rejectStatus === ButtonStatus.LOADING
            }
          >
            Reject
          </Button>
        </Stack>
      </Group>
      <Divider />
    </>
  );
};
