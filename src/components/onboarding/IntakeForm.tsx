import { useState } from 'react';
import { Code, Container, Group, Stepper } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import useSWR from 'swr';
import { z } from 'zod';

import { Button } from '../shared/elements';
import { Input } from '../shared/elements';
import { Text } from '../shared/elements';
import { TextArea } from '../shared/elements';

import { SelectReposList } from './SelectRepos';
import { UploadDesigns } from './UploadDesigns';
import { ExtraRed } from '../../colors';

const repoSchema = z.object({
  full_name: z.string(),
  githubRepoId: z.number(),
  permissions: z.object({
    admin: z.boolean(),
    maintain: z.boolean(),
    push: z.boolean(),
    triage: z.boolean(),
    pull: z.boolean(),
  }),
});

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

const ImageFileSchema = z
  .any()
  .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file?.mimetype),
    '.jpg, .jpeg, .png and .webp files are accepted.',
  );

/* Validates on Submit */
const schema = [
  // Step 0 - Select Repos
  z.object({
    repos: z.array(repoSchema).min(1),
  }),
  // Step 1 - Upload Designs
  z.object({
    shouldGitPOAPDesign: z.string(),
    files: z.array(ImageFileSchema),
  }),
  // Step 2 - Contact Details
  z.object({
    name: z.string(),
    email: z.string().email({ message: 'Invalid email' }).min(1, { message: 'Email is required' }),
    notes: z.string(),
  }),
];

type Props = {
  accessToken: string;
};

export const IntakeForm = ({ accessToken }: Props) => {
  const [active, setActive] = useState(0);

  const { data, error, isValidating } = useSWR(
    `${process.env.NEXT_PUBLIC_GITPOAP_API_URL}/onboarding/github/repos`,
    (url) =>
      fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((res) => res.json()),
  );

  const { errors, values, getInputProps, setFieldValue, validate } = useForm({
    schema: zodResolver(schema[active]),
    initialValues: {
      repos: [],
      shouldGitPOAPDesign: 'true',
      images: [],
      name: '',
      email: '',
      notes: '',
    },
  });

  const nextStep = () =>
    setActive((current) => {
      if (validate().hasErrors) {
        return current;
      }
      return current < 3 ? current + 1 : current;
    });
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <Container>
      <Stepper active={active} breakpoint="sm">
        <Stepper.Step label="Select Repos">
          <Text>{"Select the repos you'd like to create gitpoaps for!"}</Text>
          {data && data.ReposResponse.length > 0 && (
            <SelectReposList
              repos={data.ReposResponse}
              setFieldValue={setFieldValue}
              values={values}
            />
          )}
          {errors.repos && (
            <Text style={{ color: ExtraRed, width: '100%' }} size="xl" mt="xl" inline>
              {'Select at least once repo'}
            </Text>
          )}
        </Stepper.Step>

        <Stepper.Step label="Upload Designs">
          <UploadDesigns
            getInputProps={getInputProps}
            setFieldValue={setFieldValue}
            values={values}
          />
        </Stepper.Step>

        <Stepper.Step label="Contact Details">
          <Input
            style={{ width: '100%' }}
            label="Name"
            placeholder="Name"
            {...getInputProps('name')}
          />
          <Input
            style={{ width: '100%' }}
            mt="md"
            label="Email"
            placeholder="Email"
            required
            {...getInputProps('email')}
          />
          <TextArea
            style={{ width: '100%' }}
            mt="md"
            label="Notes"
            placeholder="Notes"
            {...getInputProps('notes')}
          />
        </Stepper.Step>

        <Stepper.Completed>
          <Text>
            {
              'Thank you you’re #X in the queue. If you’d like to get in touch sooner, shoot an email over to team@gitpoap.io'
            }
          </Text>
        </Stepper.Completed>
      </Stepper>

      <Group position="right" mt="xl">
        {active !== 0 && <Button onClick={prevStep}>Back</Button>}
        {active !== 3 && <Button onClick={nextStep}>Next</Button>}
      </Group>

      {/* Left in for testing! */}
      <Code block mt="xl">
        {JSON.stringify(values, null, 2)}
      </Code>
    </Container>
  );
};
