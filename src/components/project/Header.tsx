import { rem } from 'polished';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { Button } from '../shared/elements/Button';
import { Header as HeaderText } from '../shared/elements/Header';
import { Text } from '../shared/elements/Text';
import { TextAccent, TextGray, ExtraHover } from '../../colors';
import { Link } from '../Link';
import { Title } from '../shared/elements/Title';
import { People, GitPOAP, Star, Globe, GitHub, Twitter } from '../shared/elements/icons';
import {
  RepoDataQuery,
  RepoStarCountQuery,
  useRepoDataQuery,
  useRepoStarCountQuery,
} from '../../graphql/generated-gql';

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

const Social = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: ${rem(23)} auto 0;
  width: fit-content;
  > *:not(:last-child) {
    margin-right: ${rem(16)};
  }
`;

const IconLink = styled(Link)`
  text-decoration: none;
`;

const SubHeader = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  margin-top: ${rem(48)};
  min-height: ${rem(48)};
`;

const SubHeaderItem = styled.div`
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
const SubHeaderItemCount = styled.div`
  font-family: VT323;
  font-style: normal;
  font-weight: normal;
  font-size: ${rem(36)};
  line-height: ${rem(42)};
  text-align: center;
  letter-spacing: ${rem(-1)};
  color: ${TextAccent};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: ${rem(230)};
`;

const SubHeaderItemLabel = styled(Text)`
  font-size: ${rem(15)};
  color: ${TextGray};
`;

const LookingForContributors = styled.div`
  font-family: 'PT Mono';
  font-style: normal;
  font-weight: 700;
  font-size: ${rem(11)};
  line-height: ${rem(18)};

  //   text-align: center;
  letter-spacing: ${rem(1.2)};
  text-transform: uppercase;

  /* Extra/Neon */

  color: #ccf770;
`;

const DetailsButton = styled(Button)`
  margin-top: ${rem(16)};
  font-family: 'PT Mono';
  font-style: normal;
  font-weight: 700;
  font-size: ${rem(10)};
  line-height: ${rem(18)};
  /* identical to box height, or 180% */

  letter-spacing: ${rem(2)};
  text-transform: uppercase;
`;

const Tags = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: ${rem(13)};
`;

const Tag = styled.div`
  font-family: 'PT Mono';
  font-style: normal;
  font-weight: 700;
  font-size: ${rem(11)};
  line-height: ${rem(18)};
  /* identical to box height, or 164% */

  letter-spacing: ${rem(1.2)};
  text-transform: uppercase;
  padding: 0 ${rem(4)};

  /* Text/Light */

  color: #e2e2ee;

  background: #464968;
  border-radius: ${rem(4)};

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 0 ${rem(5)};
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

const StyledSVG = styled.svg`
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  max-width: inherit;
`;

type Props = {
  repoId: number;
};

export const Header = ({ repoId }: Props) => {
  const [repo, setRepo] = useState<RepoDataQuery['repoData']>();
  const [repoStarCount, setRepoStarCount] = useState<RepoStarCountQuery['repoStarCount']>();

  const [result] = useRepoDataQuery({ variables: { repoId } });
  const [resultStarCount] = useRepoStarCountQuery({ variables: { repoId } });

  useEffect(() => {
    console.log(result?.data?.repoData);
    if (result?.data?.repoData) {
      setRepo(result?.data?.repoData);
    }
  }, [result.data]);

  useEffect(() => {
    if (resultStarCount?.data?.repoStarCount !== undefined) {
      setRepoStarCount(resultStarCount?.data?.repoStarCount);
    }
  }, [resultStarCount.data]);

  return (
    <Wrapper>
      <Head>
        <title>{` ${repo?.name.replace('GitPOAP: ', '') ?? 'GitPOAP'} | GitPOAP`}</title>
      </Head>
      <HexagonWrapper>
        <StyledSVG
          width="628"
          height="348"
          viewBox="0 0 628 348"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M627.051 174V290.393C627.051 300.459 619.57 308.956 609.585 310.232L316.535 347.676C314.852 347.891 313.148 347.891 311.465 347.676L18.4144 310.232C8.42986 308.956 0.949226 300.459 0.949235 290.393L0.949341 174L0.949248 57.6071C0.94924 47.5414 8.42987 39.0441 18.4144 37.7684L311.465 0.323896C313.148 0.108841 314.852 0.108839 316.535 0.323895L609.585 37.7684C619.57 39.0442 627.051 47.5415 627.051 57.6071V174Z"
            fill="#1E1F2E"
          />
        </StyledSVG>
        {repo && (
          <div>
            <HeaderText>{repo.name}</HeaderText>
            {/* {repo?.description && <Text style={{ paddingTop: rem(13) }}>{repo.description}</Text>} */}
            {/* {repo?.tags && (
              <Tags>
                {repo.tags.map((tag, i) => (
                  <Tag key={repo.name + '-tag' + i}>{tag}</Tag>
                ))}
              </Tags>
            )} */}
            <OrgName>
              {'by '}
              {/* TODO: Add link when organization page is complete */}
              {/* <Link href={`/o/${repo.organization.id}`} passHref> */}
              <OrgLink>{repo.organization.name}</OrgLink>
              {/* </Link> */}
            </OrgName>
            <Social>
              {repo.organization.twitterHandle && (
                <IconLink
                  href={`https://twitter.com/${repo.organization.twitterHandle}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Twitter />
                </IconLink>
              )}
              {repo.organization.name && (
                <IconLink
                  href={`https://github.com/${repo.organization.name}/${repo.name}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <GitHub />
                </IconLink>
              )}
              {repo.organization.url && (
                <IconLink href={repo.organization.url} target="_blank" rel="noreferrer">
                  <Globe />
                </IconLink>
              )}
            </Social>
          </div>
        )}
      </HexagonWrapper>
      <SubHeader>
        {repo?.contributorCount && (
          <SubHeaderItem>
            <People />
            <SubHeaderItemCount>{repo.contributorCount}</SubHeaderItemCount>
            <SubHeaderItemLabel>{'Contributors'}</SubHeaderItemLabel>
          </SubHeaderItem>
        )}
        {repo?.gitPOAPs && (
          <SubHeaderItem>
            <GitPOAP />
            <SubHeaderItemCount>{repo?.gitPOAPs.length}</SubHeaderItemCount>
            <SubHeaderItemLabel>{'GitPOAPs'}</SubHeaderItemLabel>
          </SubHeaderItem>
        )}
        {repoStarCount !== undefined && (
          <SubHeaderItem>
            <Star />
            <SubHeaderItemCount>{repoStarCount}</SubHeaderItemCount>
            <SubHeaderItemLabel>{'Stars'}</SubHeaderItemLabel>
          </SubHeaderItem>
        )}
        {/* {repo?.lookingForContributors && (
          <SubHeaderItem>
            <LookingForContributors>{'Looking for contributors'}</LookingForContributors>
            <DetailsButton>{'Details'}</DetailsButton>
          </SubHeaderItem>
        )} */}
      </SubHeader>
    </Wrapper>
  );
};
