import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { BackgroundPanel, BackgroundPanel2, ExtraHover, ExtraPressed, Slate1 } from '../../colors';
import { Forked, GitPOAP } from '../shared/elements/icons';
import { Text } from '../shared/elements/Text';
import { Title } from '../shared/elements/Title';
import { Link } from '../Link';
import { Org } from './OrgList';
import { textEllipses } from '../shared/styles';
import { TextSkeleton } from '../shared/elements';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: ${rem(10)} ${rem(20)};
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

const Hex = () => {
  return (
    <svg
      width="260"
      height="280"
      viewBox="0 0 260 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        style={{ transition: '150ms stroke ease' }}
        d="M5.5 58.2686L130 5.96563L254.5 58.2686V221.731L130 274.034L5.5 221.731V58.2686Z"
        stroke="#1E1F2E"
        strokeWidth="11"
      />
    </svg>
  );
};

const OrgName = styled(Title)`
  font-size: ${rem(20)};
  line-height: ${rem(26)};
  ${textEllipses(200)}
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

const Wrapper = styled(Link)`
  position: relative;

  &:hover {
    > svg > path {
      stroke: ${BackgroundPanel2};
    }
    ${OrgName} {
      color: ${ExtraHover};
    }
  }

  &:active {
    > svg > path {
      stroke: ${BackgroundPanel};
    }
    ${OrgName} {
      color: ${ExtraPressed};
    }
  }
`;

const WrapperNonLink = styled.div`
  position: relative;
`;

export const OrganizationHexSkeleton = () => {
  return (
    <WrapperNonLink>
      <Hex />
      <Content>
        <OrgName>
          <TextSkeleton height={rem(20)} style={{ marginBottom: rem(5) }} />
        </OrgName>
        <Stats>
          <TextSkeleton height={rem(18)} width={rem(140)} />
        </Stats>
      </Content>
    </WrapperNonLink>
  );
};

type Props = {
  org: Org;
  className?: string;
  hoverEffects?: boolean;
};

export const OrganizationHex = ({ className, org }: Props) => {
  const { name, repos } = org;

  const totalGitPOAPs = repos.reduce((acc, repo) => {
    return acc + repo.project.gitPOAPs.length;
  }, 0);

  return (
    <Wrapper className={className} href={`/gh/${name}`} passHref>
      <Hex />
      <Content>
        <OrgName>{name}</OrgName>
        <Stats>
          <GitPOAP />
          <Text>{totalGitPOAPs}</Text>
          <Forked />
          <Text>{repos.length}</Text>
        </Stats>
      </Content>
    </Wrapper>
  );
};
