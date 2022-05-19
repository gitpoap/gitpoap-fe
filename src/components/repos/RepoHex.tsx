import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { Slate1 } from '../../colors';
import { Body, Hex } from '../shared/elements/InfoHexBase';
import { GitPOAP, People, Star } from '../shared/elements/icons';
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
`;

// 224 112
// 198 099
let h = 20;

const BodyStyled = styled(Body)`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: ${rem(h)};
  margin-bottom: ${rem(h)};

  &:before {
    height: ${rem(h)};
    top: ${rem(-h)};
  }
  &:after {
    height: ${rem(h)};
    bottom: ${rem(-h)};
  }
`;

const HexStyled = styled(Hex)`
  width: ${rem(280)};
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

type Props = {
  repo: Repo;
  className?: string;
  hoverEffects?: boolean;
  starredCount?: number;
  totalContributors?: number;
};

export const RepoHex = ({
  className,
  hoverEffects,
  repo,
  starredCount,
  totalContributors,
}: Props) => {
  const { id, name, gitPOAPs } = repo;

  return (
    <HexStyled className={className}>
      <BodyStyled hoverEffects={hoverEffects}>
        <Content>
          <Link href={`/r/${id}`} passHref>
            <ProjectTitle>{name}</ProjectTitle>
          </Link>
          <Stats>
            <People />
            <Text>{totalContributors ?? 0}</Text>
            <GitPOAP />
            <Text>{gitPOAPs.length}</Text>
            <Star />
            <Text>{starredCount ?? 0}</Text>
          </Stats>
        </Content>
      </BodyStyled>
    </HexStyled>
  );
};
