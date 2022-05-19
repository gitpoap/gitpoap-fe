import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { Slate1 } from '../../colors';
import { GitPOAP, Project } from '../shared/elements/icons';
import { Text } from '../shared/elements/Text';
import { Title } from '../shared/elements/Title';
import { Link } from '../Link';
import { Repo } from './RepoList';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: ${rem(10)} ${rem(20)};
  // height: ${rem(190)};

  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

const ProjectTitle = styled(Title)`
  font-size: ${rem(22)};
  line-height: ${rem(26)};
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

const Wrapper = styled.div`
  position: relative;
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
        d="M5.5 58.2686L130 5.96563L254.5 58.2686V221.731L130 274.034L5.5 221.731V58.2686Z"
        stroke="url(#paint0_linear_1208_11979)"
        strokeWidth="11"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1208_11979"
          x1="130"
          y1="9.64286"
          x2="130"
          y2="311.526"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#1E1F2E" />
          <stop offset="1" stopColor="#1E1F2E" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};

type Props = {
  repo: Repo;
  className?: string;
  hoverEffects?: boolean;
  totalProjects?: number;
};

export const OrganizationHex = ({ className, repo, totalProjects }: Props) => {
  const { id, name, gitPOAPs } = repo;
  return (
    <Wrapper className={className}>
      <Hex />
      <Content>
        <Link href={`/o/${id}`} passHref>
          <ProjectTitle>{name}</ProjectTitle>
        </Link>
        <Stats>
          <GitPOAP />
          <Text>{gitPOAPs.length}</Text>
          <Project />
          <Text>{totalProjects ?? 0}</Text>
        </Stats>
      </Content>
    </Wrapper>
  );
};
