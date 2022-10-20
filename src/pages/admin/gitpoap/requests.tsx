import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Grid, Loader, Stack } from '@mantine/core';
import { useAuthContext } from '../../../components/github/AuthContext';
import { ConnectGitHub } from '../../../components/admin/ConnectGitHub';
import { useGitPoapRequestsQuery } from '../../../graphql/generated-gql';
import { GitPOAPRequest } from '../../../components/admin/GitPOAPRequest';
import { DateTime } from 'luxon';
import { truncateAddress, truncateString } from '../../../helpers';
import { TableDashboard, TD } from '../../../components/admin/TableDashboard';

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

type RowData = {
  'Claim ID': TD<number>;
  'Github User': TD<string>;
  'PR #': TD<string>;
  'User ID': TD<number>;
  Repo: TD<string>;
  GitPOAP: TD<number>;
  Year: TD<number>;
  'Poap ID': TD<string>;
  Address: TD<string>;
  'Minted At': TD<string>;
  'Created At': TD<string>;
};

const GitPoapRequests: NextPage = () => {
  const { isLoggedIntoGitHub, isDev } = useAuthContext();
  const [result] = useGitPoapRequestsQuery({
    variables: {
      count: 200,
    },
  });
  const gitPOAPRequests = result.data?.gitPOAPRequests;

  console.log('result', result);

  return (
    <>
      <Head>
        <title>{'GitPoap Requests | GitPOAP'}</title>
        <meta name="description" content="GitPOAP Admin" />
      </Head>
      <Grid
        justify="center"
        style={{
          flex: 1,
          marginTop: rem(20),
          marginBottom: rem(20),
        }}
      >
        <Grid.Col xs={12} sm={12} md={12} lg={12} xl={12}>
          {isLoggedIntoGitHub || isDev ? (
            <>
              {result.fetching && (
                <LoaderContainer>
                  <Loader size="xl" variant="dots" />
                </LoaderContainer>
              )}
              <Stack align="center" justify="flex-start" spacing="sm">
                {gitPOAPRequests &&
                  gitPOAPRequests.map((gitPOAPRequest) => (
                    <GitPOAPRequest
                      key={gitPOAPRequest.id}
                      id={gitPOAPRequest.id}
                      name={gitPOAPRequest.name}
                      description={gitPOAPRequest.description}
                      imageKey={''}
                      startDate={gitPOAPRequest.startDate}
                      endDate={gitPOAPRequest.endDate}
                      expiryDate={gitPOAPRequest.expiryDate}
                      numRequestedCodes={gitPOAPRequest.numRequestedCodes}
                      email={gitPOAPRequest.email}
                      contributors={gitPOAPRequest.contributors}
                      projectName={gitPOAPRequest.project?.repos[0].name}
                      organizationName={gitPOAPRequest.organization?.name}
                    />
                  ))}
              </Stack>
            </>
          ) : (
            <ConnectGitHub />
          )}
        </Grid.Col>
      </Grid>
    </>
  );
};

export default GitPoapRequests;
