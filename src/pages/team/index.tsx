import type { NextPage } from 'next';
import Head from 'next/head';
import { Login } from '../../components/Login';
import { TeamDashboard } from '../../components/team/TeamDashboard';
import { useUser } from '../../hooks/useUser';

const TeamPage: NextPage = () => {
  const user = useUser();
  const address = user?.address;

  return (
    <>
      <Head>
        <title>{'Team Dashboard | GitPOAP'}</title>
        <meta
          name="Team Dashboard on GitPOAP - a decentralized reputation platform that represents off-chain accomplishments and contributions on chain as POAPs."
          content="Manage GiPOAPs"
        />
      </Head>
      {address ? <TeamDashboard user={user} /> : <Login />}
    </>
  );
};

export default TeamPage;
