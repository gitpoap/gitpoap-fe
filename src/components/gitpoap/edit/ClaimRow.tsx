import { ActionIcon, Badge, Group, Text } from '@mantine/core';
import Link from 'next/link';
import { rem } from 'polished';
import styled from 'styled-components';
import { Jazzicon as JazzIconReact } from '@ukstv/jazzicon-react';
import { ClaimStatus, GitPoapWithClaimsQuery } from '../../../graphql/generated-gql';
import { truncateAddress } from '../../../helpers';
import { Avatar } from '../../shared/elements';
import { DateTime } from 'luxon';
import { BackgroundPanel2, ExtraRedDark, PrimaryBlue } from '../../../colors';
import { FaTrash } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';

type Props = {
  claim: Exclude<GitPoapWithClaimsQuery['gitPOAP'], undefined | null>['claims'][number];
  index: number;
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

const getIssuedTo = (claim: Props['claim']) => {
  if (claim.issuedAddress?.ensName) {
    return claim.issuedAddress.ensName;
  } else if (claim.issuedAddress?.ethAddress) {
    return truncateAddress(claim.issuedAddress.ethAddress, 6, 4);
  } else if (claim.githubUser?.githubHandle) {
    return claim.githubUser.githubHandle;
  } else if (claim.email?.emailAddress) {
    return claim.email.emailAddress;
  } else return 'Unknown';
};

export const ClaimRow = ({ claim, index }: Props) => {
  const { status, mintedAddress } = claim;

  const ensName = mintedAddress?.ensName;
  const ethAddress = mintedAddress?.ethAddress;
  const avatarImageUrl = mintedAddress?.ensAvatarImageUrl;

  return (
    <TableRow>
      <td>
        <Text size={14}>{index + 1}</Text>
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
        <Text size={14} sx={{ minWidth: rem(140) }}>
          <Badge
            size="lg"
            variant="filled"
            style={{
              backgroundColor: status === ClaimStatus.Unclaimed ? ExtraRedDark : PrimaryBlue,
            }}
          >
            {status}
          </Badge>
        </Text>
      </td>
      <td>
        <Text size={14} sx={{ minWidth: rem(140) }}>
          {mintedAddress?.ensName ?? truncateAddress(mintedAddress?.ethAddress ?? '', 6, 4)}
        </Text>
      </td>
      <td>
        <Text size={14} sx={{ minWidth: rem(140) }}>
          {getIssuedTo(claim)}
        </Text>
      </td>
      <td>
        <Text size={14} sx={{ minWidth: rem(140) }}>
          {claim.mintedAt ? DateTime.fromISO(claim.mintedAt).toFormat('dd LLL yy HH:mm') : '-'}
        </Text>
      </td>
      <td>
        <Text size={14} sx={{ minWidth: rem(140) }}>
          {DateTime.fromISO(claim.createdAt).toFormat('dd LLL yy HH:mm')}
        </Text>
      </td>
      <td>
        <Group>
          <ActionIcon variant="filled" radius="sm">
            <MdEdit />
          </ActionIcon>
          <ActionIcon variant="filled" radius="sm" disabled={status === ClaimStatus.Claimed}>
            <FaTrash />
          </ActionIcon>
        </Group>
      </td>
    </TableRow>
  );
};
