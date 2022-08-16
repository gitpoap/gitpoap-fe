import { Container, Group, List, ScrollArea } from '@mantine/core';
import { rem } from 'polished';
import styled from 'styled-components';

import { BackgroundPanel2, ExtraRed, TextGray } from '../../colors';
import { Checkbox, Text } from '../shared/elements';
import { StyledLink } from './IntakeForm';
import { FormReturnTypes, Repo } from './types';

const StyledContainer = styled(Container)`
  padding: ${rem(16)} ${rem(16)} 0;
  border: ${rem(1)} solid ${BackgroundPanel2};
`;

const StyledScrollArea = styled(ScrollArea)`
  padding-left: ${rem(16)};
  border-top: ${rem(1)} solid ${BackgroundPanel2};
  .mantine-ScrollArea-scrollbar:hover {
    background: ${BackgroundPanel2};
  }
`;

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
  <>
    <Text>{"Select the repos you'd like to create GitPOAPs for!"}</Text>
    <StyledContainer mt="xl">
      <Group mb="xs" position="apart">
        <Checkbox
          onChange={(e) => {
            const newRepoList = e.target.checked ? repos.map((repo) => formatRepoForDB(repo)) : [];
            setFieldValue('repos', newRepoList);
          }}
          label={<Text>Select All</Text>}
        />
        <Text>{`${values.repos.length} Selected`}</Text>
      </Group>
      <StyledScrollArea style={{ height: 320, maxHeight: '80vh' }}>
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
      </StyledScrollArea>
    </StyledContainer>

    {errors.repos && (
      <Text style={{ color: ExtraRed, width: '100%' }} size="xl" mt="xl" inline>
        {errors.repos}
      </Text>
    )}

    <Text mt="md" style={{ color: TextGray }}>
      {`This list only includes public repos you have a minimum of maintainer access too. If there are other repos you'd like to submit for consideration, use our `}
      <StyledLink href="/#suggest">suggestion form</StyledLink>
      {` instead!`}
    </Text>
  </>
);
