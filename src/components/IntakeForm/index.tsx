import { useState } from 'react';
import { Center, Code, Container, Group, Radio, Stepper } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';

import { Button } from '../shared/elements';
import { Input } from '../shared/elements';
import { RadioGroup } from '../shared/elements';
import { Text } from '../shared/elements';
import { TextArea } from '../shared/elements';

/* Validates on Submit */
const schema = [
  // Step 0 - Select Repos
  z.object({}),
  // Step 1 - Upload Designs
  z.object({
    shouldGitPOAPDesign: z.string(),
  }),
  // Step 2 - Contact Details
  z.object({
    name: z.string(),
    email: z.string().email({ message: 'Invalid email' }).min(1, { message: 'Email is required' }),
    notes: z.string(),
  }),
];

export const IntakeForm = () => {
  const [active, setActive] = useState(0);

  const { values, getInputProps, validate } = useForm({
    schema: zodResolver(schema[active]),
    initialValues: {
      shouldGitPOAPDesign: 'true',
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
        </Stepper.Step>

        <Stepper.Step label="Upload Designs">
          <Center mt="xl" mb="xl">
            <RadioGroup orientation="vertical" required {...getInputProps('shouldGitPOAPDesign')}>
              <Radio
                value="true"
                label={<Text>{'Have our designers create your GitPOAPs'}</Text>}
                defaultChecked
              />
              <Radio value="false" label={<Text>{'Submit your own designs'}</Text>} />
            </RadioGroup>
          </Center>
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
            label="Email *"
            placeholder="Email"
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
          {/* Left in for testing! */}
          Completed! Form values:
          <Code block mt="xl">
            {JSON.stringify(values, null, 2)}
          </Code>
        </Stepper.Completed>
      </Stepper>

      <Group position="right" mt="xl">
        {active !== 0 && <Button onClick={prevStep}>Back</Button>}
        {active !== 3 && <Button onClick={nextStep}>Next</Button>}
      </Group>
    </Container>
  );
};
