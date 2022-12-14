import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { ExtraHover, ExtraPressed, Slate1, TextGray } from '../../colors';
import { Body, InfoHexBase } from '../shared/elements/InfoHexBase';
import { TitleNoHover } from '../shared/elements/Title';
import { Repo } from './RepoList';
import { TextSkeleton } from '../shared/elements';
import { textEllipses } from '../shared/styles';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${rem(0)} ${rem(20)};
  min-height: ${rem(100)};
`;

const RepoName = styled(TitleNoHover)`
  font-size: ${rem(20)};
  line-height: ${rem(26)};
  ${textEllipses(230)}
`;

const OrgName = styled(TitleNoHover)`
  font-size: ${rem(14)};
  line-height: ${rem(26)};
  color: ${TextGray};
  ${textEllipses(180)}
`;

const Stats = styled.div`
  align-items: center;
  display: inline-flex;
  margin-top: ${rem(10)};

  svg {
    height: ${rem(16)};
    fill: ${Slate1};
    margin-right: ${rem(4)};

    &:not(:first-child) {
      margin-left: ${rem(10)};
    }
  }
`;

const BODY_HEIGHT = 20;

export const InfoHexBaseStyled = styled(InfoHexBase)`
  ${Body} {
    display: flex;
    align-items: center;
    justify-content: center;

    margin-top: ${rem(BODY_HEIGHT)};
    margin-bottom: ${rem(BODY_HEIGHT)};
    padding: ${rem(15)} 0;

    &:before {
      height: ${rem(BODY_HEIGHT)};
      top: ${rem(-BODY_HEIGHT)};
    }
    &:after {
      height: ${rem(BODY_HEIGHT)};
      bottom: ${rem(-BODY_HEIGHT)};
    }

    &:hover {
      ${RepoName} {
        color: ${ExtraHover};
      }
    }

    &:active {
      ${RepoName} {
        color: ${ExtraPressed};
      }
    }
  }
`;

export const RepoHexSkeleton = () => {
  return (
    <InfoHexBaseStyled>
      <Content>
        <RepoName>
          <TextSkeleton height={rem(26)} style={{ marginBottom: rem(5) }} />
        </RepoName>
        <Stats>
          <TextSkeleton height={rem(18)} width={rem(140)} />
        </Stats>
      </Content>
    </InfoHexBaseStyled>
  );
};

type Props = {
  repo: Repo;
  starredCount?: number;
};

export const RepoHex = ({ repo }: Props) => {
  // @TODO: Add back claimCount, uniqueContributorCount once backend changes are in
  const { name, organization } = repo;

  return (
    <InfoHexBaseStyled href={`/gh/${repo.organization.name}/${repo.name}`} hoverEffects>
      <Content>
        <RepoName>{name}</RepoName>
        <OrgName>{organization.name}</OrgName>
        {/* @TODO: Add back once backend changes are ready - Jay (Jul 3 2022) */}
        {/* <Stats>
            <People />
            <Text>{uniqueContributorCount ?? 0}</Text>
            <GitPOAP />
            <Text>{gitPOAPs.length}</Text>
            <Minted />
            <Text>{claimCount ?? 0}</Text>
            <Star />
            <Text>{starredCount ?? 0}</Text>
          </Stats> */}
      </Content>
    </InfoHexBaseStyled>
  );
};
