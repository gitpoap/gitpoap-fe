import React from 'react';
import { useRouter } from 'next/router';
import { GetStaticPropsContext } from 'next';
import { withUrqlClient, SSRData } from 'next-urql';
import { NextPageWithLayout } from '../../_app';
import { Grid } from '@mantine/core';
import { SEO } from '../../../components/shared/compounds/SEO';
import { OrgPage, OrgNotFound } from '../../../components/organization/OrgPage';
import {
  OrganizationSeoByNameQuery,
  OrganizationSeoByNameDocument,
  OrgsGetStaticPathsDocument,
  OrgsGetStaticPathsQuery,
} from '../../../graphql/generated-gql';
import { createSSRUrqlClient, urqlClientOptions } from '../../../lib/urql';

type PageProps = {
  urqlState: SSRData;
  data: OrganizationSeoByNameQuery | null;
};

const Organization: NextPageWithLayout<PageProps> = (props) => {
  const router = useRouter();
  const { orgName } = router.query;

  if (typeof orgName !== 'string') {
    return <></>;
  }

  const org = props.data?.organizationData;

  return (
    <Grid justify="center" style={{ zIndex: 1 }}>
      <SEO
        title={`${org?.name ?? 'GitPOAP'} | GitPOAP`}
        description={
          'GitPOAP is a decentralized reputation platform that represents off-chain accomplishments and contributions on chain as POAPs.'
        }
        image={'https://gitpoap.io/og-image-512x512.png'}
        url={`https://gitpoap.io/${org && `gh/${org.name}`}`}
      />
      {org?.id ? <OrgPage orgId={org.id} /> : <OrgNotFound>{'Organization Not Found'}</OrgNotFound>}
    </Grid>
  );
};

/* Based on the path objects generated in getStaticPaths, statically generate pages for all
 * unique org names at built time.
 */
export const getStaticProps = async (
  context: GetStaticPropsContext<{ orgName: string }>,
): Promise<{ props: PageProps }> => {
  const { client, ssrCache } = createSSRUrqlClient();
  const orgName = context.params?.orgName as string;
  const results = await client
    ?.query<OrganizationSeoByNameQuery>(OrganizationSeoByNameDocument, {
      orgName,
    })
    .toPromise();

  return {
    props: {
      urqlState: ssrCache.extractData(),
      /* coalesce to null if no data is returned -> nextJS doesn't like 'undefined' */
      data: results?.data ?? null,
    },
  };
};

/* Statically generate all org pages at build time - collect all sets of unique paths
 * paths: { params: { orgName: string } }[]
 */
export const getStaticPaths = async () => {
  const { client } = createSSRUrqlClient();
  const results = await client
    ?.query<OrgsGetStaticPathsQuery>(OrgsGetStaticPathsDocument, {})
    .toPromise();

  const paths =
    results?.data?.githubOrganizations.map((org) => ({
      params: { orgName: org.name },
    })) ?? [];

  return {
    paths,
    fallback: 'blocking',
  };
};

export default withUrqlClient(
  () => urqlClientOptions,
  { ssr: false }, // Important so we don't wrap our component in getInitialProps
)(Organization);
