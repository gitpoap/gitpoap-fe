import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { Slate1 } from '../../colors';
import { Body, Hex } from '../shared/elements/InfoHexBase';
import { GitPOAP, People, Star } from '../shared/elements/icons';
import { Text } from '../shared/elements/Text';
import { Title } from '../shared/elements/Title';
import { Link } from '../Link';
import { useRepoStarCountQuery } from '../../graphql/generated-gql';
import { ProjectResponse } from './ProjectList';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: ${rem(10)} ${rem(20)};
`;

let hexVerticalPadding = 20;

const BodyStyled = styled(Body)`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: ${rem(hexVerticalPadding)};
  margin-bottom: ${rem(hexVerticalPadding)};

  &:before {
    height: ${rem(hexVerticalPadding)};
    top: ${rem(-hexVerticalPadding)};
  }
  &:after {
    height: ${rem(hexVerticalPadding)};
    bottom: ${rem(-hexVerticalPadding)};
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
  project: ProjectResponse;
  className?: string;
  hoverEffects?: boolean;
  starredCount?: number;
  totalContributors?: number;
};

export const ProjectHex = ({ className, hoverEffects, project }: Props) => {
  const { id, name, contributorCount, mintedGitPOAPCount } = project;

  const [resultStarCount] = useRepoStarCountQuery({ variables: { repoId: id } });
  let starCount = resultStarCount?.data?.repoStarCount;

  return (
    <HexStyled className={className}>
      <BodyStyled hoverEffects={hoverEffects}>
        <Content>
          <Link href={`/rp/${id}`} passHref>
            <ProjectTitle>{name}</ProjectTitle>
          </Link>
          <Stats>
            <People />
            <Text>{contributorCount}</Text>
            <GitPOAP />
            <Text>{mintedGitPOAPCount}</Text>
            <Star />
            <Text>{starCount ?? 0}</Text>
          </Stats>
        </Content>
      </BodyStyled>
    </HexStyled>
  );
};
