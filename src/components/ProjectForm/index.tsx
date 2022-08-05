import { useEffect, useState } from 'react';
import {
  Button,
  Center,
  Checkbox,
  Code,
  Container,
  Divider,
  Image,
  Group,
  List,
  Radio,
  RadioGroup,
  SimpleGrid,
  Stepper,
  Textarea,
  TextInput,
} from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useForm } from '@mantine/form';

import { Text } from '../shared/elements';

type Repo = {
  name: string;
  full_name: string;
  githubRepoId: string;
  description: string;
  organization: {
    name: string;
    githubOrganizationId: string;
    avatar_url: string;
  };
  permissions: {
    admin: boolean; // YES
    maintain: boolean; // YES
    push: boolean; // YES
    triage: boolean;
    pull: boolean;
  };
};

const repo1 = {
  name: 'gitpoap-fe',
  full_name: 'gitpoap/gitpoap-fe',
  githubRepoId: 1,
  description: 'Frontend',
  organization: {
    name: 'gitpoap',
    githubOrganizationId: 1,
    avatar_url: '',
  },
  permissions: {
    admin: true, // YES
    maintain: true, // YES
    push: true, // YES
    triage: true,
    pull: true,
  },
};

const repo2 = {
  name: 'gitpoap-backend',
  full_name: 'gitpoap/gitpoap-backend',
  githubRepoId: 2,
  description: 'Backend',
  organization: {
    name: 'gitpoap',
    githubOrganizationId: 1,
    avatar_url: '',
  },
  permissions: {
    admin: true, // YES
    maintain: true, // YES
    push: true, // YES
    triage: true,
    pull: true,
  },
};

const repo3 = {
  name: 'gitpoap-docs',
  full_name: 'gitpoap/gitpoap-docs',
  githubRepoId: 3,
  description: 'Docs',
  organization: {
    name: 'gitpoap',
    githubOrganizationId: 1,
    avatar_url: '',
  },
  permissions: {
    admin: true, // YES
    maintain: true, // YES
    push: true, // YES
    triage: true,
    pull: true,
  },
};

const repo4 = {
  name: 'randRepo',
  full_name: 'randOrg/randRepo',
  githubRepoId: 4,
  description: 'Docs',
  organization: {
    name: 'randOrg',
    githubOrganizationId: 2,
    avatar_url: '',
  },
  permissions: {
    admin: true, // YES
    maintain: true, // YES
    push: true, // YES
    triage: true,
    pull: true,
  },
};

const repos = [
  { repoData: repo1, checked: false, orgName: repo1.organization.name, key: repo1.githubRepoId },
  { repoData: repo2, checked: false, orgName: repo2.organization.name, key: repo2.githubRepoId },
  { repoData: repo3, checked: false, orgName: repo3.organization.name, key: repo3.githubRepoId },
  { repoData: repo4, checked: false, orgName: repo4.organization.name, key: repo4.githubRepoId },
];

