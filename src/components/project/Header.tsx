import { rem } from 'polished';
import React from 'react';
import styled from 'styled-components';
import { ProjectHeaderHexagon } from './ProjectHeaderHexagon';
import { Header as HeaderText, Text } from '../shared/elements';
import { TextAccent, TextGray } from '../../colors';
import { Link, IconLink } from '../Link';
import { SEO } from '../../components/SEO';
import { OrgName, OrgLink, Wrapper } from '../gitpoap/Header';
import { People, GitPOAP, Star, Globe, Twitter } from '../shared/elements/icons';
import { useRepoDataQuery, useRepoStarCountQuery } from '../../graphql/generated-gql';
import { FaGithub as GitHub } from 'react-icons/fa';

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

const StyledHeaderHexagon = styled(ProjectHeaderHexagon)`
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  max-width: inherit;
`;

const OrgNameStyled = styled(OrgName)`
  font-size: ${rem(16)};
`;

type Props = {
  repoId: number;
};

export const Header = ({ repoId }: Props) => {
  const [result] = useRepoDataQuery({ variables: { repoId } });
  const [resultStarCount] = useRepoStarCountQuery({ variables: { repoId } });

  const repo = result?.data?.repoData;
  const repoStarCount = resultStarCount?.data?.repoStarCount ?? null;
  const contributorCount = repo?.contributorCount ?? null;
  const mintedGitPOAPCount = repo?.mintedGitPOAPCount ?? null;

  return (
    <Wrapper>
      <SEO
        title={`${repo?.name.replace('GitPOAP: ', '') ?? 'GitPOAP'} | GitPOAP`}
        description={
          'GitPOAP is a decentralized reputation platform that represents off-chain accomplishments and contributions on chain as POAPs.'
        }
        image={'https://gitpoap.io/og-image-512x512.png'}
        url={`https://gitpoap.io/rp/${repoId}`}
      />
      <HexagonWrapper>
        <StyledHeaderHexagon />
        {repo && (
          <div>
            <HeaderText>{repo.name}</HeaderText>
            {/* {repo?.description && <Text style={{ paddingTop: rem(13) }}>{repo.description}</Text>} */}
            <OrgNameStyled>
              {'by '}
              <Link href={`/org/${repo.organization.id}`} passHref>
                <OrgLink>{repo.organization.name}</OrgLink>
              </Link>
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
              {repo.organization.name && (
                <StyledLink
                  href={`https://github.com/${repo.organization.name}/${repo.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  passHref
                >
                  <GitHub />
                </StyledLink>
              )}
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
          </div>
        )}
      </HexagonWrapper>
      <SubHeader>
        {contributorCount !== null && (
          <SubHeaderItem>
            <People />
            <SubHeaderItemCount>{contributorCount}</SubHeaderItemCount>
            <SubHeaderItemLabel>{'Contributors'}</SubHeaderItemLabel>
          </SubHeaderItem>
        )}
        {mintedGitPOAPCount !== null && (
          <SubHeaderItem>
            <GitPOAP />
            <SubHeaderItemCount>{mintedGitPOAPCount}</SubHeaderItemCount>
            <SubHeaderItemLabel>{'Minted'}</SubHeaderItemLabel>
          </SubHeaderItem>
        )}
        {repoStarCount !== null && (
          <SubHeaderItem>
            <Star />
            <SubHeaderItemCount>{repoStarCount}</SubHeaderItemCount>
            <SubHeaderItemLabel>{'Stars'}</SubHeaderItemLabel>
          </SubHeaderItem>
        )}
      </SubHeader>
    </Wrapper>
  );
};
