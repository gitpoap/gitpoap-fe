import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { FaTwitter } from 'react-icons/fa';
import { TwitterBlue, TwitterBlueHover } from '../../../colors';
import { ClaimStatus, OpenClaimsQuery } from '../../../graphql/generated-gql';

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
    return 'I was awarded a GitPOAP for contributions to open source!';
  }

  return `I was awarded ${claimedCount} GitPOAPs for contributions to open source!`;
};

interface Props {
  claimedCount: number;
  address: string | null;
  ensName: string | null;
  claims: Exclude<OpenClaimsQuery['userClaims'], null | undefined>;
}

export const TwitterShareButton = ({ claimedCount, address, ensName, claims }: Props) => {
  const profileUrl = ensName || address ? `\nhttps://twitter.com/${ensName ?? address}\n` : '';
  const firstGitPOAPUrl = `\nhttps://gitpoap.io/gp/${claims[0].claim.gitPOAP.id}\n`;
  const claimedClaims = useMemo(
    () =>
      claims.filter((claim) =>
        [ClaimStatus.Claimed, ClaimStatus.Minting, ClaimStatus.Pending].includes(
          claim.claim.status,
        ),
      ),
    [claims],
  );

  const getTweetUrl = useCallback(() => {
    if (profileUrl) {
      return profileUrl;
    } else if (claimedClaims.length > 0) {
      return firstGitPOAPUrl;
    }

    if (claimedCount === 1) {
      return `${getTweetText(claimedCount)} ${firstGitPOAPUrl} ${profileUrl}`;
    }

    return `${getTweetText(claimedCount)} ${profileUrl}`;
  }, [claimedCount, claimedClaims, firstGitPOAPUrl, profileUrl]);

  const queryParams = new URLSearchParams({
    text: getTweetText(claimedCount) + `${getTweetUrl()} #poap #gitpoap`,
    via: 'gitpoap',
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
