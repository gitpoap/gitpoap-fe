import React, { useEffect, ComponentProps } from 'react';
import { Button, ButtonProps, Group, Stack, Text, TextProps } from '@mantine/core';
import { rem } from 'polished';
import { useRouter } from 'next/router';
import styled, { css } from 'styled-components';
import { FaArrowRight } from 'react-icons/fa';
import { TextGray, TextLight } from '../../colors';
import { BREAKPOINTS } from '../../constants';
import { useClaimContext } from '../claims/ClaimContext';
import { Link } from '../shared/compounds/Link';
import { TitleLink } from '../shared/elements';
import { useLocalStorage } from '@mantine/hooks';
import { useUser } from '../../hooks/useUser';

const StyledStack = styled(Stack)`
  margin-bottom: ${rem(48)};
  margin-top: ${rem(54)};

  @media (max-width: ${rem(BREAKPOINTS.xl)}) {
    margin-top: ${rem(22)};
  }

  @media (max-width: ${rem(BREAKPOINTS.lg)}) {
    margin-top: ${rem(10)};
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

const BannerSubHeader = styled(Text)<TextProps>`
  font-family: PT Mono;
  font-style: normal;
  font-weight: 400;
  letter-spacing: ${rem(-0.1)};
  color: ${TextGray};
  max-width: ${rem(750)};
`;

const HowItWorks = styled(TitleLink)`
  font-size: ${rem(18)} !important;
`;

const CTAButtonStyles = css`
  font-family: 'PT Mono';
  letter-spacing: ${rem(2)};
  transition: 150ms background ease, 150ms color ease, 150ms border ease;
  min-width: ${rem(250)};
`;

const StartIssuingButton = styled(Button)<ButtonProps & ComponentProps<typeof Button>>`
  ${CTAButtonStyles};
`;

const StartMintingButton = styled(Button)<
  ButtonProps & ComponentProps<typeof Button> & { onClick: () => void }
>`
  ${CTAButtonStyles};
`;

const CTAButtons = styled(Group)`
  gap: ${rem(40)};
  margin-top: ${rem(40)};

  @media (max-width: ${rem(BREAKPOINTS.sm)}) {
    gap: ${rem(20)};
  }
`;

export const Banner = () => {
  const user = useUser();
  const hasGithub = user?.capabilities.hasGithub ?? false;
  const { setIsOpen } = useClaimContext();
  const router = useRouter();
  const [isStartMintingButtonClicked, setIsStartMintingButtonClicked] = useLocalStorage<boolean>({
    key: 'isStartMintingButtonClicked',
    defaultValue: false,
  });

  /* Hook is used to open the claim modal after github auth */
  useEffect(() => {
    if (hasGithub && isStartMintingButtonClicked) {
      setIsOpen(true);
      setIsStartMintingButtonClicked(false);
    }
  }, [hasGithub, isStartMintingButtonClicked]);

  return (
    <StyledStack spacing={24}>
      <HeaderStyled>{'Recognition for Your Contributions'}</HeaderStyled>
      <BannerSubHeader align="center" size="md">
        {
          'Issue digital badges as a special way to nurture your community. Earn them to build an unbiased track record of your work.'
        }
      </BannerSubHeader>
      <CTAButtons position="center">
        <Link href="/create/select-type" passHref>
          <StartIssuingButton radius="md" size="md" rightIcon={<FaArrowRight />} variant="filled">
            {'ISSUE GITPOAPS'}
          </StartIssuingButton>
        </Link>
        <StartMintingButton
          onClick={() => router.push('/eligibility')}
          radius="md"
          size="md"
          rightIcon={<FaArrowRight />}
          variant="outline"
        >
          {'Check Eligibility'}
        </StartMintingButton>
      </CTAButtons>
      <HowItWorks href="https://docs.gitpoap.io" target="_blank" rel="noopener noreferrer">
        {'How does it work?'}
      </HowItWorks>
    </StyledStack>
  );
};
