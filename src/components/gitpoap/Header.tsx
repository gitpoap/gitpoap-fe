import { rem } from 'polished';
import React, { useState, useEffect } from 'react';
import { FaGithub as GithubIcon, FaTwitter as TwitterIcon } from 'react-icons/fa';
import { VscGlobe as GlobeIcon } from 'react-icons/vsc';
import styled from 'styled-components';
import { useQuery, gql } from 'urql';
import Link from 'next/link';
import Head from 'next/head';
import { Button } from '../shared/elements/Button';
import { GitPOAPBadge } from '../shared/elements/GitPOAPBadge';
import { Header as HeaderText } from '../shared/elements/Header';
import { Text } from '../shared/elements/Text';
import { TextAccent, TextGray, ExtraHover } from '../../colors';
import { useFeatures } from '../../components/FeaturesContext';
import { Title } from '../shared/elements/Title';

type Props = {
  gitPOAPId: number;
};

type Organization = {
  id: number;
  name: string;
  description?: string;
  twitterHandle?: string;
  url?: string;
};

type Event = {
  name: string;
  image_url: string;
  description: string;
};

export type GitPOAPEventQueryRes = {
  gitPOAPEvent: {
    gitPOAP: {
      repo: {
        name: string;
        organization: Organization;
      };
    };
    event: Event;
  };
};

const GitPOAPEventQuery = gql`
  query gitPOAPEventQuery($id: Float!) {
    gitPOAPEvent(id: $id) {
      gitPOAP {
        repo {
          name
          organization {
            id
            name
            description
            twitterHandle
            url
          }
        }
      }
      event {
        name
        image_url
        description
      }
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: auto;
  width: ${rem(480)};
  max-width: 90%;

  a {
    text-decoration: none;
    &:hover {
      color: ${ExtraHover};
      cursor: pointer;
    }
  }
`;

const TitleStyled = styled(HeaderText)`
  margin-top: ${rem(24)};
`;

const Description = styled(Text)`
  margin-top: ${rem(16)};
  font-size: ${rem(16)};
`;

const OrgName = styled(Text)`
  margin-top: ${rem(30)};
  font-weight: 700;
  color: ${TextGray};
`;

const OrgLink = styled(Title)`
  color: ${TextAccent};
  // Make this pointer once the org page is built
  cursor: default;
`;

const OrgDescription = styled(Text)`
  font-size: ${rem(12)};
  margin-top: ${rem(12)};
  color: ${TextGray};
`;

const Badge = styled(GitPOAPBadge)`
  margin-top: ${rem(64)};
  cursor: default;
`;

const Links = styled.div`
  margin-top: ${rem(18)};
`;

const StyledLink = styled.a`
  color: ${TextGray};
  margin: 0 ${rem(12)};

  svg {
    fill: currentColor;
  }
`;

const CheckEligibilityButton = styled(Button)`
  margin-top: ${rem(40)};
`;

export const Header = ({ gitPOAPId }: Props) => {
  const [event, setEvent] = useState<Event>();
  const [organization, setOrganization] = useState<Organization>();
  const [repoName, setRepoName] = useState<string>();
  const [result] = useQuery<GitPOAPEventQueryRes>({
    query: GitPOAPEventQuery,
    variables: {
      id: gitPOAPId,
    },
  });

  const features = useFeatures();

  /* Hook to set profile data to state */
  useEffect(() => {
    if (result.data?.gitPOAPEvent) {
      setEvent(result.data?.gitPOAPEvent.event);
      setOrganization(result.data?.gitPOAPEvent.gitPOAP.repo.organization);
      setRepoName(result.data?.gitPOAPEvent.gitPOAP.repo.name);
    }
  }, [result.data]);

  return (
    <Wrapper>
      <Head>
        <title>{` ${event?.name.replace('GitPOAP: ', '') ?? 'GitPOAP'} | GitPOAP`}</title>
      </Head>
      <Badge size="lg" imgUrl={event?.image_url ?? ''} />
      <TitleStyled>{event?.name}</TitleStyled>
      <Description>{event?.description}</Description>
      {organization && (
        <>
          {features.hasOrganizations && (
            <>
              <OrgName>
                {'by '}
                <Link href={`/o/${organization.id}`} passHref>
                  <OrgLink>{organization.name}</OrgLink>
                </Link>
              </OrgName>
              <OrgDescription>{organization.description}</OrgDescription>
            </>
          )}
          <Links>
            {features.hasOrganizations && organization.twitterHandle && (
              <StyledLink
                href={`https://twitter.com/${organization.twitterHandle}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <TwitterIcon size={24} />
              </StyledLink>
            )}
            {organization.name && (
              <StyledLink
                href={`https://github.com/${organization.name}/${repoName}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubIcon size={24} />
              </StyledLink>
            )}
            {features.hasOrganizations && organization.url && (
              <StyledLink href={organization.url} target="_blank" rel="noopener noreferrer">
                <GlobeIcon size={24} />
              </StyledLink>
            )}
          </Links>
        </>
      )}
      {features.hasCheckIfImEligible && (
        <CheckEligibilityButton onClick={() => {}} leftIcon={<GithubIcon size={20} />}>
          {"Check If I'm Eligible"}
        </CheckEligibilityButton>
      )}
    </Wrapper>
  );
};
