import { Group, Stack, Text } from '@mantine/core';
import { rem } from 'polished';
import React from 'react';
import { FaGithub, FaMedal } from 'react-icons/fa';
import { TextGray } from '../../../../colors';
import { Header } from '../../../shared/elements';
import { SelectOptionBox } from './SelectOptionBox';

export const CreateAGitPOAP = () => {
  return (
    <Stack mb={32}>
      <Header>{'Create a GitPOAP'}</Header>
      <Group>
        <Stack>
          <Group position="center" align="flex-start" spacing="xl">
            <SelectOptionBox
              name="CUSTOM"
              subtext={
                <Stack>
                  <Text size={16} sx={{ lineHeight: rem(24), color: TextGray }} mt={rem(4)}>
                    {
                      'Celebrate any collaborative effort! Awardable to emails, GitHub users, ETH addresses, & ENS Names.'
                    }
                  </Text>
                </Stack>
              }
              href={'/create'}
              icon={<FaMedal size={26} style={{ fill: 'white' }} />}
              learnMoreHref={'/custom-gitpoaps'}
            />
            <SelectOptionBox
              name="GITHUB-BASED"
              subtext={
                <Text size={16} sx={{ lineHeight: rem(24), color: TextGray }} mt={rem(4)}>
                  {'Automate rewards for your GitHub contributors & incentivize collaboration.'}
                </Text>
              }
              href={'/onboard'}
              icon={<FaGithub size={26} style={{ fill: 'white' }} />}
              learnMoreHref={'https://docs.gitpoap.io/#how-does-it-work'}
            />
          </Group>
        </Stack>
      </Group>
    </Stack>
  );
};
