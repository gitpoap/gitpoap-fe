import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { FaGithub as GithubIcon, FaTwitter as TwitterIcon } from 'react-icons/fa';
import { VscGlobe as GlobeIcon } from 'react-icons/vsc';
import { useLocalStorage } from '@mantine/hooks';
import { Link, IconLink } from '../Link';
import { Text, Button, Header as HeaderText, GitPOAPBadge, TitleStyles } from '../shared/elements';
import { TextAccent, TextGray, ExtraHover } from '../../colors';
import { useAuthContext } from '../../components/github/AuthContext';
import { useFeatures } from '../../components/FeaturesContext';
import { BREAKPOINTS } from '../../constants';
import { useClaimModalContext } from '../ClaimModal/ClaimModalContext';
import { useGitPoapEventQuery } from '../../graphql/generated-gql';
import { textEllipses } from '../shared/styles';

type Props = {
  gitPOAPId: number;
};

export const Wrapper = styled.div`
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

  @media (max-width: ${BREAKPOINTS.md}px) {
    margin-bottom: ${rem(24)};
  }
  @media (max-width: ${BREAKPOINTS.sm}px) {
    margin-bottom: ${rem(48)};
  }
`;

const TitleStyled = styled(HeaderText)`
  margin-top: ${rem(24)};
`;

const Description = styled(Text)`
  margin-top: ${rem(16)};
  font-size: ${rem(16)};
  margin-bottom: ${rem(30)};
`;

export const RepoName = styled(Text)`
  display: flex;
  font-weight: 700;
  color: ${TextGray};
  margin-bottom: ${rem(7)};
  align-items: center;
`;

const By = styled(Text)`
  font-weight: 700;
  color: ${TextGray};
  margin-right: ${rem(7)};
`;

export const OrgLink = styled(Link)`
  ${TitleStyles}
  font-size: ${rem(16)};
  color: ${TextAccent};
  ${textEllipses(350)};

  @media (max-width: ${rem(BREAKPOINTS.sm)}) {
    ${textEllipses(250)}
  }
  @media (max-width: ${rem(BREAKPOINTS.xs)}) {
    ${textEllipses(175)}
  }
  @media (max-width: ${rem(350)}) {
    ${textEllipses(125)}
  }
`;

const Repos = styled.div`
  display: flex;
  flex-direction: row;
`;

const Badge = styled(GitPOAPBadge)`
  margin-top: ${rem(64)};
  cursor: default;
`;

const Links = styled.div`
  margin-top: ${rem(18)};
`;

const StyledLink = styled(IconLink)`
  margin: 0 ${rem(12)};
`;

const CheckEligibilityButton = styled(Button)`
  margin-top: ${rem(40)};
`;

const ReposContentLeft = styled.div`
  display: flex;
  flex-direction: column;
`;

const ReposContentRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Header = ({ gitPOAPId }: Props) => {
  const { authorizeGitHub, isLoggedIntoGitHub } = useAuthContext();

  const [result] = useGitPoapEventQuery({
    variables: {
      id: gitPOAPId,
    },
  });
  const event = result?.data?.gitPOAPEvent?.event;
  const repos = result?.data?.gitPOAPEvent?.gitPOAP.project.repos;
  const { setIsOpen } = useClaimModalContext();
  const features = useFeatures();
  const [isCheckButtonClicked, setIsCheckButtonClicked] = useLocalStorage<boolean>({
    key: 'isCheckEligibilityButtonClicked',
    defaultValue: false,
  });

  useEffect(() => {
    if (isLoggedIntoGitHub && isCheckButtonClicked) {
      setIsOpen(true);
      setIsCheckButtonClicked(false);
    }
  }, [isLoggedIntoGitHub, isCheckButtonClicked]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isLoggedIntoGitHub) {
      setIsCheckButtonClicked(true);
      authorizeGitHub();
    } else {
      setIsOpen(true);
    }
  };

  return (
    <Wrapper>
      <Badge size="lg" disableHoverEffects imgUrl={event?.image_url ?? ''} />
      <TitleStyled>{event?.name.replace('GitPOAP: ', '')}</TitleStyled>
      <Description>{event?.description}</Description>
      {repos && (
        <>
          <Repos>
            <ReposContentLeft>
              <By>{`by `}</By>
            </ReposContentLeft>
            <ReposContentRight>
              {repos.slice(0, 6).map((repo, i) => (
                <RepoName key={repo.id}>
                  <OrgLink
                    href={`/gh/${repo.organization.name}`}
                  >{`${repo.organization.name}`}</OrgLink>
                  {`/`}
                  <OrgLink href={`/gh/${repo.organization.name}/${repo.name}`}>{repo.name}</OrgLink>
                </RepoName>
              ))}
            </ReposContentRight>
          </Repos>

          <Links>
            {features.hasOrganizations && repos[0].organization.twitterHandle && (
              <StyledLink
                href={`https://twitter.com/${repos[0].organization.twitterHandle}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <TwitterIcon size={24} />
              </StyledLink>
            )}
            {features.hasOrganizations && repos[0].organization.url && (
              <StyledLink
                href={repos[0].organization.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GlobeIcon size={24} />
              </StyledLink>
            )}
          </Links>
        </>
      )}
      <CheckEligibilityButton onClick={handleClick} leftIcon={<GithubIcon size={20} />}>
        {"Check If I'm Eligible"}
      </CheckEligibilityButton>
    </Wrapper>
  );
};
