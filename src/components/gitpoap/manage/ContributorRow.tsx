import { ActionIcon, Badge, Box, Group, Text, TextProps, Tooltip } from '@mantine/core';
import { openConfirmModal } from '@mantine/modals';
import { rem } from 'polished';
import styled from 'styled-components';
import { Jazzicon as JazzIconReact } from '@ukstv/jazzicon-react';
import { ClaimStatus, GitPoapWithClaimsQuery } from '../../../graphql/generated-gql';
import { shortenAddress } from '../../../helpers';
import { Avatar } from '../../shared/elements';
import { DateTime } from 'luxon';
import {
  BackgroundPanel2,
  ExtraHover,
  ExtraPressed,
  ExtraRedDark,
  PrimaryBlue,
} from '../../../colors';
import { FaTrash } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import { useState } from 'react';
import { useApi } from '../../../hooks/useApi';
import { Link } from '../../shared/compounds/Link';
import { trackDeleteClaimOnManagePage } from '../../../lib/tracking/events';

enum ButtonStatus {
  INITIAL,
  LOADING,
}

type Props = {
  claim: Exclude<GitPoapWithClaimsQuery['gitPOAP'], undefined | null>['claims'][number];
  index: number;
  refetch: () => void;
};

const AvatarStyled = styled(Avatar)`
  height: ${rem(30)};
  width: ${rem(30)};
`;

const JazzIcon = styled(JazzIconReact)`
  height: ${rem(30)};
  width: ${rem(30)};
`;

const TableRow = styled.tr`
  &:hover {
    background-color: ${BackgroundPanel2};
  }
`;

const TableDataText = styled(Text)<TextProps>``;

const IssuedTo = ({ claim }: { claim: Props['claim'] }) => {
  if (claim.issuedAddress?.ensName) {
    return (
      <Group spacing={0} grow={false} noWrap={true}>
        <Link href={`/p/${claim.issuedAddress.ensName}`}>
          <Text variant="link">{claim.issuedAddress.ensName}</Text>
        </Link>
        <Badge color="blue" variant="outline" size="sm" ml="xs">
          {'ENS'}
        </Badge>
      </Group>
    );
  } else if (claim.issuedAddress?.ethAddress) {
    return (
      <Group spacing={0} grow={false} noWrap={true}>
        <Link href={`/p/${claim.issuedAddress.ethAddress}`}>
          <Text variant="link">{shortenAddress(claim.issuedAddress.ethAddress, 4)}</Text>
        </Link>
        <Badge color="blue" variant="outline" size="sm" ml="xs">
          {'ETH'}
        </Badge>
      </Group>
    );
  } else if (claim.githubUser?.githubHandle) {
    return (
      <Group spacing={0} grow={false} noWrap={true}>
        <Link href={`https://github.com/${claim.githubUser.githubHandle}`}>
          <Text variant="link">{claim.githubUser.githubHandle}</Text>
        </Link>
        <Badge color="blue" size="md" ml="xs">
          {'GITHUB'}
        </Badge>
      </Group>
    );
  } else if (claim.email?.emailAddress) {
    return (
      <Group spacing={0} grow={false} noWrap={true}>
        {claim.email.emailAddress}
        <Badge color="blue" variant="outline" size="sm" ml="xs">
          {'EMAIL'}
        </Badge>
      </Group>
    );
  }

  return (
    <Group grow={false} noWrap={true}>
      <Badge color="blue" variant="outline" size="sm" ml="xs">
        {'UNKNOWN'}
      </Badge>
    </Group>
  );
};

