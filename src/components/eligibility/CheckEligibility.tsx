import React, { useState } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { Box, BoxProps, Stack } from '@mantine/core';
import { Button, Header, Input, Loader, Text } from '../shared/elements';
import { EligibleClaimsQuery, useEligibleClaimsQuery } from '../../graphql/generated-gql';
import { FaEthereum, FaSearch } from 'react-icons/fa';
import { ClaimItem } from './ClaimItem';
import { useRouter } from 'next/router';
import { useWeb3Context } from '../wallet/Web3Context';
import { useUrlState } from '../../hooks/useUrlState';

export const ClaimListContainer = styled(Box)<BoxProps>`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  column-gap: ${rem(16)};
  row-gap: ${rem(32)};

  @media (max-width: ${rem(1600)}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${rem(1000)}) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export type Claim = Exclude<EligibleClaimsQuery['claims'], undefined | null>[number];

type QueryVars = {
  page: number;
  perPage: number;
};

export const CheckEligibility = () => {
  const router = useRouter();
  const urlSearchQuery = router.query.search as string | undefined;
  const { connectionStatus, connect } = useWeb3Context();
  const { value, setValue, debouncedValue } = useUrlState('search');
  const [variables] = useState<QueryVars>({
    page: 1,
    perPage: 36,
  });
  const [result] = useEligibleClaimsQuery({
    variables: {
      query: decodeURIComponent(urlSearchQuery ?? ''),
      take: variables.perPage,
      skip: (variables.page - 1) * variables.perPage,
    },
  });
  const allClaims = result.data?.claims;

  if (result.error) {
    return null;
  }

  return (
    <Stack align="center" mt={rem(80)} justify="center">
      <Stack align="center">
        <Header>{'Check Eligibility'}</Header>
        <Text align="center" size="md">
          {"Search for your GitHub handle & check if you're eligible for any GitPOAPs"}
        </Text>
        {connectionStatus === 'disconnected' && (
          <Button leftIcon={<FaEthereum size={16} />} onClick={() => connect()}>
            {'Sign In'}
          </Button>
        )}
      </Stack>
      <Input
        mb={rem(40)}
        px={rem(15)}
        style={{ width: rem(500) }}
        placeholder={'VBUTERIN...'}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        icon={result.fetching && !!debouncedValue ? <Loader size={18} /> : <FaSearch />}
      />
      {allClaims &&
      allClaims.length === 0 &&
      !result.fetching &&
      debouncedValue &&
      debouncedValue.length > 0 ? (
        <Text style={{ marginBottom: rem(40), fontSize: rem(18) }}>
          {'No unminted GitPOAPs found'}
        </Text>
      ) : (
        <ClaimListContainer mt={rem(50)} mb={rem(55)}>
          <>
            {allClaims &&
              debouncedValue &&
              result.operation?.variables.query &&
              result.operation?.variables.query.length > 0 &&
              allClaims.map((claim, i) => {
                return <ClaimItem key={i} claim={claim} />;
              })}
          </>
        </ClaimListContainer>
      )}
    </Stack>
  );
};
