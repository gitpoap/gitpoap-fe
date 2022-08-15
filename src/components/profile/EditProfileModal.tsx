import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { Modal, Center } from '@mantine/core';
import { BackgroundPanel, BackgroundPanel2, TextLight } from '../../colors';
import { Button, Input as InputUI, Checkbox } from '../shared/elements';
import { TextArea as TextAreaUI } from '../shared/elements/TextArea';
import { Text } from '../shared/elements/Text';
import { ExtraHover, ExtraPressed, MidnightBlue, TextGray } from '../../colors';
import { EditableProfileData, useProfileContext } from './ProfileContext';
import { isValidGithubHandle, isValidTwitterHandle, isValidURL } from '../../helpers';
import { FaCheckCircle, FaRegEdit } from 'react-icons/fa';
import { useAuthContext } from '../github/AuthContext';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  bio?: string | null;
  githubHandle?: string | null;
  twitterHandle?: string | null;
  isVisibleOnLeaderboard?: boolean;
  personalSiteUrl?: string | null;
  onClickSave: (newProfileData: EditableProfileData) => void;
  isSaveLoading: boolean;
};

const StyledModal = styled(Modal)`
  .mantine-Modal-modal {
    background-color: ${BackgroundPanel};
  }
`;

const Content = styled(Center)`
  flex-direction: column;
  padding: ${rem(30)} ${rem(70)};
`;

const Header = styled.div`
  font-family: VT323;
  font-size: ${rem(48)};
  text-align: center;
  color: ${TextLight};
`;

const ProfileFields = styled.div`
  background-color: ${MidnightBlue};
  padding: ${rem(30)} ${rem(70)};
  border: ${rem(1)} solid ${BackgroundPanel2};
  border-radius: ${rem(10)};
  margin-bottom: ${rem(30)};
  min-width: ${rem(600)};
`;

const SettingSection = styled.div`
  display: flex;
  margin-bottom: ${rem(30)};
`;

const GithubHandle = styled(SettingSection)``;
const TwitterHandle = styled(SettingSection)``;
const PersonalWebsite = styled(SettingSection)``;
const LeaderboardVisibility = styled(SettingSection)``;

const ProfileBio = styled.div`
  display: flex;
  margin-bottom: ${rem(30)};
`;

const Input = styled(InputUI)`
  flex: 1;
`;

const TextArea = styled(TextAreaUI)`
  flex: 1;
`;

const ConnectGithubAccount = styled(Text)`
  color: ${TextGray};
  font-size: 12px;
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

export const EditProfileModal = ({
  isOpen,
  onClose,
  githubHandle,
  twitterHandle,
  isVisibleOnLeaderboard,
  bio,
  personalSiteUrl,
  onClickSave,
  isSaveLoading,
}: Props) => {
  const { isLoggedIntoGitHub, user } = useAuthContext();
  const { isSaveSuccessful } = useProfileContext();
  const [personSiteUrlValue, setPersonalSiteUrlValue] =
    useState<string | undefined | null>(personalSiteUrl);
  const [bioValue, setBioValue] = useState<string | undefined | null>(bio);
  const [githubHandleValue, setGithubHandleValue] =
    useState<string | undefined | null>(githubHandle);
  const [twitterHandleValue, setTwitterHandleValue] =
    useState<string | undefined | null>(twitterHandle);
  const [isVisibleOnLeaderboardValue, setIsVisibleOnLeaderboardValue] =
    useState<boolean | undefined>(isVisibleOnLeaderboard);

  useEffect(() => {
    setPersonalSiteUrlValue(personalSiteUrl);
  }, [personalSiteUrl]);

  useEffect(() => {
    setBioValue(bio);
  }, [bio]);

  useEffect(() => {
    setGithubHandleValue(githubHandle);
  }, [githubHandle]);

  useEffect(() => {
    setTwitterHandleValue(twitterHandle);
  }, [twitterHandle]);

  useEffect(() => {
    setIsVisibleOnLeaderboardValue(isVisibleOnLeaderboard);
  }, [isVisibleOnLeaderboard]);

  return (
    <StyledModal
      onClose={onClose}
      opened={isOpen}
      centered
      size="xl"
      closeButtonLabel="Close the edit profile modal"
    >
      <Content>
        <Header style={{ marginBottom: rem(30) }}>{'Edit profile'}</Header>
        <ProfileFields>
          <GithubHandle>
            <Input
              placeholder="gitpoap"
              label={'GitHub Handle'}
              description={
                isLoggedIntoGitHub && (
                  <ConnectGithubAccount onClick={() => setGithubHandleValue(user?.githubHandle)}>
                    <FaRegEdit />
                    {' Use the currently authenticated github account'}
                  </ConnectGithubAccount>
                )
              }
              value={githubHandleValue ?? ''}
              onChange={(e) => setGithubHandleValue(e.target.value)}
              error={githubHandleValue && !isValidGithubHandle(githubHandleValue)}
            />
          </GithubHandle>

          <TwitterHandle>
            <Input
              placeholder="gitpoap"
              label={'Twitter Handle'}
              value={twitterHandleValue ?? ''}
              onChange={(e) => setTwitterHandleValue(e.target.value)}
              error={twitterHandleValue && !isValidTwitterHandle(twitterHandleValue)}
            />
          </TwitterHandle>

          <PersonalWebsite>
            <Input
              placeholder="https://gitpoap.io"
              label={'Website Url'}
              value={personSiteUrlValue ?? ''}
              onChange={(e) => setPersonalSiteUrlValue(e.target.value)}
              error={personSiteUrlValue && !isValidURL(personSiteUrlValue)}
            />
          </PersonalWebsite>
          <ProfileBio>
            <TextArea
              placeholder="web3 developer, aspiring dao contributor"
              label={'Profile Bio'}
              value={bioValue ?? ''}
              onChange={(e) => setBioValue(e.target.value)}
              autosize
              minRows={4}
              maxRows={4}
            />
          </ProfileBio>
          <LeaderboardVisibility>
            <Checkbox
              label={'Is visible on leaderboard?'}
              checked={isVisibleOnLeaderboardValue ?? false}
              onChange={(e) => setIsVisibleOnLeaderboardValue(e.target.checked)}
            />
          </LeaderboardVisibility>
        </ProfileFields>

        <Button
          onClick={() =>
            onClickSave({
              twitterHandle: twitterHandleValue,
              bio: bioValue,
              personalSiteUrl: personSiteUrlValue,
              githubHandle: githubHandleValue,
              isVisibleOnLeaderboard: isVisibleOnLeaderboardValue,
            })
          }
          loading={isSaveLoading}
          style={{ minWidth: rem(100) }}
          leftIcon={isSaveSuccessful ? <FaCheckCircle size={18} /> : undefined}
        >
          {'Save'}
        </Button>
      </Content>
    </StyledModal>
  );
};