export const ContributorRow = ({ claim, index, refetch }: Props) => {
  const issuedTo =
    claim.issuedAddress?.ensName ??
    claim.issuedAddress?.ethAddress ??
    claim.githubUser?.githubHandle ??
    claim.email?.emailAddress ??
    'UNKNOWN';
  const openModal = () =>
    openConfirmModal({
      title: 'Remove this contributor?',
      centered: true,
      children: (
        <Text size="sm">
          {`Are you sure you want to remove `}
          <b>{issuedTo}</b>
          {` as a contributor?`}
        </Text>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onConfirm: () => {
        trackDeleteClaimOnManagePage(claim.id);
        void handleDeleteClaim(claim.id);
      },
    });

  const api = useApi();
  const { status, mintedAddress } = claim;
  const [buttonStatus, setButtonStatus] = useState<ButtonStatus>(ButtonStatus.INITIAL);

  const ensName = mintedAddress?.ensName;
  const ethAddress = mintedAddress?.ethAddress;
  const avatarImageUrl = mintedAddress?.ensAvatarImageUrl;
  const isDeleteDisabled = status === ClaimStatus.Claimed;
  const hasAttributesEnabled = false;

  const handleDeleteClaim = async (claimId: number) => {
    setButtonStatus(ButtonStatus.LOADING);
    await api.gitpoap.removeContributor(claimId);
    refetch();
    setButtonStatus(ButtonStatus.INITIAL);
  };

  const tooltipText =
    status === ClaimStatus.Claimed ? "You can't remove if already minted" : 'Remove contributor';

  return (
    <TableRow>
      <td>
        <Text>{index + 1}</Text>
      </td>
      <td>
        <Group sx={{ width: rem(180) }}>
          <IssuedTo claim={claim} />
        </Group>
      </td>
      <td>
        <Box sx={{ width: rem(160) }}>
          {mintedAddress ? (
            <Group noWrap={true}>
              <Link href={`/p/${ensName ?? ethAddress}`} passHref>
                {avatarImageUrl ? (
                  <AvatarStyled src={avatarImageUrl} />
                ) : ensName || ethAddress ? (
                  <JazzIcon address={ethAddress ?? '0x'} />
                ) : null}
              </Link>
              <Link href={`/p/${ensName ?? ethAddress}`} passHref>
                <TableDataText variant="link">
                  {mintedAddress?.ensName ?? shortenAddress(mintedAddress?.ethAddress ?? '', 4)}
                </TableDataText>
              </Link>
            </Group>
          ) : (
            <Text>-</Text>
          )}
        </Box>
      </td>
      <td>
        <TableDataText>
          <Badge
            size="lg"
            variant="filled"
            style={{
              backgroundColor: status === ClaimStatus.Unclaimed ? ExtraRedDark : PrimaryBlue,
              minWidth: rem(120),
            }}
          >
            {status}
          </Badge>
        </TableDataText>
      </td>
      <td>
        <Box sx={{ width: rem(160) }}>
          <Tooltip
            label={
              claim.mintedAt ? DateTime.fromISO(claim.mintedAt).toFormat('dd LLL yyyy HH:mm') : '-'
            }
            multiline
            withArrow
            transition="fade"
            position="top-start"
            sx={{ textAlign: 'center' }}
            disabled={claim.mintedAt ? false : true}
          >
            <TableDataText sx={{ cursor: 'default', whiteSpace: 'nowrap' }}>
              {claim.mintedAt ? DateTime.fromISO(claim.mintedAt).toRelative() : '-'}
            </TableDataText>
          </Tooltip>
        </Box>
      </td>
      <td>
        <Box>
          <Tooltip
            label={
              claim.createdAt
                ? DateTime.fromISO(claim.createdAt).toFormat('dd LLL yyyy HH:mm')
                : '-'
            }
            multiline
            withArrow
            transition="fade"
            position="top-start"
            sx={{ textAlign: 'center' }}
            disabled={claim.createdAt ? false : true}
          >
            <TableDataText sx={{ cursor: 'default', whiteSpace: 'nowrap' }}>
              {DateTime.fromISO(claim.createdAt).toRelative() ?? '-'}
            </TableDataText>
          </Tooltip>
        </Box>
      </td>
      <td>
        <Group>
          {hasAttributesEnabled && (
            <Box>
              <ActionIcon
                variant="filled"
                radius="sm"
                sx={{
                  background: PrimaryBlue,
                  transition: 'background 200ms ease',
                  '&:hover': {
                    background: ExtraHover,
                  },
                  '&:active': {
                    background: ExtraPressed,
                  },
                }}
              >
                <MdEdit />
              </ActionIcon>
            </Box>
          )}
          <Tooltip
            label={tooltipText}
            multiline
            withArrow
            transition="fade"
            sx={{ textAlign: 'center' }}
          >
            <Box>
              <ActionIcon
                variant="filled"
                radius="sm"
                disabled={isDeleteDisabled}
                loading={buttonStatus === ButtonStatus.LOADING}
                onClick={openModal}
                sx={{
                  background: PrimaryBlue,
                  transition: 'background 200ms ease',
                  '&:hover': {
                    background: ExtraHover,
                  },
                  '&:active': {
                    background: ExtraPressed,
                  },
                }}
              >
                <FaTrash />
              </ActionIcon>
            </Box>
          </Tooltip>
        </Group>
      </td>
    </TableRow>
  );
};
