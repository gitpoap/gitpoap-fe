import { useEffect, useState } from 'react';
import { Anchor, Group, Stepper } from '@mantine/core';
import styled from 'styled-components';
import useSWR from 'swr';

import { PrimaryBlue } from '../../colors';
import { Link } from '../Link';
import { Button, Loader, Text } from '../shared/elements';
import { Completed } from './Completed';
import { ContactDetails } from './ContactDetails';
import { SelectReposList } from './SelectRepos';
import { UploadDesigns } from './UploadDesigns';
import { useMantineForm, Repo } from './util';

export const StyledLink = styled(Link)`
  color: ${PrimaryBlue};
`;

type Props = {
  accessToken: string;
  githubHandle: string;
};

export const IntakeForm = ({ accessToken, githubHandle }: Props) => {
  const [stage, setStage] = useState(0);
  const [queueNumber, setQueueNumber] = useState(0);
  const [shouldGitPOAPDesign, setShouldGitPOAPDesign] = useState(true);

  const fetchWithToken = async (url: string, token: string | null) => {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  };

  const { data, error, isValidating } = useSWR<Repo[]>(
    [`${process.env.NEXT_PUBLIC_GITPOAP_API_URL}/onboarding/github/repos`, accessToken],
    fetchWithToken,
  );

  const { clearErrors, errors, values, getInputProps, setFieldValue, validate } = useMantineForm(
    stage,
    shouldGitPOAPDesign,
    githubHandle,
  );

  useEffect(() => {
    clearErrors();
    setShouldGitPOAPDesign(values.shouldGitPOAPDesign === 'true');
  }, [values.shouldGitPOAPDesign]);

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
      await fetch(`${process.env.NEXT_PUBLIC_GITPOAP_API_URL}/onboarding/intake-form`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
        .then((response) => response.json())
        .then((data) => {
          setQueueNumber(data.queueNumber);
          setStage(3);
        });
    }
  };

  if (!data && !error && isValidating) {
    return <Loader />;
  }

  // The user doesn't have any repos
  if (!data || data?.length === 0) {
    return (
      <Text>
        {`It looks like you don't have any public repos connected to your GitHub account, use our `}
        <StyledLink href="/#suggest">suggestion form</StyledLink>
        {` instead`}
      </Text>
    );
  }

  const repos = data.filter(
    (repo: Repo) => repo.permissions.admin || repo.permissions.maintain || repo.permissions.push,
  );

  // The user doesn't have high enough permissions on any of their repos
  if (repos.length === 0) {
    return (
      <Text>
        {`It looks like you don't have high enough access on any of your repos, use our `}
        <StyledLink href="/#suggest">suggestion form</StyledLink>
        {` instead`}
      </Text>
    );
  }

  return (
    <>
      <Stepper active={stage} breakpoint="sm">
        <Stepper.Step label="Select Repos">
          <SelectReposList
            errors={errors}
            repos={repos}
            setFieldValue={setFieldValue}
            values={values}
          />
        </Stepper.Step>

        <Stepper.Step label="Upload Designs">
          <UploadDesigns
            errors={errors}
            getInputProps={getInputProps}
            setFieldValue={setFieldValue}
            values={values}
          />
        </Stepper.Step>

        <Stepper.Step label="Contact Details">
          <ContactDetails getInputProps={getInputProps} />
        </Stepper.Step>

        <Stepper.Completed>
          <Completed queueNumber={queueNumber} />
        </Stepper.Completed>
      </Stepper>

      <Group position="right" mt="xl">
        {stage > 0 && stage < 3 && <Button onClick={prevStep}>Back</Button>}
        {stage < 2 && <Button onClick={nextStep}>Next</Button>}
        {stage === 2 && <Button onClick={handleSubmit}>Submit</Button>}
      </Group>
    </>
  );
};
