import { useEffect, useState } from 'react';
import { Code, Group, Stepper } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import useSWR from 'swr';

import { Button, Loader, Text } from '../shared/elements';
import { Completed } from './Completed';
import { ContactDetails } from './ContactDetails';
import { SelectReposList } from './SelectRepos';
import { UploadDesigns } from './UploadDesigns';
import { createSchema, Repo } from './util';

type Props = {
  accessToken: string;
  githubHandle: string;
};

export const IntakeForm = ({ accessToken, githubHandle }: Props) => {
  const [active, setActive] = useState(0);
  const [shouldGitPOAPDesign, setShouldGitPOAPDesign] = useState(true);

  const { data, error, isValidating } = useSWR<{ ReposResponse: Repo[] }>(
    `${process.env.NEXT_PUBLIC_GITPOAP_API_URL}/onboarding/github/repos`,
    (url) =>
      fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((res) => res.json()),
  );

  const { clearErrors, errors, values, getInputProps, setFieldValue, validate } = useForm({
    schema: zodResolver(createSchema(active, shouldGitPOAPDesign)),
    initialValues: {
      githubHandle: githubHandle,
      repos: [],
      shouldGitPOAPDesign: 'true',
      isOneGitPOAPPerRepo: 'true',
      images: [],
      name: '',
      email: '',
      notes: '',
    },
  });

  useEffect(() => {
    clearErrors();
    setShouldGitPOAPDesign(values.shouldGitPOAPDesign === 'true');
  }, [values.shouldGitPOAPDesign]);

  const nextStep = () =>
    setActive((current) => {
      if (validate().hasErrors) {
        return current;
      }
      return current < 3 ? current + 1 : current;
    });
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  const handleSubmit = () => {
    if (!validate().hasErrors) {
      fetch(`${process.env.NEXT_PUBLIC_GITPOAP_API_URL}/onboarding/intake-form`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      setActive(3);
    }
  };

  if (!data && !error && isValidating) {
    return <Loader />;
  }

  // The user doesn't have any repos
  if (!data?.ReposResponse || data?.ReposResponse.length === 0) {
    return (
      <Text>
        {
          "It looks like you don't have any public repos connected to your github account, use our suggestion form instead"
        }
      </Text>
    );
  }

  const ReposResponse = data.ReposResponse.filter(
    (repo: Repo) => repo.permissions.admin || repo.permissions.maintain || repo.permissions.push,
  );

  // The user doesn't have high enough permissions on any of their repos
  if (ReposResponse.length === 0) {
    return (
      <Text>
        {
          "It looks like you don't have high enough access on any of your repos, use our suggestion form instead"
        }
      </Text>
    );
  }

  return (
    <>
      <Stepper active={active} breakpoint="sm">
        <Stepper.Step label="Select Repos">
          <SelectReposList
            errors={errors}
            repos={ReposResponse}
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
          <Completed />
        </Stepper.Completed>
      </Stepper>

      <Group position="right" mt="xl">
        {active > 0 && active < 3 && <Button onClick={prevStep}>Back</Button>}
        {active < 2 && <Button onClick={nextStep}>Next</Button>}
        {active === 2 && <Button onClick={handleSubmit}>Submit</Button>}
      </Group>

      {/* Left in for testing! */}
      <Code block mt="xl">
        {JSON.stringify(values, null, 2)}
      </Code>
    </>
  );
};
