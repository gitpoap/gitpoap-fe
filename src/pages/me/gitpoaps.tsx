import { Page } from '../_app';
import { SEO } from '../../components/shared/compounds/SEO';
import { UserGitPOAPRequestPage } from '../../components/request/UserGitPOAPRequestPage';
import { Login } from '../../components/Login';
import { useUser } from '../../hooks/useUser';

const UserGitPOAPs: Page = () => {
  const user = useUser();
  const address = user?.address;

  return (
    <>
      <SEO
        title={`My GitPOAPs | GitPOAP`}
        description={`GitPOAP - a decentralized reputation platform that represents off-chain accomplishments and contributions on chain as POAPs.`}
        image={'https://gitpoap.io/og-image-512x512.png'}
        url={`https://gitpoap.io/settings`}
      />
      {address ? <UserGitPOAPRequestPage /> : <Login />}
    </>
  );
};

export default UserGitPOAPs;
