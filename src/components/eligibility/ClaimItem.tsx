import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { EligibleClaimsQuery } from '../../graphql/generated-gql';
import { Group, Stack, Text } from '@mantine/core';
import { GitPOAP } from '../shared/compounds/GitPOAP';
import { Header } from '../shared/elements';
import { truncateString } from '../../helpers';
import { Link } from '../shared/compounds/Link';

const Container = styled(Group)`
  max-width: 100%;
`;

const Title = styled(Header)`
  text-align: left;
  font-size: ${rem(24)};
  line-height: ${rem(28)};
`;

export type Claim = Exclude<EligibleClaimsQuery['claims'], undefined | null>[number];

type ClaimItemProps = {
  claim: Claim;
};

const getIssuedTo = ({ issuedAddress, email, user }: Claim) => {
  if (issuedAddress?.ensName) {
    return issuedAddress.ensName;
  } else if (issuedAddress?.ethAddress) {
    return issuedAddress.ethAddress;
  } else if (email) {
    return email.emailAddress;
  } else if (user?.githubHandle) {
    return user.githubHandle;
  }

  return '';
};

export const ClaimItem = ({ claim }: ClaimItemProps) => {
  const issuedTo = getIssuedTo(claim);
  const hasRepo = claim.gitPOAP.project && claim.gitPOAP.project.repos.length > 0;
  const fullRepoName = hasRepo
    ? `${claim.gitPOAP.project?.repos[0].organization.name}/${claim.gitPOAP.project?.repos[0].name}`
    : '';

  return (
    <Container position="center" align="start" noWrap p={rem(10)}>
      <Stack align="start">
        <GitPOAP gitPOAPId={claim.gitPOAP.id} imgSrc={claim.gitPOAP.imageUrl} size="sm" />
      </Stack>
      <Stack align="flex-start" justify="flex-start" spacing={10}>
        <Title>{claim.gitPOAP.name.replace('GitPOAP: ', '')}</Title>

        <Text align="left">{claim.gitPOAP.description}</Text>
        <Stack spacing={0}>
          <Group position="left" align="flex-start" spacing="xs">
            <Text weight={600}>{'Issued to: '}</Text>
            <Text>{truncateString(issuedTo, 24)}</Text>
          </Group>
          {hasRepo && (
            <Group spacing="xs">
              <Text weight={600}>{'For: '}</Text>
              <Link href={`/gh/${fullRepoName}`}>
                <Text weight="bold" variant="link">{`${fullRepoName}`}</Text>
              </Link>
            </Group>
          )}
        </Stack>
      </Stack>
    </Container>
  );
};
