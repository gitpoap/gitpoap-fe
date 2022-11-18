import React, { useCallback } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { FaTwitter } from 'react-icons/fa';
import { TwitterBlue, TwitterBlueHover } from '../../../colors';
import { OpenClaimsQuery } from '../../../graphql/generated-gql';

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

const getTweetText = (claimedCount: number) => {
  if (claimedCount === 1) {
    return 'I was awarded a GitPOAP for my contributions!';
  }

  return `I was awarded ${claimedCount} GitPOAPs for my contributions !`;
};

interface Props {
  claimedCount: number;
  address: string | null;
  ensName: string | null;
  claims: Exclude<OpenClaimsQuery['userClaims'], null | undefined>;
}

export const TwitterShareButton = ({ claimedCount, address, ensName, claims }: Props) => {
  const claimGitPOAPId = claims?.length > 0 ? claims[0].claim.gitPOAP.id : null;
  const profileUrl = `\nhttps://gitpoap.io/p/${ensName ?? address}\n`;
  const firstGitPOAPUrl = `\nhttps://gitpoap.io/gp/${claimGitPOAPId}\n`;

  const getTweetUrl = useCallback(() => {
    const isConnected = ensName || address;
    if (!isConnected || claimedCount === 1) {
      return firstGitPOAPUrl;
    }

    return profileUrl;
  }, [address, ensName, claimedCount, firstGitPOAPUrl, profileUrl]);

  const queryParams = new URLSearchParams({
    text: getTweetText(claimedCount) + `${getTweetUrl()}`,
  }).toString();

  return (
    <TwitterButton
      href={`https://twitter.com/intent/tweet?${queryParams}`}
      rel="noreferrer"
      target="_blank"
    >
      <TwitterIcon />
      <Label>{'Tweet My Mints'}</Label>
    </TwitterButton>
  );
};
