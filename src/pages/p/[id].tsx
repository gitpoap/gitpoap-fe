import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { Grid } from '@mantine/core';
import { isAddress } from 'ethers/lib/utils';
import { NextPageContext } from 'next';
import { ssrExchange, dedupExchange, cacheExchange, fetchExchange } from 'urql';
import { initUrqlClient, withUrqlClient } from 'next-urql';
import { ProfileDocument, ProfileQuery, ProfileQueryVariables } from '../../graphql/generated-gql';
import { Page } from '../_app';
import { Layout } from '../../components/Layout';
import { AllPOAPs } from '../../components/profile/AllPOAPs';
import { GitPOAPs } from '../../components/profile/GitPOAPs';
import { useRouter } from 'next/router';
import { ProfileSidebar } from '../../components/profile/ProfileSidebar';
import { FeaturedPOAPs } from '../../components/profile/FeaturedPOAPs';
import { useWeb3Context } from '../../components/wallet/Web3ContextProvider';
import { FeaturedPOAPsProvider } from '../../components/profile/FeaturedPOAPsContext';
import { ProfileProvider } from '../../components/profile/ProfileContext';
import { truncateAddress } from '../../helpers';
import { BackgroundHexes } from '../../components/home/BackgroundHexes';
import { BREAKPOINTS } from '../../constants';
import { SEO } from '../../components/SEO';

const Background = styled(BackgroundHexes)`
  position: fixed;
  top: ${rem(50)};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 0;
  width: ${rem(1840)};
`;

const ProfileSidebarWrapper = styled(Grid.Col)`
  @media (max-width: ${BREAKPOINTS.lg}px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

type PageProps = {
  children: React.ReactNode;
  nameOrAddress: string;
};

const Profile: Page<PageProps> = (props) => {
  const router = useRouter();
  const [profileAddress, setProfileAddress] = useState<string | null>(null);
  const [ensName, setEnsName] = useState<string | null>(null);
  const { web3Provider, infuraProvider } = useWeb3Context();
  const nameOrAddress = router.query.id as string;

  /* This hook is used to set the address and/or ENS name resolved from the URL */
  useEffect(() => {
    const lookupName = async () => {
      if (isAddress(nameOrAddress)) {
        const profileAddress = nameOrAddress;
        setProfileAddress(profileAddress);
        const ensName = await infuraProvider?.lookupAddress(profileAddress);

        if (ensName) {
          setEnsName(ensName);
        } else {
          setEnsName(null);
        }
      } else if (nameOrAddress.includes('.eth')) {
        const name = nameOrAddress;
        const profileAddress = await infuraProvider?.resolveName(name);

        if (profileAddress) {
          setProfileAddress(profileAddress);
        }
        setEnsName(name);
      }
    };

    if (router.isReady) {
      lookupName();
    }
  }, [nameOrAddress, web3Provider, router, infuraProvider]);

  return (
    <>
      <SEO
        title={`${
          isAddress(props.nameOrAddress)
            ? truncateAddress(props.nameOrAddress ?? '', 4)
            : props.nameOrAddress
        } | GitPOAP`}
        description={
          'GitPOAP is a decentralized reputation platform that represents off-chain accomplishments and contributions on chain as POAPs.'
        }
        image={'https://gitpoap.io/og-image-512x512.png'}
        url={`https://gitpoap.io/p/${props.nameOrAddress}`}
      />
      {router.isReady && (!!profileAddress || !!ensName) && (
        <ProfileProvider address={profileAddress} ensName={ensName}>
          <FeaturedPOAPsProvider profileAddress={profileAddress} ensName={ensName}>
            <Grid justify="center" style={{ marginTop: rem(40), zIndex: 1 }}>
              <Background />
              <ProfileSidebarWrapper lg={2}>
                <ProfileSidebar address={profileAddress} ensName={ensName} />
              </ProfileSidebarWrapper>

              <Grid.Col lg={8} style={{ zIndex: 1 }}>
                <Grid justify="center">
                  <Grid.Col span={10} style={{ marginTop: rem(60) }}>
                    <FeaturedPOAPs />
                  </Grid.Col>
                  <Grid.Col span={10}>
                    <GitPOAPs address={nameOrAddress} />
                  </Grid.Col>
                  <Grid.Col span={10} style={{ marginBottom: rem(150) }}>
                    <AllPOAPs address={nameOrAddress} />
                  </Grid.Col>
                </Grid>
              </Grid.Col>
            </Grid>
          </FeaturedPOAPsProvider>
        </ProfileProvider>
      )}
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const ssrCache = ssrExchange({ isClient: false });
  const client = initUrqlClient(
    {
      url: `${process.env.NEXT_PUBLIC_GITPOAP_API_URL}/graphql`,
      exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
    },
    false,
  );
  const nameOrAddress = context.query.id as string;
  const _ = await client!
    .query<ProfileQuery, ProfileQueryVariables>(ProfileDocument, {
      address: nameOrAddress,
    })
    .toPromise();

  return {
    props: {
      // urqlState is a keyword here so withUrqlClient can pick it up.
      urqlState: ssrCache.extractData(),
      nameOrAddress,
      revalidate: 600,
    },
  };
}

/* Custom layout function for this page */
Profile.getLayout = (page: React.ReactNode) => {
  return <Layout>{page}</Layout>;
};

export default withUrqlClient(
  (_) => ({
    url: `${process.env.NEXT_PUBLIC_GITPOAP_API_URL}/graphql`,
  }),
  { ssr: false }, // Important so we don't wrap our component in getInitialProps
)(Profile);
