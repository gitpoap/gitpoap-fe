import { rgba, rem } from 'polished';
import React from 'react';
import styled from 'styled-components';

import { Grid } from '@mantine/core';

import { MidnightBlue } from '../../colors';
import { Header } from '../../components/shared/elements/Header';
import { BackgroundHexes } from './BackgroundHexes';
import { OrgRepoList } from './OrgRepoList';
import { Header as PageHeader } from './Header';
import { BREAKPOINTS } from '../../constants';
import { useOrganizationDataQuery } from '../../graphql/generated-gql';

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

export const OrgNotFound = styled(Header)`
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

const ReposWrapper = styled.div`
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

export const OrgPage = ({ orgId }: Props) => {
  const [result] = useOrganizationDataQuery({ variables: { orgId } });
  const org = result?.data?.organizationData;

  return (
    <>
      <Background />
      {org ? (
        <>
          <Grid.Col style={{ zIndex: 1 }}>
            <PageHeader org={org} />
          </Grid.Col>

          <Grid.Col span={11}>
            <ContentWrapper>
              <ReposWrapper>
                <OrgRepoList orgId={org.id} />
              </ReposWrapper>
            </ContentWrapper>
          </Grid.Col>
        </>
      ) : (
        !org && !result.fetching && <OrgNotFound>{'Organization Not Found'}</OrgNotFound>
      )}
    </>
  );
};
