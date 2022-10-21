import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { DateTime } from 'luxon';
import { rem } from 'polished';
import { Stack, Group, Divider as DividerUI } from '@mantine/core';
import { useAuthContext } from '../../components/github/AuthContext';
import { Text, Button } from '../../components/shared/elements';
import { GitPOAPBadge } from '../shared/elements/GitPOAPBadge';
import { SubmitButtonRow, ButtonStatus } from './SubmitButtonRow';
import { BackgroundPanel2, TextLight, TextGray } from '../../colors';
import { approveGitPOAPRequest, rejectGitPOAPRequest } from '../../lib/gitpoapRequest';
import { ContributorsType } from './GitPOAPRequestList';

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

const GitPOAPRequestContainer = styled.div`
  width: fit-content;
`;

const Value = styled(Text)`
  font-family: VT323;
  font-weight: normal;
  color: ${TextLight};
  font-size: ${rem(20)};
  line-height: ${rem(24)};
`;

const Label = styled(Text)`
  font-family: PT Mono, monospace;
  font-style: normal;
  font-weight: normal;
  color: ${TextGray};
  font-size: ${rem(12)};
  line-height: ${rem(15)};
`;

const Divider = styled(DividerUI)`
  border-top-color: ${BackgroundPanel2};
  width: 100%;

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
    <GitPOAPRequestContainer>
      <Group align="center" position="center" spacing="md">
        <GitPOAPBadge
          imgUrl={props.imageKey}
          altText=""
          size="sm"
          onClick={() => console.log('click image')}
        />
        <Group align="start" spacing="sm">
          <Stack>
            <Group spacing="sm">
              <Label>Name:</Label>
              <Value>{props.name}</Value>
            </Group>
            <Group spacing="sm">
              <Label>Description:</Label>
              <Value>{props.description}</Value>
            </Group>
            <Group spacing="sm">
              <Label>Email:</Label>
              <Value>{props.email}</Value>
            </Group>
            <Group spacing="sm">
              <Label>RequestCodes:</Label>
              <Value>{props.numRequestedCodes}</Value>
            </Group>
          </Stack>
          <Stack>
            <Group spacing="sm">
              <Label>StartedAt:</Label>
              <Value>{dateToTimeAgo(props.startDate)}</Value>
            </Group>
            <Group spacing="sm">
              <Label>EndAt:</Label>
              <Value>{dateToTimeAgo(props.endDate)}</Value>
            </Group>
            <Group spacing="sm">
              <Label>ExpiryAt:</Label>
              <Value>{dateToTimeAgo(props.expiryDate)}</Value>
            </Group>
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
    </GitPOAPRequestContainer>
  );
};
