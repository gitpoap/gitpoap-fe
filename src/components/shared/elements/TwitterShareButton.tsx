import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { FaTwitter } from 'react-icons/fa';

import { useWeb3Context } from '../../wallet/Web3ContextProvider';
import { TwitterBlue, TwitterBlueHover } from '../../../colors';

const TwitterButton = styled.a`
  margin-top: ${rem(20)};
  height: ${rem(28)};
  width: fit-content;
  border-radius: ${rem(28)};
  padding: ${rem(1)} ${rem(12)} ${rem(1)} ${rem(12)};

  position: relative;
  box-sizing: border-box;
  background-color: ${TwitterBlue};
  color: #fff;
  font-weight: 500;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${TwitterBlueHover};
  }
`;

const TwitterIcon = styled(FaTwitter)`
  height: ${rem(16)};
  width: ${rem(16)};
`;

const Label = styled.span`
  margin-left: ${rem(4)};
  font: normal normal normal ${rem(18)} 'Helvetica Neue', Arial, sans-serif;
  font-size: ${rem(13)};
  line-height: ${rem(26)};
  font-weight: 500;
`;

interface Props {
  gitPOAPCount: number;
}

export const TwitterShareButton = ({ gitPOAPCount }: Props) => {
  const { address, ensName } = useWeb3Context();

  let queryParams = new URLSearchParams({
    hashtags: 'poap,gitpoap',
    text: `I was just awarded ${gitPOAPCount} POAP${
      gitPOAPCount > 1 && 's'
    } for contributions I've made to open source!`,
    url: `\nhttps://gitpoap.io/p/${ensName ?? address}\n`,
    via: 'gitpoap',
  }).toString();

  return (
    <TwitterButton
      href={`https://twitter.com/intent/tweet?${queryParams}`}
      rel="noreferrer"
      target="_blank"
    >
      <TwitterIcon />
      <Label>{'Tweet'}</Label>
    </TwitterButton>
  );
};
