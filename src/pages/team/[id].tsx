import { NextPageWithLayout } from '../_app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Login } from '../../components/Login';
import { TeamContainer } from '../../components/team';
import { useUser } from '../../hooks/useUser';
import Custom404 from '../404';

const TeamPage: NextPageWithLayout = () => {
  const user = useUser();
  const router = useRouter();
  const { id } = router.query;

  if (typeof id !== 'string') {
    return <></>;
  }

  const teamId = parseInt(id);

  if (isNaN(teamId)) {
    return <Custom404 />;
  }

  return (
    <>
      <Head>
        <title>{'Team Dashboard | GitPOAP'}</title>
        <meta
          name="Team Dashboard on GitPOAP - a decentralized reputation platform that represents off-chain accomplishments and contributions on chain as POAPs."
          content="Manage GiPOAPs"
        />
      </Head>
      {user?.permissions.isStaff ? <TeamContainer teamId={teamId} user={user} /> : <Login />}
    </>
  );
};

export default TeamPage;
