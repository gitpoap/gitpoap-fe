import styled, { css } from 'styled-components';
import { rem } from 'polished';
import { Jazzicon as JazzIconReact } from '@ukstv/jazzicon-react';
import { Button } from '../shared/elements/Button';
import { shortenAddress } from '../../helpers';
import { Avatar } from '../shared/elements';
import { FaChevronDown } from 'react-icons/fa';

type Props = {
  address: string;
  ensName: string | null;
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

export const StyledAvatar = styled(Avatar)`
  height: ${rem(16)};
  width: ${rem(16)};
`;

export const WalletStatus = ({ address, ensName, hideText, ensAvatarUrl }: Props) => {
  if (hideText) {
    return (
      <Container variant="outline">
        {ensAvatarUrl ? (
          <StyledAvatar src={ensAvatarUrl} useDefaultImageTag />
        ) : (
          <JazzIconNoText address={address} />
        )}
      </Container>
    );
  }
  return (
    <Container
      leftIcon={
        ensAvatarUrl ? (
          <StyledAvatar src={ensAvatarUrl} useDefaultImageTag />
        ) : (
          <JazzIcon address={address} />
        )
      }
      rightIcon={<FaChevronDown />}
      variant="outline"
    >
      {ensName ? ensName : shortenAddress(address)}
    </Container>
  );
};
