import styled, { css } from 'styled-components';
import { rem } from 'polished';
import { Jazzicon as JazzIconReact } from '@ukstv/jazzicon-react';
import { Button } from '../shared/elements/Button';
import { Avatar } from '../shared/elements';
import { FaChevronDown } from 'react-icons/fa';

type Props = {
  accountValue: string;
  hideText?: boolean;
  ensAvatarUrl: string | null;
};

const Container = styled(Button)`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  min-height: ${rem(34)};
`;

const JazzIconStyles = css`
  border-radius: 50%;
  height: ${rem(16)};
  width: ${rem(16)};
`;

const JazzIcon = styled(JazzIconReact)`
  ${JazzIconStyles}
  margin-left: ${rem(5)};
`;

export const JazzIconNoText = styled(JazzIconReact)`
  ${JazzIconStyles}
`;

export const WalletStatus = ({ accountValue, hideText, ensAvatarUrl }: Props) => {
  if (hideText) {
    return (
      <Container rightIcon={<FaChevronDown />} variant="outline">
        {ensAvatarUrl ? (
          <Avatar src={ensAvatarUrl} useDefaultImageTag size={16} />
        ) : (
          <JazzIconNoText address={accountValue} />
        )}
      </Container>
    );
  }
  return (
    <Container
      leftIcon={
        ensAvatarUrl ? (
          <Avatar src={ensAvatarUrl} useDefaultImageTag size={16} />
        ) : (
          <JazzIcon address={accountValue} />
        )
      }
      rightIcon={<FaChevronDown />}
      variant="outline"
    >
      {accountValue}
    </Container>
  );
};
