import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { Modal, Center } from '@mantine/core';
import { BackgroundPanel, BackgroundPanel2, TextLight } from '../../colors';
import { TextArea as TextAreaUI } from '../shared/elements/TextArea';
import { Text } from '../shared/elements/Text';
import { ExtraHover, ExtraPressed, MidnightBlue, TextGray } from '../../colors';
import { LeaderBoardItem } from '../home/LeaderBoardItem';
import { useRepoLeadersQuery } from '../../graphql/generated-gql';
import { Header } from '../shared/elements/Header';

type Props = {
  repoId: number;
  isOpen: boolean;
  onClose: () => void;
};

const StyledModal = styled(Modal)`
  .mantine-Modal-modal {
    background-color: ${BackgroundPanel};
  }
`;

const Content = styled(Center)`
  flex-direction: column;
`;

const HeaderStyled = styled(Header)`
  display: block;
  width: 100%;
  text-align: center;
  font-size: ${rem(30)};
`;

const List = styled.div`
  width: 100%;
`;

export const AllContributorsModal = ({ repoId, isOpen, onClose }: Props) => {
  const [result] = useRepoLeadersQuery({
    variables: {
      count: 1000,
      repoId: repoId,
    },
  });

  return (
    <StyledModal
      onClose={onClose}
      opened={isOpen}
      centered
      size="md"
      closeButtonLabel="Close the all contributors modal"
      title={<HeaderStyled>{'All contributors'}</HeaderStyled>}
    >
      <Content>
        <List>
          {result.data?.repoMostHonoredContributors.map((item) => (
            <LeaderBoardItem key={item.profile.id} {...item} />
          ))}
        </List>
      </Content>
    </StyledModal>
  );
};
