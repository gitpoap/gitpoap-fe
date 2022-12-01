import React, { useState, useCallback } from 'react';
import {
  MdCheck,
  MdClose,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdOutlineEdit,
  MdPeople,
} from 'react-icons/md';
import {
  Group,
  Stack,
  Text,
  Button,
  Modal,
  UnstyledButton,
  AlphaSlider,
  HueSlider,
  ActionIcon,
  SimpleGrid,
} from '@mantine/core';
import { GitPoapRequestsQuery } from '../../../../graphql/generated-gql';
import { DateTime } from 'luxon';
import { useDisclosure } from '@mantine/hooks';
import { RequestStatusBadge } from '../../../request/RequestItem/RequestStatusBadge';
import { ButtonStatus } from '../../../shared/compounds/StatusButton';
import { useApi } from '../../../../hooks/useApi';
import { ContributorModal } from '../../../request/RequestItem/ContributorModal';
import { NextLink } from '@mantine/next';
import { GitPOAPBadge } from '../../../shared/elements';
import styled from 'styled-components';
import { BackgroundPanel2 } from '../../../../colors';
import { hslToColorString, rem } from 'polished';
import { GitPOAPTemplate } from '../GitPOAPTemplate';

const POAP = styled.img`
  border-radius: 50%;
  background: ${BackgroundPanel2};
`;

type ModalProps = {
  gitPOAPRequest: Exclude<GitPoapRequestsQuery['gitPOAPRequests'], undefined | null>[number];
  opened: boolean;
  onClose: () => void;
  nextActiveGitPOAPRequest: () => void;
  prevActiveGitPOAPRequest: () => void;
  setRejectGitPOAPRequest: (id: number | null) => void;
};

const ImageCarousel = ({ imageUrl }: { imageUrl: string }) => {
  const [alpha, setAlpha] = useState(0.75);
  const [hue, setHue] = useState(0);
  const [index, setIndex] = useState(0);

  return (
    <Stack align="center">
      {
        {
          0: <GitPOAPBadge imgUrl={imageUrl} altText="preview" size="lg" />,
          1: <POAP src={imageUrl} style={{ width: rem(370), height: rem(370) }} />,
          2: (
            <Stack>
              <div style={{ border: `${rem(1)} solid white` }}>
                <GitPOAPTemplate
                  fill={hslToColorString({ hue, saturation: 1, lightness: 0.5, alpha })}
                  style={{ position: 'absolute', width: rem(370), height: rem(370) }}
                />
                <POAP src={imageUrl} style={{ width: rem(370), height: rem(370) }} />
              </div>
              <HueSlider value={hue} onChange={setHue} onChangeEnd={setHue} />
              <AlphaSlider
                color={hslToColorString({ hue, saturation: 1, lightness: 0.5 })}
                value={alpha}
                onChange={setAlpha}
                onChangeEnd={setAlpha}
              />
            </Stack>
          ),
        }[index]
      }
      <Group position="center">
        <UnstyledButton
          onClick={() => setIndex(0)}
          p={rem(2)}
          style={{ border: `${rem(1)} solid ${index === 0 ? 'white' : 'transparent'}` }}
        >
          <div style={{ pointerEvents: 'none' }}>
            <GitPOAPBadge imgUrl={imageUrl} altText="preview" size="xxs" />
          </div>
        </UnstyledButton>
        <UnstyledButton
          onClick={() => setIndex(1)}
          p={rem(2)}
          style={{ border: `${rem(1)} solid ${index === 1 ? 'white' : 'transparent'}` }}
        >
          <POAP src={imageUrl} style={{ width: rem(54), height: rem(54) }} />
        </UnstyledButton>
        <UnstyledButton
          onClick={() => setIndex(2)}
          p={rem(2)}
          style={{ border: `${rem(1)} solid ${index === 2 ? 'white' : 'transparent'}` }}
        >
          <GitPOAPTemplate
            fill={hslToColorString({ hue, saturation: 1, lightness: 0.5, alpha })}
            style={{ position: 'absolute', width: rem(54), height: rem(54) }}
          />
          <POAP src={imageUrl} style={{ width: rem(54), height: rem(54) }} />
        </UnstyledButton>
      </Group>
    </Stack>
  );
};

