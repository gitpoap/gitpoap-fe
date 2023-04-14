import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { MostClaimedGitPoapsQuery } from '../../graphql/generated-gql';
import { Link } from '../shared/compounds/Link';
import { ExtraHover, ExtraPressed, TextLight } from '../../colors';
import { GitPOAPBadge } from '../shared/elements/GitPOAPBadge';
import { Group, Stack, Text } from '@mantine/core';
import { Title } from '../shared/elements/Title';
import { BREAKPOINTS } from '../../constants';
import { textEllipses } from '../shared/styles';
import { IconCount } from '../shared/elements';
import { GitPOAP } from '../shared/elements/icons';

const TitleStyled = styled(Title)`
  margin-top: ${rem(10)};
  text-align: start;
  font-family: 'PT Mono';
  font-style: normal;
  font-weight: bold;
  font-size: ${rem(15)};
  letter-spacing: ${rem(0.1)};
  line-height: ${rem(17)};
  width: 100%;
  ${textEllipses(300)};

  @media (max-width: ${BREAKPOINTS.sm}px) {
    ${textEllipses(200)}
  }
`;

const RepoName = styled(Text)`
  color: ${TextLight};
  &:hover {
    color: ${ExtraHover};
  }
  &:active {
    color: ${ExtraPressed};
  }
`;

export const TopMintItem = ({
  claimsCount,
  gitPOAP,
  event,
  index,
}: Exclude<MostClaimedGitPoapsQuery['mostClaimedGitPOAPs'], undefined | null>[number] & {
  index: number;
}) => {
  return (
    <Group
      align="center"
      position="apart"
      spacing={0}
      py={rem(16)}
      px={rem(20)}
      noWrap={true}
      sx={{ width: rem(600) }}
    >
      <Text color="dimmed" size={18} sx={{ width: '30px', cursor: 'default' }}>
        {index}
      </Text>
      <Group align="center" spacing={0} noWrap={true} sx={{ flexGrow: 1 }}>
        <Stack
          align="center"
          justify="center"
          spacing={0}
          sx={{ position: 'relative', display: 'inline-flex' }}
        >
          <GitPOAPBadge
            href={`/gp/${gitPOAP.id}`}
            size="xs"
            imgUrl={event.image_url}
            altText={event.name.replace('GitPOAP: ', '') ?? ''}
          />
        </Stack>
        <Stack ml={rem(20)} align="start" spacing={0}>
          <Link href={`/gp/${gitPOAP.id}`} passHref>
            <TitleStyled>{event.name.replace('GitPOAP: ', '')}</TitleStyled>
          </Link>
          {gitPOAP.project && (
            <Link href={`/rp/${gitPOAP.project.repos[0].id}`} passHref>
              <RepoName>{gitPOAP.project.repos[0].name}</RepoName>
            </Link>
          )}
        </Stack>
      </Group>
      <IconCount icon={<GitPOAP />} count={claimsCount} />
    </Group>
  );
};
