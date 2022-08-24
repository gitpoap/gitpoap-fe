import { Button } from '@mantine/core';
import { graphql } from 'msw';
import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { AllContributorsModal } from '../../components/repo/AllContributorsModal';

export default {
  title: 'Modals/AllContributorsModal',
  component: AllContributorsModal,
  argTypes: {},
} as ComponentMeta<typeof AllContributorsModal>;

const Template: ComponentStory<typeof AllContributorsModal> = (args) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <AllContributorsModal onClose={() => setIsOpen(false)} opened={isOpen} repoId={1} />
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {};

Default.parameters = {
  msw: {
    handlers: [
      graphql.query('repoLeaders', (req, res, ctx) => {
        const { page = 1, perPage = repoLeaders.length } = req.variables;
        const start = (page - 1) * perPage;
        const end = start + perPage;
        return res(
          ctx.data({
            repoMostHonoredContributors: repoLeaders.slice(start, end),
          }),
        );
      }),
    ],
  },
};

export const LongList = Template.bind({});
LongList.args = {};

LongList.parameters = {
  msw: {
    handlers: [
      graphql.query('repoLeaders', (req, res, ctx) => {
        const { page = 1, perPage = repoLeaders.length } = req.variables;
        const start = (page - 1) * perPage;
        const end = start + perPage;
        return res(
          ctx.data({
            repoMostHonoredContributors: longListOfContributors.slice(start, end),
          }),
        );
      }),
    ],
  },
};

const longListOfContributors = Array.from(Array(100).keys()).map((i) => {
  return {
    profile: {
      address: `0x${i}`,
      id: i,
    },
    claimsCount: 100 - i,
  };
});

const repoLeaders = [
  {
    profile: {
      address: '0x334ce923420ff1aa4f272e92bf68013d092ae7b4',
      id: 338,
    },
    claimsCount: 3,
  },
  {
    profile: {
      address: '0x4b795ba8bcc0f125813d13da5b65dcaba4ae4bd1',
      id: 310,
    },
    claimsCount: 3,
  },
  {
    profile: {
      address: '0x5b2ed2ef8f480cc165a600ac451d9d9ebf521e94',
      id: 320,
    },
    claimsCount: 3,
  },
  {
    profile: {
      address: '0x8cfb71682feb93317d1eb4e0b3ca7fa9044169cf',
      id: 307,
    },
    claimsCount: 2,
  },
  {
    profile: {
      address: '0x77ca952092460102b3f4e315a57c484e2490d099',
      id: 311,
    },
    claimsCount: 2,
  },
  {
    profile: {
      address: '0xf31df2dcd4083ee57f0d33d386656cfbd1e859a1',
      id: 313,
    },
    claimsCount: 2,
  },
];
