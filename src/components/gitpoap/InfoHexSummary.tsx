import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { Group, Stack, Text, TextProps } from '@mantine/core';
import { Jazzicon as JazzIconReact } from '@ukstv/jazzicon-react';
import { TextAccent, ExtraHover, ExtraPressed } from '../../colors';
import { GitPOAP, Twitter, GitHub, GlobeNoHover } from '../shared/elements/icons';
import { InfoHexBase, Body } from '../shared/elements/InfoHexBase';
import { Avatar as AvatarUI } from '../shared/elements/Avatar';
import { IconCount } from '../shared/elements/IconCount';
import { truncateAddress } from '../../helpers';

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
  text-align: center;
  letter-spacing: ${rem(-1)};
  color: ${TextAccent};
  margin-bottom: ${rem(14)};
  transition: 150ms color ease;

  flex: none;
  order: 1;
  flex-grow: 0;
`;

const Bio = styled(Text)<TextProps>`
  line-height: ${rem(16)};
  letter-spacing: ${rem(-0.1)};
  flex: none;
  order: 2;
  flex-grow: 0;
  max-width: ${rem(180)};
`;

const Social = styled(Group)`
  > *:not(:last-child) {
    margin-right: ${rem(16)};
  }
  flex: none;
  order: 3;
  flex-grow: 0;
`;

const StyledInfoHex = styled(InfoHexBase)`
  display: inline-flex;
  flex-direction: column;
  min-width: ${rem(215)};

  ${Body}:hover {
    ${Name} {
      color: ${ExtraHover};
    }
  }

  ${Body}:active {
    ${Name} {
      color: ${ExtraPressed};
    }
  }
`;

const JazzIcon = styled(JazzIconReact)`
  height: ${rem(80)};
  width: ${rem(80)};
  margin-bottom: ${rem(14)};
`;

export const InfoHexSummary = ({
  className,
  address,
  bio,
  gitpoapId,
  twitterHandle,
  githubHandle,
  personalSiteUrl,
  numGitPOAPs,
  ensAvatarUrl,
  ensName,
}: Props) => {
  return (
    <StyledInfoHex className={className} hoverEffects href={`/p/${ensName ?? address}`}>
      <Stack
        py={0}
        px={rem(17)}
        align="center"
        justify="center"
        spacing={0}
        sx={{ minHeight: rem(200) }}
      >
        {ensAvatarUrl ? <Avatar src={ensAvatarUrl} /> : <JazzIcon address={address} />}
        <Name>{ensName ?? truncateAddress(address, 10)}</Name>
        {bio && (
          <Bio lineClamp={3} align="center" size={11}>
            {bio}
          </Bio>
        )}
        <Social align="center" position="apart" spacing={0} mt={rem(14)}>
          {twitterHandle && <Twitter />}
          {githubHandle && <GitHub />}
          {personalSiteUrl && <GlobeNoHover />}
          {gitpoapId && <IconCount icon={<GitPOAP />} count={numGitPOAPs ?? 0} />}
        </Social>
      </Stack>
    </StyledInfoHex>
  );
};
