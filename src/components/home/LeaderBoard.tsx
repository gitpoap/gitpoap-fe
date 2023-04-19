import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { useLeadersQuery, LeadersQuery } from '../../graphql/generated-gql';
import { Header } from '../shared/elements/Header';
import { BREAKPOINTS } from '../../constants';
import { LeaderBoardItem } from './LeaderBoardItem';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Stack } from '@mantine/core';
import { Button } from '../shared/elements';

const Wrapper = styled(Stack)`
  display: inline-flex;
  flex-direction: column;
  width: 100%;

  @media (max-width: ${BREAKPOINTS.md}px) {
    display: flex;
    margin: auto;
  }
`;

const HeaderStyled = styled(Header)`
  @media (max-width: ${BREAKPOINTS.sm}px) {
    margin: auto;
  }
`;

const ModalButton = styled(Button)`
  width: fit-content;
  @media (max-width: ${BREAKPOINTS.sm}px) {
    margin: 0 auto;
  }
  @media (min-width: ${rem(BREAKPOINTS.xl + 1)}) {
    margin: auto;
  }
`;

type Contributor = LeadersQuery['mostHonoredContributors'][number];

export const LeaderBoard = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [result] = useLeadersQuery({
    variables: {
      count: 50,
    },
  });

  return (
    <Wrapper>
      <HeaderStyled>{'Most honored contributors'}</HeaderStyled>
      <Stack spacing={0}>
        {result.data?.mostHonoredContributors.slice(0, 8).map((item) => (
          <LeaderBoardItem key={item.profile.id} {...item} />
        ))}
      </Stack>
      <ModalButton onClick={open} variant="outline">
        View More
      </ModalButton>
      <Modal
        centered
        opened={opened}
        onClose={close}
        title={<HeaderStyled>{'Most honored contributors'}</HeaderStyled>}
      >
        {result.data?.mostHonoredContributors.map((contributor: Contributor, i: number) => (
          <LeaderBoardItem key={contributor.profile.id} {...contributor} index={i + 1} />
        ))}
      </Modal>
    </Wrapper>
  );
};
