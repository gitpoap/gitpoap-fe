import { rem } from 'polished';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ProjectHeaderHexagon } from './ProjectHeaderHexagon';
import { Button } from '../shared/elements/Button';
import { Header as HeaderText } from '../shared/elements/Header';
import { Text } from '../shared/elements/Text';
import {
  BackgroundPanel3,
  TextAccent,
  TextGray,
  TextLight,
  ExtraHover,
  ExtraNeon,
} from '../../colors';
import { Link } from '../Link';
import { Title } from '../shared/elements/Title';
import { SEO } from '../../components/SEO';
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

  letter-spacing: ${rem(1.2)};
  text-transform: uppercase;

  color: ${ExtraNeon};
`;

const DetailsButton = styled(Button)`
  margin-top: ${rem(16)};
  font-family: 'PT Mono';
  font-style: normal;
  font-weight: 700;
  font-size: ${rem(10)};
  line-height: ${rem(18)};

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

  letter-spacing: ${rem(1.2)};
  text-transform: uppercase;
  padding: 0 ${rem(4)};

  color: ${TextLight};

  background: ${BackgroundPanel3};
  border-radius: ${rem(4)};

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

const StyledHeaderHexagon = styled(ProjectHeaderHexagon)`
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
