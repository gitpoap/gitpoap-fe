import React from 'react';
import { Stack, Text, Group, Box } from '@mantine/core';
import { rem } from 'polished';
import { BackgroundPanel2, BackgroundPanel, TextGray } from '../../colors';
import { Link } from '../shared/compounds/Link';
import { FaGithub, FaMedal } from 'react-icons/fa';
import { useRouter } from 'next/router';

type SelectOptionsProps = {
  name: string;
  subtext: React.ReactNode;
  href: string;
  icon: React.ReactNode;
};

const SelectOptionBox = ({ name, href, subtext, icon }: SelectOptionsProps) => {
  const router = useRouter();
  return (
    <Box
      onClick={(e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        void router.push(href);
      }}
    >
      <Stack
        p={rem(32)}
        sx={{
          backgroundColor: BackgroundPanel,
          cursor: 'pointer',
          borderRadius: rem(10),
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
    </Box>
  );
};

export const SelectGitPOAPType = () => {
  return (
    <Stack sx={{ height: '100%' }} align="center" my={rem(80)}>
      <Group>
        <Stack>
          <Group position="center">
            <SelectOptionBox
              name="CUSTOM"
              subtext={
                <Stack>
                  <Text size={16} sx={{ lineHeight: rem(24), color: TextGray }} mt={rem(4)}>
                    {
                      'Celebrate any collaborative effort! Awardable to emails, GitHub users, ETH addresses, & ENS Names.'
                    }
                  </Text>
                  <Link href="https://docs.gitpoap.io" target="_blank" rel="noopener noreferrer">
                    <Text size={16} variant="link">
                      {'Learn More'}
                    </Text>
                  </Link>
                </Stack>
              }
              href={'/create'}
              icon={<FaMedal size={26} style={{ fill: 'white' }} />}
            ></SelectOptionBox>
            <SelectOptionBox
              name="GITHUB-BASED"
              subtext={
                <Text size={16} sx={{ lineHeight: rem(24), color: TextGray }} mt={rem(4)}>
                  {'Automate rewards for your GitHub contributors & incentivize collaboration.'}
                </Text>
              }
              href={'/onboard'}
              icon={<FaGithub size={26} style={{ fill: 'white' }} />}
            ></SelectOptionBox>
          </Group>
        </Stack>
      </Group>
    </Stack>
  );
};
