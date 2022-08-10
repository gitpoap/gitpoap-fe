import { Checkbox, Container, Divider, Group, List } from '@mantine/core';

import { ExtraRed } from '../../colors';
import { Text } from '../shared/elements';
import { Repo } from './util';

type Props = {
  errors: any;
  repos: Repo[];
  setFieldValue: (field: any, value: any) => void;
  values: {
    repos: Repo[];
  };
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
      {repos.length > 0 ? (
        <>
          <Group mb="xs">
            <Checkbox
              onChange={(e) => {
                const newRepoList = e.target.checked
                  ? repos.map((repo) => formatRepoForDB(repo))
                  : [];
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
                        newRepoList = values.repos.filter(
                          (r) => r.githubRepoId !== repo.githubRepoId,
                        );
                      }
                      setFieldValue('repos', newRepoList);
                    }}
                    label={<Text> {repo.full_name}</Text>}
                  />
                </Group>
              </List.Item>
            ))}
          </List>
        </>
      ) : (
        <Text align="center">{"It looks like you're not an admin for any GitHub projects"}</Text>
      )}
    </Container>

    {errors.repos && (
      <Text style={{ color: ExtraRed, width: '100%' }} size="xl" mt="xl" inline>
        {errors.repos}
      </Text>
    )}
  </Container>
);
