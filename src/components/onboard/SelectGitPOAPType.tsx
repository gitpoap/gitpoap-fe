import React from 'react';
import { Stack, Text, Group } from '@mantine/core';
import { rem } from 'polished';
import { BackgroundPanel2, BackgroundPanel, TextGray } from '../../colors';
import { Link } from '../shared/compounds/Link';
import { FaGithub, FaMedal } from 'react-icons/fa';

type SelectOptionsProps = {
  name: string;
  subtext: React.ReactNode;
  href: string;
  icon: React.ReactNode;
  learnMoreHref?: string;
};

const SelectOptionBox = ({ name, href, subtext, icon, learnMoreHref }: SelectOptionsProps) => {
  return (
    <Stack spacing={0}>
      <Link href={href}>
        <Stack
          p={rem(32)}
          sx={{
            backgroundColor: BackgroundPanel,
            cursor: 'pointer',
            borderTopLeftRadius: rem(10),
            borderTopRightRadius: rem(10),
            transition: 'background-color 150ms ease-in-out',
            width: rem(450),
            minHeight: rem(220),

            '&:hover': {
              backgroundColor: BackgroundPanel2,
            },

            '&:active': {
              backgroundColor: BackgroundPanel,
            },
          }}
        >
          <Group>
            {icon}
            <Text size={26} transform="uppercase" weight="bold" sx={{ letterSpacing: rem(2) }}>
              {name}
            </Text>
            {subtext}
          </Group>
        </Stack>
      </Link>
      {learnMoreHref && (
        <Link href={learnMoreHref} target="_blank">
          <Group
            p={rem(8)}
            position="center"
            sx={{
              borderTop: `2px solid ${BackgroundPanel2}`,
              backgroundColor: BackgroundPanel,
              cursor: 'pointer',
              borderBottomLeftRadius: rem(10),
              borderBottomRightRadius: rem(10),
              transition: 'background-color 150ms ease-in-out',

              '&:hover': {
                backgroundColor: BackgroundPanel2,
              },

              '&:active': {
                backgroundColor: BackgroundPanel,
              },
            }}
          >
            <Text size={16} variant="link">
              {'LEARN MORE'}
            </Text>
          </Group>
        </Link>
      )}
    </Stack>
  );
};

export const SelectGitPOAPType = () => {
  return (
    <Stack sx={{ height: '100%' }} align="center" my={rem(80)}>
      <Group>
        <Stack>
          <Group position="center" align="flex-start">
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
            />
          </Group>
        </Stack>
      </Group>
    </Stack>
  );
};
