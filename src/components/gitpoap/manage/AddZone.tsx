import { Group, Text } from '@mantine/core';
import { rem } from 'polished';
import styled from 'styled-components';
import { BackgroundPanel, BackgroundPanel2, BackgroundPanel3 } from '../../../colors';

const Zone = styled(Group)`
  border-radius: ${rem(10)};
  border: 2px dashed ${BackgroundPanel2};
  background-color: ${BackgroundPanel};
  transition: background-color 150ms ease, border-color 150ms ease;
  cursor: pointer;

  &:hover {
    background-color: ${BackgroundPanel2};
    border-color: ${BackgroundPanel3};
  }
`;

type Props = {
  onClick: () => void;
  text: string;
};

export const AddZone = ({ onClick, text }: Props) => {
  return (
    <Zone position="center" p={rem(12)} mx={rem(10)} onClick={onClick}>
      <Text size={14} sx={{ letterSpacing: rem(2) }}>
        {text}
      </Text>
    </Zone>
  );
};
