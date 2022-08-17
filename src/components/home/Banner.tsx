import React from 'react';
import styled, { css } from 'styled-components';
import { rem } from 'polished';
import { TextGray, TextLight } from '../../colors';
import { TitleLink } from '../shared/elements';
import { FilledButtonStyles, OutlineButtonStyles } from '../shared/elements/Button';
import { Button, ButtonProps, Text, TextProps } from '@mantine/core';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from '../Link';
import { useAuthContext } from '../github/AuthContext';

const Container = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  margin-bottom: ${rem(20)};
  margin-top: ${rem(55)};
  max-width: 100%;
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
  margin-bottom: ${rem(15)};
`;

const BannerSubHeader = styled(Text)<TextProps<'div'>>`
  font-family: PT Mono;
  font-style: normal;
  font-weight: 400;
  letter-spacing: ${rem(-0.1)};
  color: ${TextGray};
  max-width: ${rem(750)};
  margin-bottom: ${rem(25)};
`;

const HowItWorks = styled(TitleLink)`
  font-size: ${rem(18)};
`;

const CTAButtonStyles = css`
  font-family: 'PT Mono';
  letter-spacing: ${rem(2)};
  transition: 150ms background ease, 150ms color ease, 150ms border ease;
  min-width: ${rem(275)};
  margin: 0 ${rem(20)} ${rem(20)};
`;

const StartIssuingButton = styled(Button)<ButtonProps<'button'>>`
  ${CTAButtonStyles};
  ${FilledButtonStyles};
`;

const StartMintingButton = styled(Button)<ButtonProps<'button'>>`
  ${CTAButtonStyles};
  ${OutlineButtonStyles};
`;

const CTAButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
`;

export const Banner = () => {
  const { authorizeGitHub } = useAuthContext();
  return (
    <Container>
      <HeaderStyled>{'Immutable Records of your Contributions'}</HeaderStyled>
      <BannerSubHeader align="center" size="md">
        {
          'Issue digital badges as a special way to nurture your community. Earn them to build an unbiased track record of your work.'
        }
      </BannerSubHeader>
      <CTAButtons>
        <Link href="/onboard" passHref>
          <StartIssuingButton radius="md" size="xl" rightIcon={<FaArrowRight />}>
            {'START ISSUING'}
          </StartIssuingButton>
        </Link>
        <StartMintingButton
          onClick={authorizeGitHub}
          radius="md"
          size="xl"
          rightIcon={<FaArrowRight />}
          variant="outline"
        >
          {'START MINTING'}
        </StartMintingButton>
      </CTAButtons>
      <HowItWorks href="https://docs.gitpoap.io">{'How does it work?'}</HowItWorks>
    </Container>
  );
};
