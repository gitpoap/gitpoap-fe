import { rem } from 'polished';
import type { NextPage } from 'next';
import Head from 'next/head';
import { SubmitReposForm } from '../../components/SubmitReposForm';
import { Container } from '@mantine/core';

const SubmitRepos: NextPage = () => {
  return (
    <div>
      <Head>
        <title>{'Submit Repos | GitPOAP'}</title>
        <meta name="description" content="Submit Repos" />
      </Head>
      <Container size={800} mt="xl">
        <SubmitReposForm />
      </Container>
    </div>
  );
};

export default SubmitRepos;
