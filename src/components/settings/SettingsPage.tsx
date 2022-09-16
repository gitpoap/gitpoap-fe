import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { Button, Input as InputUI, Checkbox } from '../shared/elements';
import { TextArea as TextAreaUI } from '../shared/elements/TextArea';
import { Text } from '../shared/elements/Text';
import { Stack, Divider, Group, Title } from '@mantine/core';
import { ExtraHover, ExtraPressed, TextGray, TextLight } from '../../colors';
import { useAuthContext } from '../github/AuthContext';
import { FaCheckCircle, FaRegEdit } from 'react-icons/fa';
import { isValidGithubHandle, isValidTwitterHandle, isValidURL } from '../../helpers';
import { ProfileQuery, useProfileQuery } from '../../graphql/generated-gql';
import { useProfileContext } from '../profile/ProfileContext';
import { GoMarkGithub } from 'react-icons/go';

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
  profileData: ProfileQuery['profileData'];
  refetch: ReturnType<typeof useProfileQuery>[1];
};

export type EditableProfileData = Partial<
  Pick<
    Exclude<ProfileQuery['profileData'], null | undefined>,
    'bio' | 'githubHandle' | 'personalSiteUrl' | 'twitterHandle' | 'isVisibleOnLeaderboard'
  >
>;

export const SettingsPage = () => {
  const { profileData, updateProfile, isSaveLoading, isSaveSuccessful } = useProfileContext();
  const { authorizeGitHub, handleLogout, isLoggedIntoGitHub, user } = useAuthContext();

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
    console.log(profileData);
  }, [profileData]);

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
          isLoggedIntoGitHub && (
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
      <Group position="apart" p={16}>
        <Group>
          <GoMarkGithub size={32} />
          <Title order={5}>GitHub</Title>
        </Group>
        <Button
          variant={isLoggedIntoGitHub ? 'outline' : 'filled'}
          onClick={isLoggedIntoGitHub ? handleLogout : authorizeGitHub}
        >
          {isLoggedIntoGitHub ? 'DISCONNECT' : 'CONNECT'}
        </Button>
      </Group>
    </Stack>
  );
};
