import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { TextGray, TextLight } from '../../colors';
import { TitleLink } from '../shared/elements';
import { FilledButtonStyles, OutlineButtonStyles } from '../shared/elements/Button';
import { Button, SharedButtonProps, Text, TextProps } from '@mantine/core';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from '../Link';

const Container = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  margin-bottom: ${rem(20)};
  margin-top: ${rem(75)};
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
  font-size: ${rem(28)};
  line-height: ${rem(30)};
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

const HowItWorks = styled(TitleLink)``;

const StartIssuingButton = styled(Button)<SharedButtonProps>`
  font-family: 'PT Mono';
  letter-spacing: ${rem(2)};
  transition: 150ms background ease, 150ms color ease, 150ms border ease;
  margin-bottom: ${rem(30)};
  margin-right: ${rem(20)};
  ${FilledButtonStyles};
`;

const StartMintingButton = styled(Button)<SharedButtonProps>`
  font-family: 'PT Mono';
  letter-spacing: ${rem(2)};
  transition: 150ms background ease, 150ms color ease, 150ms border ease;
  margin-bottom: ${rem(20)};
  margin-left: ${rem(20)};
  ${OutlineButtonStyles};
`;

const CTAButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const Banner = () => {
  return (
    <Container>
      <HeaderStyled>{'Build your decentralized professional reputation'}</HeaderStyled>
      <BannerSubHeader align="center" size="md">
        {
          'Recognize, nurture, and grow your community of contributors through the distribution of GitPOAPs & help them build an unbiased record of their work.'
        }
      </BannerSubHeader>
      <CTAButtons>
        <Link href="/onboard" passHref>
          <StartIssuingButton radius="md" size="xl" rightIcon={<FaArrowRight />}>
            {'START ISSUING'}
          </StartIssuingButton>
        </Link>
        <StartMintingButton radius="md" size="xl" rightIcon={<FaArrowRight />} variant="outline">
          {'START MINTING'}
        </StartMintingButton>
      </CTAButtons>
      <HowItWorks href="https://docs.gitpoap.io">{'How does it work?'}</HowItWorks>
    </Container>
  );
};
