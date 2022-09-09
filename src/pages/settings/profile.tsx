import { Page } from '../_app';
import { SEO } from '../../components/SEO';
import { ProfileSettings } from '../../components/settings/Profile';
import { SettingsPageLayout } from '../../components/settings/SettingsPageLayout';
import { useWeb3Context } from '../../components/wallet/Web3ContextProvider';
import { useProfileQuery } from '../../graphql/generated-gql';

const Settings: Page = () => {
  const { address } = useWeb3Context();

  const [result, refetch] = useProfileQuery({
    variables: {
      address: address ?? '',
    },
  });

  const profileData = result?.data?.profileData;

  return (
    <>
      <SEO
        title={`Your Profile | GitPOAP`}
        description={`GitPOAP - a decentralized reputation platform that represents off-chain accomplishments and contributions on chain as POAPs.`}
        image={'https://gitpoap.io/og-image-512x512.png'}
        url={`https://gitpoap.io/settings`}
      />
      <ProfileSettings profileData={profileData} refetch={refetch} />
    </>
  );
};

/* Custom layout function for this page */
Settings.getLayout = SettingsPageLayout;

export default Settings;