export const ProjectForm = () => {
  const [active, setActive] = useState(0);
  const [designValue, setDesignValue] = useState('gitpoap');

  const form = useForm({
    initialValues: {
      repos: repos,
      files: [],
      name: '',
      email: '',
      notes: '',
      website: '',
      github: '',
    },

    validate: (values) => {
      // if (active === 1) {
      //   return {
      //     files: designValue === "user" && form.values.files.length === 0 ? 'At least one file must be submitted' : null,
      //   };
      // }

      if (active === 2) {
        return {
          name: values.name.trim().length < 2 ? 'Name must include at least 2 characters' : null,
          email: /^\S+@\S+$/.test(values.email) ? null : 'Invalid email',
        };
      }

      return {};
    },
  });

  const nextStep = () =>
    setActive((current) => {
      if (form.validate().hasErrors) {
        return current;
      }
      return current < 3 ? current + 1 : current;
    });

  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  useEffect(() => console.log(form.values), [form.values]);

  const list = form.values.repos.map((item, index) => ({
    orgName: item.repoData.organization.name,
    element: (
      <Group key={item.key} mt="xs">
        <Checkbox
          // @ts-ignore
          {...form.getInputProps(`repos.${index}.checked`, { type: 'checkbox' })}
        />
        <Text>{item.repoData.name}</Text>
      </Group>
    ),
  }));

  const groups = list.reduce(
    (groups, item) => ({
      ...groups,
      [item.orgName]: [...(groups[item.orgName] || []), item.element],
    }),
    {},
  );

  // const [files, setFiles] = useState<File[]>([]);

  const previews = form.values.files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Image
        key={index}
        src={imageUrl}
        imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
      />
    );
    console.log(file);
  });

  const finalList = Object.keys(groups).map((key, i) => (
    <List.Item key={key + 'list-item'}>
      <Group key={key + 'group'} mt="xs">
        <Checkbox
          name={key}
          key={key + 'checkbox'}
          onChange={(e) => {
            form.setFieldValue(
              `repos`,
              form.values.repos.map((repo, j) => {
                if (repo.orgName === key) {
                  form.setFieldValue(`repos.${j}.checked`, e.target.checked);
                  return { ...repo, checked: e.target.checked };
                }
                return repo;
              }),
            );
          }}
        />
        <Text>{key}</Text>
      </Group>
      <List withPadding>{groups[key]}</List>
    </List.Item>
  ));

  return (
    <Container>
      <Stepper active={active} breakpoint="sm">
        <Stepper.Step label="Select Repos">
          <Container size={300} mt="xl">
            {list.length > 0 ? (
              <>
                <Group mb="xs">
                  <Checkbox />
                  <Text>Select All</Text>
                </Group>
                <Divider my="sm" />
                <List listStyleType="none">
                  {finalList}
                  {/* {fields} */}
                </List>
              </>
            ) : (
              <Text align="center">
                {"It looks like you're not an admin for any GitHub projects"}
              </Text>
            )}
            {/* <TextInput label="Name" placeholder="Name" {...form.getInputProps('name')} />
          <TextInput mt="md" label="Email" placeholder="Email" {...form.getInputProps('email')} /> */}
          </Container>
        </Stepper.Step>

        <Stepper.Step label="Upload Designs">
          <Center mt="xl" mb="xl">
            <RadioGroup
              // label="Select your favorite framework/library"
              // description="This is anonymous"
              value={designValue}
              onChange={setDesignValue}
              orientation="vertical"
              required
            >
              <Radio
                value="gitpoap"
                label={<Text>Have our designers create your GitPOAPs</Text>}
                defaultChecked
              />
              <Radio value="user" label={<Text>Submit your own designs</Text>} />
            </RadioGroup>
          </Center>

          {designValue === 'user' && (
            <>
              <Dropzone
                mt="xl"
                accept={IMAGE_MIME_TYPE}
                onDrop={(files) => form.setFieldValue(`files`, files)}
              >
                {(status) => <Text align="center">Drop images here</Text>}
              </Dropzone>

              <SimpleGrid
                cols={4}
                breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
                mt={previews.length > 0 ? 'xl' : 0}
              >
                {previews}
              </SimpleGrid>
            </>
          )}
        </Stepper.Step>

        <Stepper.Step label="Contact Details">
          <TextInput label="Name" placeholder="Name" {...form.getInputProps('name')} />
          <TextInput mt="md" label="Email" placeholder="Email" {...form.getInputProps('email')} />
          <Textarea mt="md" label="Notes" placeholder="Notes" {...form.getInputProps('notes')} />
        </Stepper.Step>

        <Stepper.Completed>
          <Text>
            Thank you you’re #X in the queue. If you’d like to get in touch sooner, shoot an email
            over to contact team@gitpoap.io
          </Text>
          Completed! Form values:
          <Code block mt="xl">
            {JSON.stringify(form.values, null, 2)}
          </Code>
        </Stepper.Completed>
      </Stepper>

      <Group position="right" mt="xl">
        {active !== 0 && (
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
        )}
        {active !== 3 && <Button onClick={nextStep}>Next</Button>}
      </Group>
    </Container>
  );
};
