import React from 'react';
import { useRouter } from 'next/router';
import { GetStaticPropsContext } from 'next';
import { withUrqlClient, initUrqlClient } from 'next-urql';
import { ssrExchange, dedupExchange, cacheExchange, fetchExchange } from 'urql';

import { Page } from '../../_app';
import { Layout } from '../../../components/Layout';
import { Grid } from '@mantine/core';
import { SEO } from '../../../components/SEO';
import { OrgPage, OrgNotFound } from '../../../components/organization/OrgPage';
import {
  OrganizationSeoByNameQuery,
  OrganizationSeoByNameDocument,
  OrgsGetStaticPathsDocument,
  OrgsGetStaticPathsQuery,
} from '../../../graphql/generated-gql';

type PageProps = {
  data: OrganizationSeoByNameQuery;
};

const Organization: Page<PageProps> = (props) => {
  const router = useRouter();
  const { orgName } = router.query;

  if (typeof orgName !== 'string') {
    return <></>;
  }

  const org = props.data.organizationData;

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
export const getStaticProps = async (context: GetStaticPropsContext<{ orgName: string }>) => {
  const ssrCache = ssrExchange({ isClient: false });
  const client = initUrqlClient(
    {
      url: `${process.env.NEXT_PUBLIC_GITPOAP_API_URL}/graphql`,
      exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
    },
    false,
  );
  const orgName = context.params?.orgName as string;
  const results = await client!
    .query<OrganizationSeoByNameQuery>(OrganizationSeoByNameDocument, {
      orgName,
    })
    .toPromise();

  return {
    props: {
      urqlState: ssrCache.extractData(),
      /* coalesce to null if no data is returned -> nextJS doesn't like 'undefined' */
      data: results.data ?? null,
    },
  };
};

/* Statically generate all org pages at build time - collect all sets of unique paths
 * paths: { params: { orgName: string } }[]
 */
export const getStaticPaths = async () => {
  const ssrCache = ssrExchange({ isClient: false });
  const client = initUrqlClient(
    {
      url: `${process.env.NEXT_PUBLIC_GITPOAP_API_URL}/graphql`,
      exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
    },
    false,
  );

  const results = await client!
    .query<OrgsGetStaticPathsQuery>(OrgsGetStaticPathsDocument, {})
    .toPromise();

  const paths = results.data?.organizations.map((org) => ({
    params: { orgName: org.name },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

/* Custom layout function for this page */
Organization.getLayout = (page: React.ReactNode) => {
  return <Layout>{page}</Layout>;
};

export default withUrqlClient(
  (_) => ({
    url: `${process.env.NEXT_PUBLIC_GITPOAP_API_URL}/graphql`,
  }),
  { ssr: false }, // Important so we don't wrap our component in getInitialProps
)(Organization);
