import { ActionIcon, Badge, Box, Group, Text, TextProps, Tooltip } from '@mantine/core';
import { rem } from 'polished';
import styled from 'styled-components';
import { Jazzicon as JazzIconReact } from '@ukstv/jazzicon-react';
import { ClaimStatus, GitPoapType, GitPoapWithClaimsQuery } from '../../../graphql/generated-gql';
import { truncateAddress } from '../../../helpers';
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

enum ButtonStatus {
  INITIAL,
  LOADING,
}

type Props = {
  claim: Exclude<GitPoapWithClaimsQuery['gitPOAP'], undefined | null>['claims'][number];
  gitPOAPType: GitPoapType;
  index: number;
  refetch: () => void;
};

const AvatarStyled = styled(Avatar)`
  height: ${rem(40)};
  width: ${rem(40)};
`;

const JazzIcon = styled(JazzIconReact)`
  height: ${rem(40)};
  width: ${rem(40)};
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
      <Group spacing={0}>
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
      <Group spacing={0}>
        <Link href={`/p/${claim.issuedAddress.ethAddress}`}>
          <Text variant="link">{truncateAddress(claim.issuedAddress.ethAddress, 6, 4)}</Text>
        </Link>
        <Badge color="blue" variant="outline" size="sm" ml="xs">
          {'ETH'}
        </Badge>
      </Group>
    );
  } else if (claim.githubUser?.githubHandle) {
    return (
      <Group spacing={0}>
        <Link href={`https://github.com/${claim.githubUser.githubHandle}`}>
          <Text variant="link">{claim.githubUser.githubHandle}</Text>
        </Link>
        <Badge color="blue" size="md" ml="xs">
          {'GITHUB'}
        </Badge>
      </Group>
    );
  } else if (claim.email?.emailAddress) {
    <Group spacing={0}>
      {claim.email.emailAddress}
      <Badge color="blue" variant="outline" size="sm" ml="xs">
        {'EMAIL'}
      </Badge>
    </Group>;
  }

  return (
    <Group>
      <Badge color="blue" variant="outline" size="sm" ml="xs">
        {'UNKNOWN'}
      </Badge>
    </Group>
  );
};

export const ClaimRow = ({ claim, index, gitPOAPType, refetch }: Props) => {
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
    status === ClaimStatus.Claimed
      ? "You can't remove if already minted"
      : gitPOAPType !== GitPoapType.Custom
      ? "You can't remove a contributor from an Annual GitPOAP"
      : 'Remove contributor';

  return (
    <TableRow>
      <td>
        <Text>{index + 1}</Text>
      </td>
      <td>
        <Link href={`/p/${ensName ?? ethAddress}`} passHref>
          {avatarImageUrl ? (
            <AvatarStyled src={avatarImageUrl} />
          ) : (
            <JazzIcon address={ethAddress ?? '0x'} />
          )}
        </Link>
      </td>
      <td>
        <TableDataText>
          <Badge
            size="lg"
            variant="filled"
            style={{
              backgroundColor: status === ClaimStatus.Unclaimed ? ExtraRedDark : PrimaryBlue,
            }}
          >
            {status}
          </Badge>
        </TableDataText>
      </td>
      <td>
        <Link href={`/p/${ensName ?? ethAddress}`} passHref>
          <TableDataText variant="link">
            {mintedAddress?.ensName ?? truncateAddress(mintedAddress?.ethAddress ?? '', 6, 4)}
          </TableDataText>
        </Link>
      </td>
      <td>
        <TableDataText>
          <IssuedTo claim={claim} />
        </TableDataText>
      </td>
      <td>
        <TableDataText>
          {claim.mintedAt ? DateTime.fromISO(claim.mintedAt).toFormat('dd LLL yy HH:mm') : '-'}
        </TableDataText>
      </td>
      <td>
        <TableDataText>
          {DateTime.fromISO(claim.createdAt).toFormat('dd LLL yy HH:mm')}
        </TableDataText>
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
                onClick={() => handleDeleteClaim(claim.id)}
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
