import React, { useEffect, useState } from 'react';
import { Stack, Divider, Group, Box, Tooltip, Alert } from '@mantine/core';
import { usePrivy } from '@privy-io/react-auth';
import { useRouter } from 'next/router';
import { rem } from 'polished';
import styled from 'styled-components';
import { FaCheckCircle, FaEthereum, FaDiscord, FaGithub } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useProfileContext } from '../profile/ProfileContext';
import {
  Button,
  Input as InputUI,
  Checkbox,
  Header,
  Text,
  TextArea as TextAreaUI,
} from '../shared/elements';
import { isValidTwitterHandle, isValidURL, shortenAddress } from '../../helpers';
import { Login } from '../Login';
import { AccountConnection } from './AccountConnection';
import { trackClickSaveUserSettings } from '../../lib/tracking/events';
import { Link } from '../shared/compounds/Link';
import { AiOutlineExclamation } from 'react-icons/ai';

const Input = styled(InputUI)`
  flex: 1;
`;

const TextArea = styled(TextAreaUI)`
  flex: 1;
`;

export const SettingsText = styled(Text)`
  padding-right: ${rem(30)};
`;

export const SettingsPage = () => {
  const { profileData, updateProfile, isSaveLoading, isSaveSuccessful } = useProfileContext();
  const {
    linkWallet,
    unlinkWallet,
    linkEmail,
    unlinkEmail,
    linkDiscord,
    unlinkDiscord,
    linkGithub,
    unlinkGithub,
  } = usePrivy();
  const { user } = useAuthContext();
  const router = useRouter();

  const [personSiteUrlValue, setPersonalSiteUrlValue] = useState<string | undefined | null>(
    profileData?.personalSiteUrl,
  );
  const [bioValue, setBioValue] = useState<string | undefined | null>(profileData?.bio);
  const [twitterHandleValue, setTwitterHandleValue] = useState<string | undefined | null>(
    profileData?.twitterHandle,
  );
  const [isVisibleOnLeaderboardValue, setIsVisibleOnLeaderboardValue] = useState<
    boolean | undefined
  >(profileData?.isVisibleOnLeaderboard);

  const [haveChangesBeenMade, setHaveChangesBeenMade] = useState<boolean>(false);

  useEffect(() => {
    setPersonalSiteUrlValue(profileData?.personalSiteUrl);
  }, [profileData?.personalSiteUrl]);

  useEffect(() => {
    setBioValue(profileData?.bio);
  }, [profileData?.bio]);

  useEffect(() => {
    setTwitterHandleValue(profileData?.twitterHandle);
  }, [profileData?.twitterHandle]);

  useEffect(() => {
    setIsVisibleOnLeaderboardValue(profileData?.isVisibleOnLeaderboard);
  }, [profileData?.isVisibleOnLeaderboard]);

  useEffect(() => {
    setHaveChangesBeenMade(
      profileData?.personalSiteUrl !== personSiteUrlValue ||
        profileData?.bio !== bioValue ||
        profileData?.twitterHandle !== twitterHandleValue ||
        profileData?.isVisibleOnLeaderboard !== isVisibleOnLeaderboardValue,
    );
  }, [profileData, personSiteUrlValue, bioValue, twitterHandleValue, isVisibleOnLeaderboardValue]);

  if (!user) {
    return <Login />;
  }

  return (
    <Stack spacing={16} mb={32}>
      <Header style={{ textAlign: 'left' }}>{'User Settings'}</Header>
      <Text>{'Manage your profile data and account connections.'}</Text>

      <Divider mb={32} />
      <AccountConnection
        accountValue={user.address}
        label={'Ethereum'}
        icon={<FaEthereum size={32} />}
        customAccountLink={
          <Link href={`https://etherscan.io/address/${user.address}`} passHref>
            {user?.ensName ? (
              <Tooltip
                label={user.address}
                multiline
                withArrow
                transition="fade"
                position="top"
                sx={{ textAlign: 'center', maxWidth: rem(450) }}
              >
                <b>{`${user.ensName}`}</b>
              </Tooltip>
            ) : (
              <b>{`${shortenAddress(user.address ?? '')}`}</b>
            )}
          </Link>
        }
        requiredConnection={!user.emailAddress}
        linkAccount={linkWallet}
        unlinkAccount={unlinkWallet}
      />
      <AccountConnection
        accountValue={user.emailAddress}
        label={'Email'}
        icon={<HiOutlineMail size={32} />}
        requiredConnection={!user.address}
        linkAccount={linkEmail}
        unlinkAccount={unlinkEmail}
      />
      <AccountConnection
        accountValue={user.githubHandle}
        label={'GitHub'}
        icon={<FaGithub size={32} />}
        customAccountLink={
          <Link href={`https://github.com/${user.githubHandle}`} passHref>
            <b>{`@${user.githubHandle}`}</b>
          </Link>
        }
        linkAccount={linkGithub}
        unlinkAccount={unlinkGithub}
      />
      <AccountConnection
        accountValue={user.discordHandle}
        label={'Discord'}
        icon={<FaDiscord size={32} />}
        linkAccount={linkDiscord}
        unlinkAccount={unlinkDiscord}
      />

      <Divider mt={32} />

      <Header style={{ textAlign: 'left' }}>{'Public Profile'}</Header>
      {!user.address && (
        <Alert color="red" icon={<AiOutlineExclamation />} variant="outline">
          <Text color="red">{'Connect a wallet to create a profile page'}</Text>
        </Alert>
      )}

      <Input
        placeholder="gitpoap"
        label={'Twitter Handle'}
        value={twitterHandleValue ?? ''}
        onChange={(e) => setTwitterHandleValue(e.target.value)}
        error={twitterHandleValue && !isValidTwitterHandle(twitterHandleValue)}
        disabled={!user.address}
      />

      <Input
        placeholder="https://gitpoap.io"
        label={'Website Url'}
        value={personSiteUrlValue ?? ''}
        onChange={(e) => setPersonalSiteUrlValue(e.target.value)}
        error={personSiteUrlValue && !isValidURL(personSiteUrlValue)}
        disabled={!user.address}
      />

      <TextArea
        placeholder="web3 developer, aspiring dao contributor"
        label={'Profile Bio'}
        value={bioValue ?? ''}
        onChange={(e) => setBioValue(e.target.value)}
        autosize
        minRows={4}
        maxRows={4}
        disabled={!user.address}
      />

      <Checkbox
        label={'Is visible on leaderboard?'}
        checked={isVisibleOnLeaderboardValue ?? false}
        disabled={!user.address}
        onChange={(e) => setIsVisibleOnLeaderboardValue(e.target.checked)}
      />

      <Box my={rem(24)}>
        <Group position="left">
          <Button
            onClick={() => {
              trackClickSaveUserSettings();
              updateProfile({
                twitterHandle: twitterHandleValue,
                bio: bioValue,
                personalSiteUrl: personSiteUrlValue,
                isVisibleOnLeaderboard: isVisibleOnLeaderboardValue,
              });
            }}
            disabled={!haveChangesBeenMade}
            loading={isSaveLoading}
            style={{ minWidth: rem(100) }}
            leftIcon={
              !haveChangesBeenMade && isSaveSuccessful ? <FaCheckCircle size={18} /> : undefined
            }
          >
            {'Save'}
          </Button>
          <Button
            disabled={!user.address}
            onClick={() => router.push(`/p/${user.ensName ?? user.address}`)}
          >
            {'Visit Profile'}
          </Button>
        </Group>
      </Box>
    </Stack>
  );
};
