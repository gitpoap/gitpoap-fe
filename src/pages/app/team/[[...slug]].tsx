import { NextPageWithLayout } from '../../_app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Login } from '../../../components/Login';
import { TeamContainer, TeamRoutes } from '../../../components/team';
import { useUser } from '../../../hooks/useUser';

const TeamPage: NextPageWithLayout = () => {
  const router = useRouter();
  const user = useUser();

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
      {user?.permissions.isStaff ? (
        <TeamContainer page={page as TeamRoutes} user={user} />
      ) : (
        <Login />
      )}
    </>
  );
};

export default TeamPage;
