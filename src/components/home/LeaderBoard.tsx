import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { useLeadersQuery, LeadersQuery } from '../../graphql/generated-gql';
import { Header } from '../shared/elements/Header';
import { BREAKPOINTS } from '../../constants';
import { LeaderBoardItem } from './LeaderBoardItem';
import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';
import { Button } from '../shared/elements';

const Wrapper = styled.div`
  display: inline-flex;
  flex-direction: column;

  @media (max-width: ${BREAKPOINTS.md}px) {
    display: flex;
    margin: auto;
  }
`;

const HeaderStyled = styled(Header)`
  font-size: ${rem(30)};
  line-height: ${rem(48)};

  @media (max-width: ${BREAKPOINTS.md}px) {
    font-size: ${rem(40)};
  }
`;

const List = styled.div`
  margin-top: ${rem(30)};
`;

const ModalButton = styled(Button)`
  width: fit-content;
  margin: ${rem(24)} auto 0;
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
      <List>
        {result.data?.mostHonoredContributors.slice(0, 8).map((item) => (
          <LeaderBoardItem key={item.profile.id} {...item} />
        ))}
      </List>
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
