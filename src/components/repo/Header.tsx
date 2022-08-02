import { rem } from 'polished';
import React from 'react';
import styled from 'styled-components';
import { RepoHeaderHexagon } from './RepoHeaderHexagon';
import { Header as HeaderText, Text, TitleStyles } from '../shared/elements';
import { TextAccent, TextGray } from '../../colors';
import { Link, IconLink } from '../Link';
import { Wrapper } from '../gitpoap/Header';
import { People, GitPOAP, Star, Globe, Twitter } from '../shared/elements/icons';
import { RepoDataQuery, useRepoStarCountQuery } from '../../graphql/generated-gql';
import { FaGithub as GitHub } from 'react-icons/fa';
import { textEllipses } from '../shared/styles';

const OrgName = styled(Text)`
  margin-top: ${rem(30)};
  font-weight: 700;
  color: ${TextGray};
`;

export const Social = styled.div`
  margin: ${rem(23)} auto 0;
`;

export const StyledLink = styled(IconLink)`
  color: ${TextGray};
  text-decoration: none;
  margin: 0 ${rem(8)};

  & > svg {
    width: ${rem(24)};
    height: ${rem(24)};
  }
`;

export const SubHeader = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  margin-top: ${rem(48)};
  min-height: ${rem(48)};
`;

export const SubHeaderItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 ${rem(6)};

  & > svg {
    width: ${rem(30)};
    height: ${rem(30)};
  }

  & > * {
    margin-top: ${rem(4)};
  }
`;

// reference to InfoHexProfileDetail - Name
export const SubHeaderItemCount = styled.div`
  font-family: VT323;
  font-size: ${rem(36)};
  line-height: ${rem(42)};
  color: ${TextAccent};
`;

export const SubHeaderItemLabel = styled(Text)`
  font-size: ${rem(15)};
  color: ${TextGray};
`;

const OrgLink = styled(Link)`
  ${TitleStyles};
  font-size: ${rem(16)};
  color: ${TextAccent};
  ${textEllipses(350)};
  margin-left: ${rem(8)};
`;

const HexagonWrapper = styled.div`
  height: ${rem(348)};
  width: ${rem(628)};
  position: relative;
  left: 0;
  top: 0;
  margin-top: ${rem(75)};
  max-width: 90vw;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledHeaderHexagon = styled(RepoHeaderHexagon)`
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  max-width: inherit;
`;

const OrgNameStyled = styled(OrgName)`
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: flex-start;
  font-size: ${rem(16)};
  line-height: ${rem(18)};
`;

type Props = {
  repo: Exclude<RepoDataQuery['repoData'], null | undefined>;
};

export const Header = ({ repo }: Props) => {
  const [resultStarCount] = useRepoStarCountQuery({ variables: { repoId: repo.id } });

  return (
    <Wrapper>
      <HexagonWrapper>
        <StyledHeaderHexagon />
        <HeaderText>{repo.name}</HeaderText>
        <OrgNameStyled>
          {'by '}
          <OrgLink href={`/gh/${repo.organization.name}`}>{repo.organization.name}</OrgLink>
        </OrgNameStyled>
        <Social>
          {repo.organization.twitterHandle && (
            <StyledLink
              href={`https://twitter.com/${repo.organization.twitterHandle}`}
              target="_blank"
              rel="noopener noreferrer"
              passHref
            >
              <Twitter />
            </StyledLink>
          )}
          <StyledLink
            href={`https://github.com/${repo.organization.name}/${repo.name}`}
            target="_blank"
            rel="noopener noreferrer"
            passHref
          >
            <GitHub />
          </StyledLink>
          {repo.organization.url && (
            <StyledLink
              href={repo.organization.url}
              target="_blank"
              rel="noopener noreferrer"
              passHref
            >
              <Globe />
            </StyledLink>
          )}
        </Social>
      </HexagonWrapper>
      <SubHeader>
        <SubHeaderItem>
          <People />
          <SubHeaderItemCount>{repo.contributorCount}</SubHeaderItemCount>
          <SubHeaderItemLabel>{'Contributors'}</SubHeaderItemLabel>
        </SubHeaderItem>
        <SubHeaderItem>
          <GitPOAP />
          <SubHeaderItemCount>{repo.mintedGitPOAPCount}</SubHeaderItemCount>
          <SubHeaderItemLabel>{'Minted'}</SubHeaderItemLabel>
        </SubHeaderItem>
        <SubHeaderItem>
          <Star />
          <SubHeaderItemCount>{resultStarCount?.data?.repoStarCount ?? 0}</SubHeaderItemCount>
          <SubHeaderItemLabel>{'Stars'}</SubHeaderItemLabel>
        </SubHeaderItem>
      </SubHeader>
    </Wrapper>
  );
};