export const GitPOAPRequestModal = ({
  gitPOAPRequest,
  opened,
  onClose,
  nextActiveGitPOAPRequest,
  prevActiveGitPOAPRequest,
  setRejectGitPOAPRequest,
}: ModalProps) => {
  const {
    id,
    name,
    description,
    imageUrl,
    contributors,
    createdAt,
    updatedAt,
    startDate,
    endDate,
    numRequestedCodes,
    staffApprovalStatus,
    creatorEmail,
    address,
  } = gitPOAPRequest;

  const api = useApi();

  const [isContributorModalOpen, { open: openContributorModal, close: closeContributorModal }] =
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
    <Modal
      centered
      opened={opened}
      onClose={onClose}
      size="auto"
      styles={() => ({
        title: {
          width: '100%',
        },
      })}
      title={
        <Group position="apart">
          <Group>
            <Text>{`Request ID: ${id}`}</Text>
            <RequestStatusBadge status={staffApprovalStatus} />
          </Group>
          <Group>
            <ActionIcon onClick={prevActiveGitPOAPRequest}>
              <MdKeyboardArrowLeft />
            </ActionIcon>
            <ActionIcon onClick={nextActiveGitPOAPRequest}>
              <MdKeyboardArrowRight />
            </ActionIcon>
          </Group>
        </Group>
      }
    >
      <SimpleGrid cols={2} spacing="lg" breakpoints={[{ maxWidth: 1100, cols: 1 }]}>
        <ImageCarousel imageUrl={imageUrl} />
        <Stack justify="space-between" sx={{ width: rem(500), height: '100%' }}>
          <Stack>
            <Text>{`Name: ${name}`}</Text>
            <Text>{`Description: ${description}`}</Text>
            <Text>{`Creator Address: ${address.ethAddress}`}</Text>
            <Text>{`Creator Email: ${creatorEmail.emailAddress}`}</Text>
            <Text sx={{ whiteSpace: 'nowrap' }}>
              {`Creation Date: ${DateTime.fromISO(createdAt, { zone: 'utc' }).toFormat(
                'yyyy-MM-dd',
              )}`}
            </Text>
            <Text sx={{ whiteSpace: 'nowrap' }}>
              {`Last Edited: ${DateTime.fromISO(updatedAt, { zone: 'utc' }).toFormat(
                'yyyy-MM-dd',
              )}`}
            </Text>
            <Text sx={{ whiteSpace: 'nowrap' }}>
              {`Start Date: ${DateTime.fromISO(startDate, { zone: 'utc' }).toFormat('yyyy-MM-dd')}`}
            </Text>
            <Text sx={{ whiteSpace: 'nowrap' }}>
              {`End Date: ${DateTime.fromISO(endDate, { zone: 'utc' }).toFormat('yyyy-MM-dd')}`}
            </Text>
            <Text>{`Number of Codes: ${numRequestedCodes}`}</Text>
            <Text>
              {'Contributors: '}
              <Button
                compact
                disabled={numberOfContributors === 0}
                onClick={openContributorModal}
                rightIcon={<MdPeople />}
              >
                {numberOfContributors}
              </Button>
              <ContributorModal
                isOpen={isContributorModalOpen}
                onClose={closeContributorModal}
                contributors={contributors}
              />
            </Text>
          </Stack>
          <Group align="center" grow pt="lg" spacing="md" noWrap>
            <Button
              disabled={
                areButtonsDisabled || ['APPROVED'].includes(gitPOAPRequest.staffApprovalStatus)
              }
              leftIcon={<MdCheck />}
              onClick={submitApproveGitPOAPRequest}
              variant="filled"
            >
              {'Approve'}
            </Button>
            <Button
              disabled={
                areButtonsDisabled ||
                ['APPROVED', 'REJECTED'].includes(gitPOAPRequest.staffApprovalStatus)
              }
              leftIcon={<MdClose />}
              onClick={() => setRejectGitPOAPRequest(id)}
              variant="filled"
            >
              {'Reject'}
            </Button>
            <Button
              component={NextLink}
              disabled={
                areButtonsDisabled || ['APPROVED'].includes(gitPOAPRequest.staffApprovalStatus)
              }
              href={`/create/${id}`}
              leftIcon={<MdOutlineEdit />}
              variant="filled"
            >
              {'Edit'}
            </Button>
          </Group>
        </Stack>
      </SimpleGrid>
    </Modal>
  );
};
