import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { Group, Paper, Stack, Text, TextProps } from '@mantine/core';
import { Jazzicon as JazzIconReact } from '@ukstv/jazzicon-react';
import { TextAccent, BackgroundPanel, BackgroundPanel2, BackgroundPanel3 } from '../../colors';
import { GitPOAP, Twitter, GitHub, GlobeNoHover } from '../shared/elements/icons';
import { Avatar as AvatarUI } from '../shared/elements/Avatar';
import { IconCount } from '../shared/elements/IconCount';
import { truncateAddress } from '../../helpers';
import { useRouter } from 'next/router';

type Props = {
  className?: string;
  address: string;
  bio?: string | null;
  gitpoapId?: string | number;
  twitterHandle?: string | null;
  githubHandle?: string;
  personalSiteUrl?: string | null;
  numGitPOAPs?: number;
  ensAvatarUrl: string | null;
  ensName: string | null;
};

const Avatar = styled(AvatarUI)`
  margin-bottom: ${rem(14)};
  flex: none;
  order: 0;
  flex-grow: 0;
`;

const Name = styled.div`
  font-family: VT323;
  font-style: normal;
  font-weight: normal;
  font-size: ${rem(24)};
  line-height: ${rem(26)};
  text-align: start;
  letter-spacing: ${rem(-1)};
  color: ${TextAccent};
  margin-bottom: ${rem(14)};
  transition: 150ms color ease;

  // flex: none;
  // order: 1;
  // flex-grow: 0;
`;

const Bio = styled(Text)<TextProps>`
  line-height: ${rem(16)};
  letter-spacing: ${rem(-0.1)};
  max-width: ${rem(280)};
`;

const Social = styled(Group)`
  > *:not(:last-child) {
    margin-right: ${rem(16)};
  }
`;

const JazzIcon = styled(JazzIconReact)`
  height: ${rem(80)};
  width: ${rem(80)};
`;

export const GitPOAPHolderBlock = ({
  className,
  address,
  bio,
  gitpoapId: gitPOAPId,
  twitterHandle,
  githubHandle,
  personalSiteUrl,
  numGitPOAPs,
  ensAvatarUrl,
  ensName,
}: Props) => {
  const router = useRouter();
  return (
    <Paper
      sx={{
        background: BackgroundPanel,
        border: `1px solid ${BackgroundPanel3}`,
        borderRadius: rem(6),
        transition: `150ms ease-in-out`,
        '&:hover': {
          background: BackgroundPanel2,
          borderColor: 'white',
          cursor: 'pointer',
        },
      }}
      onClick={() => router.push(`/p/${ensName ?? address}`)}
    >
      <Group align="center" noWrap py={rem(8)} px={rem(20)} className={className}>
        {ensAvatarUrl ? <Avatar src={ensAvatarUrl} /> : <JazzIcon address={address} />}
        <Stack
          pl={rem(4)}
          align="start"
          justify="center"
          spacing={0}
          sx={{ height: rem(120), flex: 1 }}
        >
          <Name>{ensName ?? truncateAddress(address, 10)}</Name>
          {bio && (
            <Bio lineClamp={2} align="start" size={11}>
              {bio}
            </Bio>
          )}
          <Social align="center" position="apart" spacing={0} mt={rem(14)}>
            {gitPOAPId && <IconCount icon={<GitPOAP />} count={numGitPOAPs ?? 0} />}
            {twitterHandle && <Twitter />}
            {githubHandle && <GitHub />}
            {personalSiteUrl && <GlobeNoHover />}
          </Social>
        </Stack>
      </Group>
    </Paper>
  );
};
