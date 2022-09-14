import { Page } from '../_app';
import { SEO } from '../../components/SEO';
import { SettingsPage } from '../../components/settings/SettingsPage';
import { useWeb3Context } from '../../components/wallet/Web3ContextProvider';
import { useProfileQuery } from '../../graphql/generated-gql';
import styled from 'styled-components';
import { Container } from '@mantine/core';

const Wrapper = styled(Container)`
  width: 100vw;
`;

const Settings: Page = () => {
  const { address } = useWeb3Context();

  const [result, refetch] = useProfileQuery({
    variables: {
      address: address ?? '',
    },
  });

  const profileData = result?.data?.profileData;

  return (
    <Wrapper size={600} my={48}>
      <SEO
        title={`Your Profile | GitPOAP`}
        description={`GitPOAP - a decentralized reputation platform that represents off-chain accomplishments and contributions on chain as POAPs.`}
        image={'https://gitpoap.io/og-image-512x512.png'}
        url={`https://gitpoap.io/settings`}
      />
      <SettingsPage profileData={profileData} refetch={refetch} />
    </Wrapper>
  );
};

export default Settings;
