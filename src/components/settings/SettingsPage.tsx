import React, { useEffect, useState } from 'react';
import { Stack, Divider, Group, Title, Box } from '@mantine/core';
import { useRouter } from 'next/router';
import { rem } from 'polished';
import styled from 'styled-components';
import { useOAuthContext } from '../oauth/OAuthContext';
import { FaCheckCircle } from 'react-icons/fa';
import { GoMarkGithub } from 'react-icons/go';
import { useUser } from '../../hooks/useUser';
import { EmailConnection } from './EmailConnection';
import { useProfileContext } from '../profile/ProfileContext';
import {
  Button,
  Input as InputUI,
  Checkbox,
  Header,
  Text,
  TextArea as TextAreaUI,
} from '../shared/elements';
import { isValidTwitterHandle, isValidURL } from '../../helpers';
import { useFeatures } from '../FeaturesContext';
import { Link } from '../shared/compounds/Link';

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
  const { github } = useOAuthContext();
  const user = useUser();
  const { hasEmailVerification } = useFeatures();
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
    return <></>;
  }

  return (
    <Stack spacing={16} mb={32}>
      <Header style={{ textAlign: 'left' }}>{'User Settings'}</Header>
      <Text>{'Here you can manage your profile data and GitHub account connection.'}</Text>
      <Divider mb={32} />

      <Group position="apart" my={4}>
        <Group>
          <GoMarkGithub size={32} />
          <Stack spacing={0}>
            <Title order={5}>GitHub</Title>
            {user.githubHandle && (
              <Text size="xs">
                {`You're connected as `}
                <Link href={`https://github.com/${user.githubHandle}`} passHref>
                  <b>{`@${user.githubHandle}`}</b>
                </Link>
              </Text>
            )}
          </Stack>
        </Group>
        <Button
          variant={user.capabilities.hasGithub ? 'outline' : 'filled'}
          onClick={user.capabilities.hasGithub ? github.disconnect : github.authorize}
        >
          {user.capabilities.hasGithub ? 'DISCONNECT' : 'CONNECT'}
        </Button>
      </Group>

      {/* Wait until we're ready to release */}
      {hasEmailVerification && <EmailConnection />}

      <Divider my={32} />

      <Input
        placeholder="gitpoap"
        label={'Twitter Handle'}
        value={twitterHandleValue ?? ''}
        onChange={(e) => setTwitterHandleValue(e.target.value)}
        error={twitterHandleValue && !isValidTwitterHandle(twitterHandleValue)}
      />

      <Input
        placeholder="https://gitpoap.io"
        label={'Website Url'}
        value={personSiteUrlValue ?? ''}
        onChange={(e) => setPersonalSiteUrlValue(e.target.value)}
        error={personSiteUrlValue && !isValidURL(personSiteUrlValue)}
      />

      <TextArea
        placeholder="web3 developer, aspiring dao contributor"
        label={'Profile Bio'}
        value={bioValue ?? ''}
        onChange={(e) => setBioValue(e.target.value)}
        autosize
        minRows={4}
        maxRows={4}
      />

      <Checkbox
        label={'Is visible on leaderboard?'}
        checked={isVisibleOnLeaderboardValue ?? false}
        onChange={(e) => setIsVisibleOnLeaderboardValue(e.target.checked)}
      />

      <Box my={rem(24)}>
        <Group position="left">
          <Button
            onClick={() =>
              updateProfile({
                twitterHandle: twitterHandleValue,
                bio: bioValue,
                personalSiteUrl: personSiteUrlValue,
                isVisibleOnLeaderboard: isVisibleOnLeaderboardValue,
              })
            }
            disabled={!haveChangesBeenMade}
            loading={isSaveLoading}
            style={{ minWidth: rem(100) }}
            leftIcon={
              !haveChangesBeenMade && isSaveSuccessful ? <FaCheckCircle size={18} /> : undefined
            }
          >
            {'Save'}
          </Button>
          <Button onClick={() => router.push(`/p/${user.ensName ?? user.address}`)}>
            {'Visit Profile'}
          </Button>
        </Group>
      </Box>
    </Stack>
  );
};
