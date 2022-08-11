import { Container, Divider, Group, List } from '@mantine/core';

import { ExtraRed } from '../../colors';
import { Checkbox, Text } from '../shared/elements';
import { FormReturnTypes, Repo } from './types';

type Props = {
  errors: FormReturnTypes['errors'];
  repos: Repo[];
  setFieldValue: FormReturnTypes['setFieldValue'];
  values: FormReturnTypes['values'];
};

const formatRepoForDB = (repo: Repo) => ({
  full_name: repo.full_name,
  githubRepoId: repo.githubRepoId,
  permissions: repo.permissions,
});

export const SelectReposList = ({ errors, repos, setFieldValue, values }: Props) => (
  <Container mt="xl">
    <Text>{"Select the repos you'd like to create gitpoaps for!"}</Text>
    <Container mt="xl">
      <Group mb="xs">
        <Checkbox
          onChange={(e) => {
            const newRepoList = e.target.checked ? repos.map((repo) => formatRepoForDB(repo)) : [];
            setFieldValue('repos', newRepoList);
          }}
          label={<Text>Select All</Text>}
        />
      </Group>
      <Divider my="sm" />
      <List listStyleType="none">
        {repos.map((repo, i) => (
          <List.Item key={repo.githubRepoId + 'list-item'}>
            <Group key={repo.githubRepoId} mt="xs">
              <Checkbox
                checked={values.repos.some((r) => r.githubRepoId === repo.githubRepoId)}
                onChange={(e) => {
                  let newRepoList = [];
                  if (e.target.checked) {
                    newRepoList = [...values.repos, formatRepoForDB(repo)];
                  } else {
                    newRepoList = values.repos.filter((r) => r.githubRepoId !== repo.githubRepoId);
                  }
                  setFieldValue('repos', newRepoList);
                }}
                label={<Text> {repo.full_name}</Text>}
              />
            </Group>
          </List.Item>
        ))}
      </List>
    </Container>

    {errors.repos && (
      <Text style={{ color: ExtraRed, width: '100%' }} size="xl" mt="xl" inline>
        {errors.repos}
      </Text>
    )}
  </Container>
);
