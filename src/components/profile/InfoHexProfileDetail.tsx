import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { Divider as DividerUI, Text } from '@mantine/core';
import { Jazzicon as JazzIconReact } from '@ukstv/jazzicon-react';
import { DividerGray1, TextAccent, TextLight } from '../../colors';
import { InfoHexBase } from '../shared/elements/InfoHexBase';
import { Project } from '../../types';
import { RepoHexSmall } from '../shared/compounds/RepoHexSmall';
import { Globe, GitHub, Twitter } from '../shared/elements/icons';
import { useFeatures } from '../FeaturesContext';
import {
  ProfileImageSkeleton,
  TextSkeleton,
  Avatar as AvatarUI,
  CollapsibleAddress,
  Button,
  Share,
} from '../shared/elements';
import { IconLink } from '../Link';

type Props = {
  name: string | null;
  address: string | null;
  ensName?: string | null;
  bio: string | null;
  twitterHref?: string;
  githubHref?: string;
  websiteHref?: string | null;
  projects?: Project[];
  ensAvatarImageUrl: string | null;
  onClickEditProfile: () => void;
  showEditProfileButton: boolean;
  isLoading: boolean;
};

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: ${rem(200)};
  padding: 0 ${rem(17)};
`;

const ImageWrapper = styled.div`
  margin-bottom: ${rem(14)};
`;

const Avatar = styled(AvatarUI)`
  width: ${rem(160)};
  height: ${rem(160)};
`;

const JazzIcon = styled(JazzIconReact)`
  height: ${rem(160)};
  width: ${rem(160)};
`;

const Name = styled.div`
  font-family: VT323;
  font-style: normal;
  font-weight: normal;
  font-size: ${rem(36)};
  line-height: ${rem(42)};
  text-align: center;
  letter-spacing: ${rem(-1)};
  color: ${TextAccent};
  margin-bottom: ${rem(4)};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: ${rem(230)};
`;

const Bio = styled(Text)`
  font-family: PT Mono;
  font-style: normal;
  font-weight: normal;
  font-size: ${rem(13)};
  line-height: ${rem(16)};
  text-align: center;
  letter-spacing: ${rem(-0.1)};
  color: ${TextLight};
  max-width: ${rem(220)};
  margin-bottom: ${rem(15)};
`;

const Social = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: ${rem(14)};
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

const ProjectCount = styled.span`
  font-family: PT Mono;
  font-style: normal;
  font-weight: bold;
  font-size: ${rem(13)};
  line-height: ${rem(17)};
  text-align: center;
  letter-spacing: ${rem(0.5)};
  color: ${TextLight};
  margin-bottom: ${rem(14)};
`;

const Divider = styled(DividerUI)`
  margin-top: ${rem(37)};
  margin-bottom: ${rem(26)};
  border-color-top: ${DividerGray1};
  height: ${rem(2)};
  width: ${rem(100)};
`;

const ShareStyled = styled(Share)`
  margin-top: ${rem(20)};
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
  ensAvatarImageUrl,
  projects,
  onClickEditProfile,
  showEditProfileButton,
}: Props) => {
  const textToCopy = typeof window !== 'undefined' ? window.location.href : '';

  const processedWebsiteHref = getWebsiteHref(websiteHref);

  return (
    <StyledInfoHex>
      <Content>
        <ImageWrapper>
          {isLoading ? (
            <ProfileImageSkeleton />
          ) : ensAvatarImageUrl ? (
            <Avatar src={ensAvatarImageUrl} useDefaultImageTag />
          ) : address ? (
            <JazzIcon address={address} />
          ) : null}
        </ImageWrapper>

        {name ? (
          <Name title={name}>{name}</Name>
        ) : (
          <TextSkeleton height={rem(42)} style={{ marginBottom: rem(10) }} />
        )}

        {address ? (
          <Address address={address} isCollapsed />
        ) : (
          <TextSkeleton style={{ marginBottom: rem(17) }} />
        )}
        {bio && <Bio>{bio}</Bio>}
        <Social>
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
            <Divider />
            <ProjectCount>
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
        {address && <ShareStyled textToCopy={textToCopy} />}
      </Content>
    </StyledInfoHex>
  );
};
