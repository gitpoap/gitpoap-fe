import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Page } from '../../_app';
import { VerifyEmail } from '../../../components/verify/VerifyEmail';

const Search: Page = () => {
  const router = useRouter();
  const token = router.query.token as string;

  return (
    <>
      <Head>
        <title>{`Verify Email | GitPOAP`}</title>
        <meta
          name="GitPOAP is a decentralized reputation platform that represents off-chain accomplishments and contributions on chain as POAPs."
          content="GitPOAP Email Verification"
        />
      </Head>
      <VerifyEmail token={token} />
    </>
  );
};

export default Search;
