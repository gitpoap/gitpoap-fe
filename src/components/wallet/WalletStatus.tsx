import styled, { css } from 'styled-components';
import { rem } from 'polished';
import { Jazzicon as JazzIconReact } from '@ukstv/jazzicon-react';
import { Button } from '../shared/elements/Button';
import { shortenAddress } from '../../helpers';

type Props = {
  address: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  ensName: string | null;
  hideText?: boolean;
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

const JazzIconNoText = styled(JazzIconReact)`
  ${JazzIconStyles}
`;

export const WalletStatus = ({ address, onClick, ensName, hideText }: Props) => {
  if (hideText) {
    return (
      <Container onClick={onClick} variant="outline">
        <JazzIconNoText address={address} />
      </Container>
    );
  }
  return (
    <Container leftIcon={<JazzIcon address={address} />} onClick={onClick} variant="outline">
      {ensName ? ensName : shortenAddress(address)}
    </Container>
  );
};
