import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { Box, BoxProps, Stack } from '@mantine/core';
import { Header, Input, Loader, Text } from '../shared/elements';
import { useDebouncedValue } from '@mantine/hooks';
import { EligibleClaimsQuery, useEligibleClaimsQuery } from '../../graphql/generated-gql';
import { FaSearch } from 'react-icons/fa';
import { ClaimItem } from './ClaimItem';
import { useRouter } from 'next/router';

const StyledHeader = styled(Header)`
  display: block;
  max-width: 100%;
`;

const SubHeader = styled(Text)`
  width: ${rem(750)};
  max-width: 100%;
  line-height: ${rem(24)};
`;

const StyledSearch = styled(Input)`
  width: ${rem(400)};
  max-width: 100%;
`;

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
  const isRouterReady = router.isReady;
  const urlSearchQuery = router.query.search as string | undefined;

  const [searchValue, setSearchValue] = useState<string | undefined>(undefined);
  const [debouncedSearch] = useDebouncedValue(searchValue, 200);
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

  useEffect(() => {
    if (isRouterReady && urlSearchQuery && searchValue === undefined) {
      setSearchValue(urlSearchQuery ?? '');
    } else if (debouncedSearch === '') {
      router.replace('/eligibility', undefined, { shallow: true });
    } else if (debouncedSearch && debouncedSearch.length > 0) {
      router.replace(
        `/eligibility?search=${encodeURIComponent(debouncedSearch ?? '')}`,
        undefined,
        {
          shallow: true,
        },
      );
    }
  }, [isRouterReady, urlSearchQuery, searchValue, debouncedSearch]);

  if (result.error) {
    return null;
  }

  return (
    <Stack align="center" mt={rem(80)} justify="center">
      <Stack mb={rem(40)} align="center">
        <StyledHeader mb={rem(18)}>{'Check Eligibility'}</StyledHeader>
        <SubHeader align="center" size="md">
          {"Search for your GitHub handle & check if you're eligible for any GitPOAPs"}
        </SubHeader>
      </Stack>
      <StyledSearch
        mb={rem(40)}
        style={{ marginBottom: rem(40), width: rem(500) }}
        placeholder={'VBUTERIN...'}
        value={searchValue ?? ''}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
        icon={result.fetching ? <Loader size={18} /> : <FaSearch />}
      />
      {allClaims &&
      allClaims.length === 0 &&
      !result.fetching &&
      debouncedSearch &&
      debouncedSearch.length > 0 ? (
        <Text style={{ marginBottom: rem(40), fontSize: rem(18) }}>
          {'No unminted GitPOAPs found'}
        </Text>
      ) : (
        <ClaimListContainer mt={rem(50)} mb={rem(55)}>
          <>
            {allClaims &&
              debouncedSearch &&
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
