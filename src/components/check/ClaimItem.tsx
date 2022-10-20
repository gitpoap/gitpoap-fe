import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { EligibleClaimsQuery } from '../../graphql/generated-gql';
import { Group, Stack } from '@mantine/core';
import { GitPOAP } from '../shared/compounds/GitPOAP';
import { Header, Text } from '../shared/elements';
import { truncateString } from '../../helpers';

const Container = styled(Group)`
  max-width: 100%;
  padding: ${rem(10)};
`;

const Title = styled(Header)`
  text-align: left;
  font-size: ${rem(24)};
  line-height: ${rem(32)};
`;

const Name = styled(Text)`
  font-weight: 600;
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
  return (
    <Container position="center" align="start" noWrap>
      <Stack align="start">
        <GitPOAP gitPOAPId={claim.gitPOAP.id} imgSrc={claim.gitPOAP.imageUrl} size="sm" />
      </Stack>
      <Stack align="flex-start" justify="flex-start">
        <Title>{claim.gitPOAP.name.replace('GitPOAP: ', '')}</Title>
        <Text align="left">{claim.gitPOAP.description}</Text>
        <Group position="left" align="flex-start" spacing={'xs'}>
          <Text>{'Issued to:'}</Text>
          <Name weight={600}>{truncateString(issuedTo, 24)}</Name>
        </Group>
      </Stack>
    </Container>
  );
};
