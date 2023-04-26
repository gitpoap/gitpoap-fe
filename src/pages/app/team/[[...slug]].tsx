import Head from 'next/head';
import { useRouter } from 'next/router';
import { Login } from '../../../components/Login';
import { TableLoader } from '../../../components/shared/elements/Table';
import { TeamContainer, TeamRoutes } from '../../../components/team';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { NextPageWithLayout } from '../../_app';

const TeamPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { ready, user } = useAuthContext();

  const slug = (router.query.slug as string[]) || [];

  if (slug[0] && !Object.values<string>(TeamRoutes).includes(slug[0])) {
    void router.push('/app/team', undefined, { shallow: true });
  }

  const page = slug[0] ?? TeamRoutes.Dashboard;

  return (
    <>
      <Head>
        <title>{'Team Dashboard | GitPOAP'}</title>
        <meta
          name="Team Dashboard on GitPOAP - a decentralized reputation platform that represents off-chain accomplishments and contributions on chain as POAPs."
          content="Manage GiPOAPs"
        />
      </Head>
      {user ? <TeamContainer page={page as TeamRoutes} /> : ready ? <Login /> : <TableLoader />}
    </>
  );
};

export default TeamPage;
