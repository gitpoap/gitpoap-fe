import React, { useState } from 'react';
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
  AlphaSlider,
  HueSlider,
  ActionIcon,
  SimpleGrid,
  Center,
} from '@mantine/core';
import { GitPoapRequestsQuery } from '../../../../graphql/generated-gql';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { RequestStatusBadge } from '../../../request/RequestItem/RequestStatusBadge';
import { ContributorModal } from '../../../request/RequestItem/ContributorModal';
import Link from 'next/link';
import { hslToColorString, rem } from 'polished';
import { GitPOAPTemplate } from '../../../shared/elements/GitPOAPTemplate';
import { formatUTCDate } from '../../../../helpers';

type ModalProps = {
  gitPOAPRequest: Exclude<GitPoapRequestsQuery['gitPOAPRequests'], undefined | null>[number];
  opened: boolean;
  onClose: () => void;
  nextActiveGitPOAPRequest: () => void;
  prevActiveGitPOAPRequest: () => void;
  setApproveGitPOAPRequest: (id: number | null) => void;
  setRejectGitPOAPRequest: (id: number | null) => void;
};

export const GitPOAPRequestModal = ({
  gitPOAPRequest,
  opened,
  onClose,
  nextActiveGitPOAPRequest,
  prevActiveGitPOAPRequest,
  setApproveGitPOAPRequest,
  setRejectGitPOAPRequest,
}: ModalProps) => {
  const {
    id,
    name,
    description,
    imageUrl,
    contributors,
    createdAt,
    startDate,
    endDate,
    numRequestedCodes,
    staffApprovalStatus,
    creatorEmail,
    address,
  } = gitPOAPRequest;

  const [isContributorModalOpen, { open: openContributorModal, close: closeContributorModal }] =
    useDisclosure(false);
  const matches420 = useMediaQuery(`(max-width: ${rem(420)})`, false);
  const matches500 = useMediaQuery(`(max-width: ${rem(500)})`, false);
  const [alpha, setAlpha] = useState(0.75);
  const [hue, setHue] = useState(0);

  const numberOfContributors = Object.values(contributors).flat().length;

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
            <Text>
              {!matches420 ? 'Request ID: ' : ''}
              {id}
            </Text>
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
        <Center pb="md" pt="xs">
          <Stack>
            <div
              style={{
                border: `${rem(1)} dashed white`,
                width: rem(370),
                height: rem(370),
                maxWidth: '80vw',
                maxHeight: '80vw',
                boxSizing: 'content-box',
                margin: 'auto',
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundImage:
                    'linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee 100%),linear-gradient(45deg, #eee 25%, white 25%, white 75%, #eee 75%, #eee 100%)',
                  backgroundPosition: '0 0, 10px 10px',
                  backgroundSize: '20px 20px',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    background: `url(${imageUrl}) center/contain no-repeat`,
                    position: 'relative',
                  }}
                >
                  <GitPOAPTemplate
                    fill={hslToColorString({ hue, saturation: 1, lightness: 0.5, alpha })}
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </div>
              </div>
            </div>
            <HueSlider value={hue} onChange={setHue} onChangeEnd={setHue} />
            <AlphaSlider
              color={hslToColorString({ hue, saturation: 1, lightness: 0.5 })}
              value={alpha}
              onChange={setAlpha}
              onChangeEnd={setAlpha}
            />
          </Stack>
        </Center>
        <Stack justify="space-between" sx={{ maxWidth: rem(500), width: '100%', height: '100%' }}>
          <Stack>
            <Text>{`Name: ${name}`}</Text>
            <Text>{`Description: ${description}`}</Text>
            <Text>{`Creator Address: ${address.ethAddress}`}</Text>
            {address.ensName && <Text>{`Creator ENS name: ${address.ensName}`}</Text>}
            <Text>{`Creator Email: ${creatorEmail.emailAddress}`}</Text>
            <Text sx={{ whiteSpace: 'nowrap' }}>
              {`Creation Date: ${formatUTCDate(createdAt)}`}
            </Text>
            <Text sx={{ whiteSpace: 'nowrap' }}>{`Start Date: ${formatUTCDate(startDate)}`}</Text>
            <Text sx={{ whiteSpace: 'nowrap' }}>{`End Date: ${formatUTCDate(endDate)}`}</Text>
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
          <Group align="center" grow pt="lg" spacing={matches500 ? 'xs' : 'md'} noWrap>
            <Button
              disabled={['APPROVED'].includes(gitPOAPRequest.staffApprovalStatus)}
              leftIcon={!matches500 && <MdCheck />}
              onClick={() => setApproveGitPOAPRequest(id)}
            >
              {!matches500 || (matches500 && !matches420) ? 'Approve' : <MdCheck />}
            </Button>
            <Button
              disabled={['APPROVED', 'REJECTED'].includes(gitPOAPRequest.staffApprovalStatus)}
              leftIcon={!matches500 && <MdClose />}
              onClick={() => setRejectGitPOAPRequest(id)}
            >
              {!matches500 || (matches500 && !matches420) ? 'Reject' : <MdClose />}
            </Button>
            <Button
              component={Link}
              disabled={['APPROVED'].includes(gitPOAPRequest.staffApprovalStatus)}
              href={`/create/${id}`}
              leftIcon={!matches500 && <MdOutlineEdit />}
            >
              {!matches500 || (matches500 && !matches420) ? 'Edit' : <MdOutlineEdit />}
            </Button>
          </Group>
        </Stack>
      </SimpleGrid>
    </Modal>
  );
};
