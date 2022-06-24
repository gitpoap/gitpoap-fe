import React from 'react';
import styled from 'styled-components';
import { rgba, rem } from 'polished';

import { Grid, Loader } from '@mantine/core';

import { PrimaryBlue, MidnightBlue } from '../../colors';
import { SEO } from '../../components/SEO';
import { BREAKPOINTS } from '../../constants';
import { useOrganizationDataQuery } from '../../graphql/generated-gql';
import { Header } from '../shared/elements/Header';
import { BackgroundHexes } from './BackgroundHexes';
import { Header as PageHeader } from './Header';
import { ProjectList } from './ProjectList';

const Background = styled(BackgroundHexes)`
  position: fixed;
  top: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 0;
  width: ${rem(1840)};

  mask-image: linear-gradient(
    to right,
    ${rgba(MidnightBlue, 0)} 0%,
    ${rgba(MidnightBlue, 1)} 20%,
    ${rgba(MidnightBlue, 1)} 80%,
    ${rgba(MidnightBlue, 0)} 100%
  );
`;

const Error = styled(Header)`
  margin-top: ${rem(284)};
`;

const Loading = styled(Loader)`
  margin-top: ${rem(284)};
`;

const ContentWrapper = styled.div`
  margin: ${rem(100)} ${rem(48)};
  display: flex;

  @media (max-width: ${BREAKPOINTS.md}px) {
    margin: ${rem(50)} ${rem(24)};
    flex-direction: column-reverse;
  }
`;

const ProjectsWrapper = styled.div`
  flex: 1;

  @media (max-width: ${BREAKPOINTS.md}px) {
    justify-content: center;
    width: 100%;
    margin: auto;
  }
`;

type Props = {
  orgId: number;
};

export const OrganizationPage = ({ orgId }: Props) => {
  const [result] = useOrganizationDataQuery({ variables: { orgId } });

  let org = result?.data?.organizationData;

  return (
    <Grid justify="center" style={{ zIndex: 1 }}>
      <SEO
        title={org ? `${org.name} | GitPOAP` : 'GitPOAP'}
        description={
          'GitPOAP is a decentralized reputation platform that represents off-chain accomplishments and contributions on chain as POAPs.'
        }
        image={'https://gitpoap.io/og-image-512x512.png'}
        url={`https://gitpoap.io/o/${orgId}`}
      />
      <Background />
      {result.fetching ? (
        <Loading color={PrimaryBlue} size={32} />
      ) : result.error ? (
        <Error>Organization Not Found</Error>
      ) : (
        org && (
          <>
            <Grid.Col style={{ zIndex: 1 }}>
              <PageHeader org={org} />
            </Grid.Col>

            <Grid.Col>
              <ContentWrapper>
                <ProjectsWrapper>
                  <ProjectList orgId={orgId} />
                </ProjectsWrapper>
              </ContentWrapper>
            </Grid.Col>
          </>
        )
      )}
    </Grid>
  );
};
