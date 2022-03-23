import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import Link from 'next/link';
import { Grid } from '@mantine/core';
import { useQuery, gql } from 'urql';
import { FeatureHeart } from '../shared/compounds/FeatureHeart';
import { GitPOAPBadge } from '../shared/elements/GitPOAPBadge';
import { Text } from '../shared/elements/Text';
import { Title } from '../shared/elements/Title';
import { TextAccent, TextGray, ExtraHover } from '../../colors';
import { Header as HeaderText } from '../shared/elements/Header';
import { FaGithub as GithubIcon, FaTwitter as TwitterIcon } from 'react-icons/fa';
import { VscGlobe as GlobeIcon } from 'react-icons/vsc';
import { Button } from '../shared/elements/Button';
import { useFeatures } from '../../components/FeaturesContext';

type Props = {
  gitPOAPId: number;
};

const GitPOAPQuery = gql`
  query gitPOAPQuery($id: Float!) {
    gitPOAPEvent(id: $id) {
      gitPOAP {
        repo {
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

export type GitPOAPQueryRes = {
  gitPOAP: {
    repo: {
      organization: Organization;
    };
  };
  event: Event;
};

const Wrapper = styled(Grid.Col)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: auto;
  width: ${rem(480)};

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

const OrgLink = styled.a`
  color: ${TextAccent};
`;

const OrgDescription = styled(Text)`
  font-size: ${rem(12)};
  margin-top: ${rem(12)};
  color: ${TextGray};
`;

const Badge = styled(GitPOAPBadge)`
  margin-top: ${rem(56)};
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
  const [result] = useQuery<{ gitPOAPEvent: GitPOAPQueryRes }>({
    query: GitPOAPQuery,
    variables: {
      id: gitPOAPId,
    },
  });

  const features = useFeatures();

  /* Hook to set profile data to state */
  useEffect(() => {
    setEvent(result.data?.gitPOAPEvent?.event);
    setOrganization(result.data?.gitPOAPEvent?.gitPOAP.repo.organization);
  }, [result.data]);

  return (
    <Wrapper span={12}>
      <Badge size="lg" imgUrl={event?.image_url ?? ''} />
      <TitleStyled>{event?.name}</TitleStyled>
      <Description>{event?.description}</Description>
      {organization && (
        <>
          <OrgName>
            {'by '}
            <Link href={`/o/${organization.id}`} passHref>
              <OrgLink>{organization.name}</OrgLink>
            </Link>
          </OrgName>
          <OrgDescription>{organization.description}</OrgDescription>
          <Links>
            {organization.twitterHandle && (
              <StyledLink href={`https://twitter.com/${organization.twitterHandle}`}>
                <TwitterIcon size={24} />
              </StyledLink>
            )}
            {organization.name && (
              <StyledLink href={`https://github.com/${organization.name}`}>
                <GithubIcon size={24} />
              </StyledLink>
            )}
            {organization.url && (
              <StyledLink href={organization.url}>
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
