import React, { useEffect, useState } from 'react';
import { Stack, Divider, Group, Title } from '@mantine/core';
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
} from '../shared/elements';
import { ExtraHover, ExtraPressed, TextGray, TextLight } from '../../colors';
import { isValidGithubHandle, isValidTwitterHandle, isValidURL } from '../../helpers';
import { ProfileQuery } from '../../graphql/generated-gql';

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

type Props = {
  ethAddress: string;
};

export const SettingsPage = ({ ethAddress }: Props) => {
  const { profileData, updateProfile, isSaveLoading, isSaveSuccessful } = useProfileContext();
  const { github } = useOAuthContext();
  const user = useUser();

  const [personSiteUrlValue, setPersonalSiteUrlValue] = useState<string | undefined | null>(
    profileData?.personalSiteUrl,
  );
  const [bioValue, setBioValue] = useState<string | undefined | null>(profileData?.bio);
  const [githubHandleValue, setGithubHandleValue] = useState<string | undefined | null>(
    profileData?.githubHandle,
  );
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
    setGithubHandleValue(profileData?.githubHandle);
  }, [profileData?.githubHandle]);

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
        profileData?.githubHandle !== githubHandleValue ||
        profileData?.twitterHandle !== twitterHandleValue ||
        profileData?.isVisibleOnLeaderboard !== isVisibleOnLeaderboardValue,
    );
  }, [
    profileData,
    personSiteUrlValue,
    bioValue,
    githubHandleValue,
    twitterHandleValue,
    isVisibleOnLeaderboardValue,
  ]);

  return (
    <Stack spacing={16} mb={32}>
      <Header id="settings" style={{ textAlign: 'left' }}>
        {'Settings'}
      </Header>
      <Divider />
      <Input
        placeholder="gitpoap"
        label={'GitHub Handle'}
        description={
          user?.capabilities.hasGithub && (
            <ConnectGithubAccount onClick={() => setGithubHandleValue(user?.githubHandle)}>
              <FaRegEdit />
              {' Use the currently authenticated GitHub account'}
            </ConnectGithubAccount>
          )
        }
        value={githubHandleValue ?? ''}
        onChange={(e) => setGithubHandleValue(e.target.value)}
        error={githubHandleValue && !isValidGithubHandle(githubHandleValue)}
      />

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

      <div>
        <Button
          onClick={() =>
            updateProfile({
              twitterHandle: twitterHandleValue,
              bio: bioValue,
              personalSiteUrl: personSiteUrlValue,
              githubHandle: githubHandleValue,
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
      </div>

      <Header id="integrations" style={{ marginTop: rem(24), textAlign: 'left' }}>
        {'Integrations'}
      </Header>

      <Divider />
      <EmailConnection />

      <Divider />
      <Group position="apart" p={16}>
        <Group>
          <GoMarkGithub size={32} />
          <Title order={5}>GitHub</Title>
        </Group>
        <Button
          variant={user?.capabilities.hasGithub ? 'outline' : 'filled'}
          onClick={user?.capabilities.hasGithub ? github.disconnect : github.authorize}
        >
          {user?.capabilities.hasGithub ? 'DISCONNECT' : 'CONNECT'}
        </Button>
      </Group>
    </Stack>
  );
};
