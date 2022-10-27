import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { Box, Divider as DividerUI, Group, Stack, Text, TextProps } from '@mantine/core';
import { Jazzicon as JazzIconReact } from '@ukstv/jazzicon-react';
import { DividerGray1, TextAccent } from '../../colors';
import { InfoHexBase } from '../shared/elements/InfoHexBase';
import { Project } from '../../types';
import { RepoHexSmall } from '../shared/compounds/RepoHexSmall';
import { Globe, GitHub, Twitter } from '../shared/elements/icons';
import {
  ProfileImageSkeleton,
  TextSkeleton,
  Avatar as AvatarUI,
  CollapsibleAddress,
  Button,
  Share,
} from '../shared/elements';
import { IconLink } from '../shared/compounds/Link';

type Props = {
  name: string | null;
  address: string | null;
  ensName?: string | null;
  bio: string | null;
  twitterHref?: string;
  githubHref?: string;
  websiteHref?: string | null;
  projects?: Project[];
  ensAvatarUrl: string | null;
  onClickEditProfile: () => void;
  showEditProfileButton: boolean;
  isLoading: boolean;
};

const Avatar = styled(AvatarUI)`
  width: ${rem(160)};
  height: ${rem(160)};
`;

const JazzIcon = styled(JazzIconReact)`
  height: ${rem(160)};
  width: ${rem(160)};
`;

const Name = styled(Text)<TextProps & { title: string }>`
  font-family: VT323;
  line-height: ${rem(42)};
  letter-spacing: ${rem(-1)};
  color: ${TextAccent};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: ${rem(230)};
`;

const Bio = styled(Text)<TextProps>`
  line-height: ${rem(16)};
  letter-spacing: ${rem(-0.1)};
  max-width: ${rem(220)};
`;

const Social = styled(Group)`
  > *:not(:last-child) {
    margin-right: ${rem(16)};
  }
`;

const StyledInfoHex = styled(InfoHexBase)`
  display: inline-flex;
  flex-direction: column;
  min-width: ${rem(270)};
`;

const Address = styled(CollapsibleAddress)`
  margin-bottom: ${rem(17)};
`;

const ProjectCount = styled(Text)<TextProps>`
  line-height: ${rem(17)};
  letter-spacing: ${rem(0.5)};
`;

const Divider = styled(DividerUI)`
  border-color-top: ${DividerGray1};
  height: ${rem(2)};
  width: ${rem(100)};
`;

const getWebsiteHref = (url: string | undefined | null) => {
  if (url) {
    if (url.startsWith('http')) {
      return url;
    }
    return `https://${url}`;
  }
};

export const InfoHexProfileDetail = ({
  isLoading,
  name,
  address,
  bio,
  twitterHref,
  githubHref,
  websiteHref,
  ensAvatarUrl,
  projects,
  onClickEditProfile,
  showEditProfileButton,
}: Props) => {
  const textToCopy = typeof window !== 'undefined' ? window.location.href : '';

  const processedWebsiteHref = getWebsiteHref(websiteHref);

  return (
    <StyledInfoHex>
      <Stack
        align="center"
        justify="center"
        py={0}
        px={rem(17)}
        sx={{ minHeight: rem(200) }}
        spacing={0}
      >
        <Box mb={rem(14)}>
          {isLoading ? (
            <ProfileImageSkeleton />
          ) : ensAvatarUrl ? (
            <Avatar src={ensAvatarUrl} />
          ) : address ? (
            <JazzIcon address={address} />
          ) : null}
        </Box>

        {name ? (
          <Name title={name} size={36} align="center" mb={rem(4)}>
            {name}
          </Name>
        ) : (
          <TextSkeleton height={rem(42)} style={{ marginBottom: rem(10) }} />
        )}

        {address ? (
          <Address address={address} isCollapsed />
        ) : (
          <TextSkeleton style={{ marginBottom: rem(17) }} />
        )}
        {bio && (
          <Bio mb={rem(15)} size={13} align="center">
            {bio}
          </Bio>
        )}
        <Social mt={rem(14)} align="center" position="apart" spacing={0}>
          {twitterHref && (
            <IconLink href={twitterHref} target="_blank" rel="noopener noreferrer" passHref>
              <Twitter />
            </IconLink>
          )}
          {githubHref && (
            <IconLink href={githubHref} target="_blank" rel="noopener noreferrer" passHref>
              <GitHub />
            </IconLink>
          )}
          {processedWebsiteHref && (
            <IconLink
              href={processedWebsiteHref}
              target="_blank"
              rel="noopener noreferrer"
              passHref
            >
              <Globe />
            </IconLink>
          )}
        </Social>
        {showEditProfileButton && (
          <Button style={{ marginTop: rem(20) }} onClick={onClickEditProfile} variant="outline">
            {'Edit Profile'}
          </Button>
        )}
        {projects && (
          <>
            <Divider mt={rem(37)} mb={rem(26)} />
            <ProjectCount span weight="bold" size={13} align="center" mb={rem(14)}>
              {`${projects.length} ${projects.length > 1 ? 'Projects' : 'Project'}`}
            </ProjectCount>
            {projects.map((project) => {
              return (
                <RepoHexSmall
                  key={project.id}
                  orgName={project.organization.name}
                  name={project.name}
                />
              );
            })}
          </>
        )}
        {address && <Share textToCopy={textToCopy} mt={rem(20)} />}
      </Stack>
    </StyledInfoHex>
  );
};
