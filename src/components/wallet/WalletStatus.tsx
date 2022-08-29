import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { rem } from 'polished';
import { Jazzicon as JazzIconReact } from '@ukstv/jazzicon-react';
import { Button } from '../shared/elements/Button';
import { shortenAddress } from '../../helpers';
import { useWeb3Context } from './Web3ContextProvider';
import { Avatar } from '../shared/elements';

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

const StyledAvatar = styled(Avatar)`
  height: ${rem(16)};
  width: ${rem(16)};
`;

export const WalletStatus = ({ address, onClick, ensName, hideText }: Props) => {
  const { web3Provider, infuraProvider } = useWeb3Context();
  const [ensAvatarUrl, setEnsAvatarUrl] = useState<string | null>(null);

  /* Hook fetches the avatar URL for the user */
  useEffect(() => {
    const prepareResultsEns = async () => {
      if (ensName) {
        const avatar = await (web3Provider ?? infuraProvider)?.getAvatar(ensName);
        if (avatar) {
          setEnsAvatarUrl(avatar);
        }
      }
    };

    prepareResultsEns();
  }, [web3Provider, infuraProvider, ensName]);

  if (hideText) {
    return (
      <Container onClick={onClick} variant="outline">
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
      onClick={onClick}
      variant="outline"
    >
      {ensName ? ensName : shortenAddress(address)}
    </Container>
  );
};
