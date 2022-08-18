import { Button, ButtonProps, Group, Stack, Text, TextProps } from '@mantine/core';
import { rem } from 'polished';
import styled, { css } from 'styled-components';
import React, { useEffect } from 'react';
import { FaArrowRight } from 'react-icons/fa';

import { TextGray, TextLight } from '../../colors';
import { BREAKPOINTS } from '../../constants';
import { useClaimModalContext } from '../ClaimModal/ClaimModalContext';
import { useAuthContext } from '../github/AuthContext';
import { Link } from '../Link';
import { TitleLink } from '../shared/elements';
import { FilledButtonStyles, OutlineButtonStyles } from '../shared/elements/Button';
import { useLocalStorage } from '@mantine/hooks';

const StyledStack = styled(Stack)`
  margin-bottom: ${rem(48)};
  margin-top: ${rem(144)};

  @media (max-width: ${rem(BREAKPOINTS.xl)}) {
    margin-top: ${rem(112)};
  }

  @media (max-width: ${rem(BREAKPOINTS.lg)}) {
    margin-top: ${rem(98)};
  }
`;

const HeaderStyled = styled.span`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-family: PT Mono;
  font-style: normal;
  font-weight: bold;
  font-size: ${rem(32)};
  line-height: ${rem(34)};
  text-align: center;
  letter-spacing: ${rem(1)};
  color: ${TextLight};
`;

const BannerSubHeader = styled(Text)<TextProps<'div'>>`
  font-family: PT Mono;
  font-style: normal;
  font-weight: 400;
  letter-spacing: ${rem(-0.1)};
  color: ${TextGray};
  max-width: ${rem(750)};
`;

const HowItWorks = styled(TitleLink)`
  font-size: ${rem(18)};
`;

const CTAButtonStyles = css`
  font-family: 'PT Mono';
  letter-spacing: ${rem(2)};
  transition: 150ms background ease, 150ms color ease, 150ms border ease;
  min-width: ${rem(250)};
`;

const StartIssuingButton = styled(Button)<ButtonProps<'button'>>`
  ${CTAButtonStyles};
  ${FilledButtonStyles};
`;

const StartMintingButton = styled(Button)<ButtonProps<'button'>>`
  ${CTAButtonStyles};
  ${OutlineButtonStyles};
`;

const CTAButtons = styled(Group)`
  gap: ${rem(40)};
  margin-top: ${rem(40)};

  @media (max-width: ${rem(BREAKPOINTS.sm)}) {
    gap: ${rem(20)};
  }
`;

export const Banner = () => {
  const { authorizeGitHub, isLoggedIntoGitHub } = useAuthContext();
  const { setIsOpen } = useClaimModalContext();
  const [isStartMintingButtonClicked, setIsStartMintingButtonClicked] = useLocalStorage<boolean>({
    key: 'isStartMintingButtonClicked',
    defaultValue: false,
  });

  /* Hook is used to open the claim modal after github auth */
  useEffect(() => {
    if (isLoggedIntoGitHub && isStartMintingButtonClicked) {
      setIsOpen(true);
      setIsStartMintingButtonClicked(false);
    }
  }, [isLoggedIntoGitHub, isStartMintingButtonClicked]);

  return (
    <StyledStack spacing={24}>
      <HeaderStyled>{'Recognition for Your Contributions'}</HeaderStyled>
      <BannerSubHeader align="center" size="md">
        {
          'Issue digital badges as a special way to nurture your community. Earn them to build an unbiased track record of your work.'
        }
      </BannerSubHeader>
      <CTAButtons position="center">
        <Link href="/onboard" passHref>
          <StartIssuingButton radius="md" size="md" rightIcon={<FaArrowRight />}>
            {'START ISSUING'}
          </StartIssuingButton>
        </Link>
        <StartMintingButton
          onClick={() => {
            if (!isLoggedIntoGitHub) {
              setIsStartMintingButtonClicked(true);
              authorizeGitHub();
            } else {
              setIsOpen(true);
            }
          }}
          radius="md"
          size="md"
          rightIcon={<FaArrowRight />}
          variant="outline"
        >
          {'START MINTING'}
        </StartMintingButton>
      </CTAButtons>
      <HowItWorks href="https://docs.gitpoap.io">{'How does it work?'}</HowItWorks>
    </StyledStack>
  );
};
