import { Checkbox, Container, Divider, Group, List } from '@mantine/core';

import { Text } from '../shared/elements';

type Repo = {
  name: string;
  full_name: string;
  githubRepoId: number;
  description: string;
  url: string;
  owner: {
    id: string;
    type: 'all' | 'owner' | 'public' | 'private' | 'member';
    name: string;
    avatar_url: string;
    url: string;
  };
  permissions: {
    admin: boolean; // YES
    maintain: boolean; // YES
    push: boolean; // YES
    triage: boolean;
    pull: boolean;
  };
  key: string;
};

type Props = {
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

export const SelectReposList = ({ repos, setFieldValue, values }: Props) => (
  <Container size={300} mt="xl">
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
          />
          <Text>Select All</Text>
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
                />
                <Text> {repo.full_name}</Text>
              </Group>
            </List.Item>
          ))}
        </List>
      </>
    ) : (
      <Text align="center">{"It looks like you're not an admin for any GitHub projects"}</Text>
    )}
  </Container>
);
