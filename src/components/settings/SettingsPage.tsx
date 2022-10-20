import React, { useEffect, useState } from 'react';
import { Stack, Divider, Group, Title, Box } from '@mantine/core';
import { rem } from 'polished';
import styled from 'styled-components';
import { useOAuthContext } from '../oauth/OAuthContext';
import { FaCheckCircle, FaRegEdit } from 'react-icons/fa';
import { GoMarkGithub } from 'react-icons/go';
import { useUser } from '../../hooks/useUser';
import { EmailConnection } from './EmailConnection';
import { useProfileContext } from '../profile/ProfileContext';
import {
  Button,
  Input as InputUI,
  Checkbox,
  Text,
  TextArea as TextAreaUI,
  Avatar,
  CopyableText,
} from '../shared/elements';
import { ExtraHover, ExtraPressed, TextGray, TextLight } from '../../colors';
import { isValidTwitterHandle, isValidURL } from '../../helpers';
import { useFeatures } from '../FeaturesContext';
import { Jazzicon } from '@ukstv/jazzicon-react';

const Header = styled.div`
  font-family: VT323;
  font-size: ${rem(48)};
  text-align: center;
  color: ${TextLight};
  line-height: normal;
`;

const Input = styled(InputUI)`
  flex: 1;
`;

const TextArea = styled(TextAreaUI)`
  flex: 1;
`;

const ConnectGithubAccount = styled(Text)`
  color: ${TextGray};
  font-size: ${rem(12)};
  line-height: 1.2;

  display: inline-flex;
  gap: ${rem(8)};
  transition: 150ms color ease;

  &:active {
    color: ${ExtraPressed};
    cursor: pointer;
  }

  &:hover:not(:active) {
    color: ${ExtraHover};
    cursor: pointer;
  }
`;

export const SettingsText = styled(Text)`
  padding-right: ${rem(30)};
`;

export const SettingsPage = () => {
  const { profileData, updateProfile, isSaveLoading, isSaveSuccessful } = useProfileContext();
  const { github } = useOAuthContext();
  const user = useUser();
  const { hasEmailVerification } = useFeatures();

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
    return null;
  }

  return (
    <Stack spacing={16} mb={32}>
      <Group>
        {user.ensAvatarImageUrl ? (
          <Avatar src={user.ensAvatarImageUrl} />
        ) : (
          <Jazzicon address={user.address} />
        )}
        <Stack spacing={8}>
          <Title order={3}>{user.ensName ?? user.address}</Title>
          <CopyableText text={user.address} textToCopy={user.address} />
        </Stack>
      </Group>

      {/* Wait until we're ready to release */}
      {hasEmailVerification && <EmailConnection />}

      <Group position="apart" p={16}>
        <Stack spacing={0}>
          <Group>
            <GoMarkGithub size={32} />
            <Title order={5}>GitHub</Title>
          </Group>
          {user.githubHandle && <Text size="xs">{`You're connected as ${user.githubHandle}`}</Text>}
        </Stack>
        <Button
          variant={user.capabilities.hasGithub ? 'outline' : 'filled'}
          onClick={user.capabilities.hasGithub ? github.disconnect : github.authorize}
        >
          {user.capabilities.hasGithub ? 'DISCONNECT' : 'CONNECT'}
        </Button>
      </Group>

      <Divider my={16} />

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

      <Box mb={rem(24)}>
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
      </Box>
    </Stack>
  );
};
