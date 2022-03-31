import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { Radio, InputWrapper as InputWrapperUI } from '@mantine/core';
import { validate } from 'email-validator';
import { BackgroundPanel2, TextAccent } from '../../colors';
import { Input, TextInputLabelStyles } from '../shared/elements/Input';
import { Button } from '../shared/elements/Button';
import { BREAKPOINTS, GITPOAP_API_URL } from '../../constants';
import { RadioGroup } from '../shared/elements/Radio';
import { Header } from '../shared/elements/Header';
import { Text } from '../shared/elements/Text';

enum UserType {
  Contributor = 'Contributor',
  Owner = 'Owner',
}

type SuggestionFormData = {
  email: string;
  repoUrl: string;
  userType: UserType;
};

const FormContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  max-width: ${rem(525)};
  padding: ${rem(10)};
`;

const FormContent = styled.form`
  display: inline-flex;
  flex-direction: column;
  padding: ${rem(30)};

  border: ${rem(1)} solid ${BackgroundPanel2};
  box-sizing: border-box;
  border-radius: ${rem(10)};

  @media (max-width: ${BREAKPOINTS.sm}px) {
    padding: ${rem(32)} ${rem(16)} ${rem(48)};
    width: 100%;
  }
`;

const FormStatus = styled.div`
  min-height: ${rem(10)};
  font-style: normal;
  font-weight: 400;
  font-size: ${rem(16)};
  line-height: ${rem(19)};
  color: ${TextAccent};
  margin-bottom: ${rem(10)};
  margin-top: ${rem(5)};
`;

const InputWrapper = styled(InputWrapperUI)`
  .mantine-InputWrapper-label {
    ${TextInputLabelStyles};
  }
`;

const RepoUrlInput = styled(Input)`
  width: 100%;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    min-width: 100%;
  }
`;

const UserTypeSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${rem(32)};

  @media (max-width: ${BREAKPOINTS.sm}px) {
    margin-bottom: ${rem(16)};
  }
`;

const RepoUrlSection = styled.div`
  display: flex;
  margin-bottom: ${rem(30)};
  width: 100%;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    margin-bottom: ${rem(16)};
  }
`;

const Email = styled.div`
  display: flex;
  margin-bottom: ${rem(40)};

  @media (max-width: ${BREAKPOINTS.sm}px) {
    margin-bottom: ${rem(32)};
  }
`;

const EmailInput = styled(Input)`
  min-width: ${rem(400)};
  flex: 1;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    min-width: 100%;
  }
`;

const SubmitButton = styled(Button)`
  width: 100%;
`;

const SubmitContainer = styled.div`
  position: relative;
  align-self: center;
`;

const FormStatusStyled = styled(FormStatus)`
  position: absolute;
`;

export const SuggestionForm = () => {
  const [repoUrl, setRepoURL] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [userType, setUserType] = useState<UserType | undefined>();
  const [formStatus, setFormStatus] = useState<string>('');

  /* Regex for matching github.com/blah */
  const repoUrlRegex = new RegExp(
    /(http(s)?:\/\/.)?(www\.)?github.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)\/[-a-zA-Z0-9@:%._\+~#=]{1,256}/,
  );

  const isRepoUrlValid = repoUrl.match(repoUrlRegex) !== null;
  const isFormEmpty = email.length === 0 && repoUrl.length === 0 && userType === null;
  const isFormValid = validate(email) && userType !== null && isRepoUrlValid;

  const submitForm = useCallback(async () => {
    try {
      if (email && repoUrl && userType) {
        const resJwt = await fetch(`${GITPOAP_API_URL}/jwt/`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });
        const data = await (resJwt.json() as Promise<{ access_token: string }>);
        const formData: SuggestionFormData = {
          email,
          repoUrl,
          userType,
        };

        await fetch(`${GITPOAP_API_URL}/suggest`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${data.access_token}`,
          },
          method: 'POST',
          body: JSON.stringify(formData),
        });
        setEmail('');
        setRepoURL('');
        setUserType(undefined);
        setFormStatus('Thanks! Repo submitted.');
      }
    } catch (e) {
      console.warn(e);
      setFormStatus('Submission was unsuccessful.');
    }
  }, [email, repoUrl, userType]);

  /* This hook sets a timeout that causes the form status bar to disappear */
  useEffect(() => {
    if (formStatus.length > 0) {
      setTimeout(() => setFormStatus(''), 5000);
    }
  }, [formStatus]);

  return (
    <FormContainer id="suggest">
      <Header style={{ marginBottom: rem(24) }}>{'Want to suggest a project?'}</Header>
      <Text style={{ marginBottom: rem(32) }}>
        {'Suggest any project that you would like to see supported on GitPOAP.'}
      </Text>
      <FormContent>
        <RepoUrlSection>
          <RepoUrlInput
            value={repoUrl}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRepoURL(e.target.value)}
            placeholder="github.com/stake-house/wagyu"
            error={repoUrl.length > 3 && repoUrl.match(repoUrlRegex) === null}
            label="GitHub Repo URL"
          />
        </RepoUrlSection>

        <UserTypeSection>
          <InputWrapper label={'I am a..'}>
            <RadioGroup value={userType} onChange={(value: UserType) => setUserType(value)}>
              <Radio value={UserType.Contributor} label={'Contributor'} />
              <Radio value={UserType.Owner} label={'Repo owner'} />
            </RadioGroup>
          </InputWrapper>
        </UserTypeSection>

        <Email>
          <EmailInput
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            placeholder="Email"
            error={!(validate(email) || email.length < 3)}
            label="Your Email"
          />
        </Email>
        <SubmitContainer>
          <SubmitButton
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              if (isFormValid) {
                submitForm();
              }
            }}
            disabled={!(isFormValid || isFormEmpty)}
          >
            {'Submit'}
          </SubmitButton>
          <FormStatusStyled>{formStatus}</FormStatusStyled>
        </SubmitContainer>
      </FormContent>
    </FormContainer>
  );
};
