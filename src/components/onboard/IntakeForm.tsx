import { useMemo, useState } from 'react';
import { HiOutlineMailOpen } from 'react-icons/hi';
import { Container, Group, Stepper } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { rem } from 'polished';
import styled from 'styled-components';
import useSWR from 'swr';

import { BackgroundPanel, ExtraHover, PrimaryBlue } from '../../colors';
import { fetchWithToken } from '../../helpers';
import { Link } from '../Link';
import { Button, Loader, Text } from '../shared/elements';
import { GitHub, GitPOAP } from '../shared/elements/icons';
import { Completed } from './Completed';
import { ContactDetails } from './ContactDetails';
import { SelectReposList } from './SelectRepos';
import { Repo } from './types';
import { UploadDesigns } from './UploadDesigns';
import useMantineForm from './useMantineForm';

export const StyledLink = styled(Link)`
  color: ${PrimaryBlue};
  &:hover {
    text-decoration: underline;
    &:not(:active) {
      color: ${ExtraHover};
    }
  }
`;

const StyledLoader = styled(Loader)`
  display: block;
  margin: ${rem(112)} auto;
`;

const StyledStepper = styled(Stepper)`
  .mantine-Stepper-stepCompleted {
    .mantine-Stepper-stepIcon {
      background: ${PrimaryBlue};
      border-color: ${PrimaryBlue};
    }
  }
  .mantine-Stepper-stepProgress {
    .mantine-Stepper-stepIcon {
      background: ${BackgroundPanel};
      border-color: ${PrimaryBlue};
    }
  }
  .mantine-Stepper-stepIcon {
    background: ${BackgroundPanel};
    border-color: ${BackgroundPanel};
  }

  .mantine-Stepper-separator {
    background: ${BackgroundPanel};
  }
  .mantine-Stepper-separatorActive {
    background: ${PrimaryBlue};
  }

  .mantine-Stepper-content {
    margin-top: ${rem(16)};
  }
`;

type Props = {
  accessToken: string;
  githubHandle: string;
};

export const IntakeForm = ({ accessToken, githubHandle }: Props) => {
  const [queueNumber, setQueueNumber] = useLocalStorage<number>({
    key: `onboarding-${githubHandle}`,
  });
  const [stage, setStage] = useState<number>(queueNumber ? 0 : 0);

  const { data, error, isValidating } = useSWR<Repo[]>(
    [`${process.env.NEXT_PUBLIC_GITPOAP_API_URL}/onboarding/github/repos`, accessToken],
    fetchWithToken,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  const repos = useMemo(
    () =>
      data?.filter(
        (repo: Repo) =>
          repo.permissions.admin || repo.permissions.maintain || repo.permissions.push,
      ),
    [data],
  );

  const { errors, values, getInputProps, reset, setFieldError, setFieldValue, validate } =
    useMantineForm(stage, githubHandle);

  const nextStep = () =>
    setStage((current) => {
      if (validate().hasErrors) {
        return current;
      }
      return current < 3 ? current + 1 : current;
    });
  const prevStep = () => setStage((current) => (current > 0 ? current - 1 : current));

  const handleSubmit = async () => {
    if (!validate().hasErrors) {
      const formData = new FormData();
      const mappedRepos = values.repos.map((repo) => ({
        ...repo,
        githubRepoId: repo.githubRepoId.toString(),
      }));

      formData.append('name', values.name);
      formData.append('email', values.email);
      formData.append('githubHandle', values.githubHandle);
      formData.append('notes', values.notes);

      formData.append('shouldGitPOAPDesign', values.shouldGitPOAPDesign);
      formData.append('isOneGitPOAPPerRepo', values.isOneGitPOAPPerRepo);
      formData.append('repos', JSON.stringify(mappedRepos));
      values.shouldGitPOAPDesign === 'true' &&
        values.images.forEach((image, index) => {
          formData.append('images', image, `image-${index}`);
        });

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_GITPOAP_API_URL}/onboarding/intake-form`,
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
            body: formData,
          },
        );
        const data = await response.json();
        if (response.status >= 400) {
          throw new Error(JSON.stringify(data));
        }

        setQueueNumber(data.queueNumber);
        setStage(3);
      } catch (error) {
        console.warn(error);
      }
    }
  };

  if (!data && !error && isValidating) {
    return <StyledLoader />;
  }

  // The user doesn't have any repos
  if (!data || data.length === 0) {
    return (
      <Text>
        {`It looks like you don't have any public repos connected to your GitHub account, use our `}
        <StyledLink href="/#suggest">suggestion form</StyledLink>
        {` instead`}
      </Text>
    );
  }

  // The user doesn't have high enough permissions on any of their repos
  if (!repos || repos.length === 0) {
    return (
      <Text>
        {`It looks like you don't have high enough access on any of your repos, use our `}
        <StyledLink href="/#suggest">suggestion form</StyledLink>
        {` instead`}
      </Text>
    );
  }

  return (
    <Container my="xl" p={0}>
      <StyledStepper active={stage} breakpoint="sm">
        <Stepper.Step icon={<GitHub />} label={<Text>Select Repos</Text>}>
          <SelectReposList
            errors={errors}
            repos={repos}
            setFieldValue={setFieldValue}
            values={values}
          />
        </Stepper.Step>

        <Stepper.Step icon={<GitPOAP />} label={<Text>GitPOAP Details</Text>}>
          <UploadDesigns
            errors={errors}
            getInputProps={getInputProps}
            setFieldError={setFieldError}
            setFieldValue={setFieldValue}
            values={values}
          />
        </Stepper.Step>

        <Stepper.Step icon={<HiOutlineMailOpen />} label={<Text>Contact Details</Text>}>
          <ContactDetails getInputProps={getInputProps} />
        </Stepper.Step>

        <Stepper.Completed>
          <Completed
            queueNumber={queueNumber ?? 0}
            resetForm={() => {
              reset();
              setStage(0);
            }}
          />
        </Stepper.Completed>
      </StyledStepper>

      <Group position="right" mt="xl">
        {stage > 0 && stage < 3 && <Button onClick={prevStep}>Back</Button>}
        {stage < 2 && <Button onClick={nextStep}>Next</Button>}
        {stage === 2 && <Button onClick={handleSubmit}>Submit</Button>}
      </Group>
    </Container>
  );
};
