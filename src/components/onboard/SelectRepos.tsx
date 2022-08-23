import { Badge, BadgeProps, Container, Group, List, ScrollArea } from '@mantine/core';
import { rem } from 'polished';
import { useState } from 'react';
import styled from 'styled-components';
import { BackgroundPanel2, ExtraRed, ExtraRedDark, PrimaryBlue, TextGray } from '../../colors';
import { useAuthContext } from '../github/AuthContext';
import { Checkbox, Input, Text } from '../shared/elements';
import { StyledLink } from './IntakeForm';
import { FormReturnTypes, Repo } from './types';

const StyledContainer = styled(Container)`
  padding: ${rem(16)};
  border: ${rem(1)} solid ${BackgroundPanel2};
`;

const StyledScrollArea = styled(ScrollArea)`
  height: ${rem(320)};
  max-height: 80vh;
  padding-left: ${rem(16)};
  border-top: ${rem(1)} solid ${BackgroundPanel2};
  border-bottom: ${rem(1)} solid ${BackgroundPanel2};
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

const BadgeStyled = styled(Badge)<BadgeProps & React.ComponentPropsWithoutRef<'div'>>`
  font-family: PT Mono;
`;

export const SelectReposList = ({ errors, repos, setFieldValue, values }: Props) => {
  const { user } = useAuthContext();
  const [searchValue, setSearchValue] = useState<string>('');
  const [checkedSelectAll, setCheckedSelectAll] = useState(false);
  const filteredRepos = repos.filter((repo) =>
    searchValue ? repo.full_name.toLowerCase().includes(searchValue.toLowerCase()) : true,
  );

  return (
    <>
      <Text style={{ lineHeight: rem(24) }}>
        {`
        Here's a list of projects you maintain or have contributed to recently.
        We work with maintainers to get their consent prior to onboarding, so if that's not you,
        still submit the repo here and share GitPOAP with the maintainer.
        We'll reach out to join the conversation soon! ⚡️`}
      </Text>
      <StyledContainer mt="xl" p="0">
        <Group mb="xs" position="apart">
          <Checkbox
            checked={checkedSelectAll}
            onChange={(e) => {
              setCheckedSelectAll(!checkedSelectAll);
              if (e.target.checked) {
                setFieldValue('repos', [
                  ...values.repos,
                  ...filteredRepos
                    .filter(
                      (repo) => !values.repos.some((r) => r.githubRepoId === repo.githubRepoId),
                    )
                    .map((repo) => formatRepoForDB(repo)),
                ]);
              } else {
                setFieldValue(
                  'repos',
                  values.repos.filter(
                    (repo) => !filteredRepos.some((r) => r.githubRepoId === repo.githubRepoId),
                  ),
                );
              }
            }}
            label={<Text>{`Select All (${filteredRepos.length})`}</Text>}
          />
          <Text>{`${values.repos.length} Selected`}</Text>
        </Group>
        <StyledScrollArea>
          <List listStyleType="none" style={{ paddingBottom: rem(10) }}>
            {filteredRepos.map((repo: Repo) => {
              const formattedName = repo.full_name.replace(/\//g, ' / ');
              const hasMaintainerPermissions =
                repo.permissions.admin || repo.permissions.maintain || repo.permissions.push;
              const isContributor = repo.permissions.pull && !hasMaintainerPermissions;
              return (
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
                      label={
                        <Text>
                          <Group position="left">
                            {formattedName}
                            {isContributor && (
                              <BadgeStyled
                                size="sm"
                                variant="filled"
                                style={{ backgroundColor: ExtraRedDark, letterSpacing: rem(1) }}
                              >
                                {'Contributor'}
                              </BadgeStyled>
                            )}
                            {hasMaintainerPermissions && (
                              <BadgeStyled
                                size="sm"
                                variant="filled"
                                style={{ backgroundColor: PrimaryBlue, letterSpacing: rem(1) }}
                              >
                                {repo.owner.name === user?.githubHandle ? 'Owner' : 'Maintainer'}
                              </BadgeStyled>
                            )}
                          </Group>
                        </Text>
                      }
                    />
                  </Group>
                </List.Item>
              );
            })}
          </List>
        </StyledScrollArea>
        <Input
          placeholder={'QUICK SEARCH...'}
          value={searchValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setCheckedSelectAll(false);
            setSearchValue(e.target.value);
          }}
          style={{ marginTop: 20, width: '100%' }}
        />
      </StyledContainer>

      {errors.repos && (
        <Text style={{ color: ExtraRed }} size="xl" mt="xl" inline>
          {errors.repos}
        </Text>
      )}

      <Text mt="md" style={{ color: TextGray, textAlign: 'center' }}>
        {`If you'd like to suggest a repo you don't see, submit it `}
        <StyledLink href="/#suggest">{'here'}</StyledLink>
        {`! Please take a look at our eligibility `}
        <StyledLink
          href="https://gitpoap.notion.site/Applying-to-issue-GitPOAPs-508a125062d54029b19611f7991144b4"
          target="_blank"
        >
          {'guidelines.'}
        </StyledLink>
      </Text>
    </>
  );
};
