import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Stack, Group, Text, Button, Divider as DividerUI } from '@mantine/core';
import { GitPOAPBadge } from '../shared/elements/GitPOAPBadge';
import { BackgroundPanel2, ExtraRedDark } from '../../colors';

type ContributorsType = {
  githubHandles?: string[];
  ethAddresses?: string[];
  ensNames?: string[];
  emails?: string[];
};

type Props = {
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

export const GitPOAPRequest = (props: Props) => {
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
            <Text size={'sm'}>{props.name}</Text>
            <Text size={'sm'}>{props.description}</Text>
            <Text size={'sm'}>{props.email}</Text>
            <Text size={'sm'}>{props.numRequestedCodes}</Text>
          </Stack>
          <Stack>
            <Text size={'sm'}>{props.startDate}</Text>
            <Text size={'sm'}>{props.endDate}</Text>
            <Text size={'sm'}>{props.expiryDate}</Text>
          </Stack>
        </Group>
        <Group>
          <Button>Accept</Button>
          <Button color={ExtraRedDark}>Reject</Button>
        </Group>
      </Group>
      <Divider />
    </>
  );
};
