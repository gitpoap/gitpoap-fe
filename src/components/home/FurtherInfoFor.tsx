import React, { useEffect } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { Grid } from '@mantine/core';
import { Body, Button, Header, InfoHexBase, Text } from '../shared/elements';
import { FaArrowRight } from 'react-icons/fa';
import { BREAKPOINTS } from '../../constants';
import { useClaimContext } from '../claims/ClaimContext';
import { ExtraHover, ExtraPressed } from '../../colors';
import { useLocalStorage } from '@mantine/hooks';
import { useAuthContext } from '../../hooks/useAuthContext';
import { GitPOAP } from '../shared/elements/icons';

const InfoHexHeader = styled(Header)`
  margin-bottom: ${rem(20)};
  font-size: ${rem(36)};
  line-height: ${rem(48)};
  text-align: center;
`;

const InfoHexText = styled(Text)`
  letter-spacing: ${rem(-0.1)};
  font-size: ${rem(16)};
  line-height: ${rem(22)};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${rem(0)} ${rem(20)};
  min-height: ${rem(100)};
  padding: ${rem(10)} ${rem(60)};
  text-align: center;
`;

const ButtonStyled = styled(Button)`
  pointer-events: none;
`;

const BODY_HEIGHT = 20;

const InfoHex = styled(InfoHexBase)`
  width: ${rem(600)};
  max-width: 100%;

  ${Body} {
    display: flex;
    align-items: center;
    justify-content: center;

    min-height: ${rem(310)};
    margin-top: ${rem(BODY_HEIGHT)};
    margin-bottom: ${rem(BODY_HEIGHT)};
    padding: ${rem(15)} 0;

    &:before {
      height: ${rem(BODY_HEIGHT)};
      top: ${rem(-BODY_HEIGHT)};
    }
    &:after {
      height: ${rem(BODY_HEIGHT)};
      bottom: ${rem(-BODY_HEIGHT)};
    }
  }

  &:hover {
    ${ButtonStyled} {
      background-color: ${ExtraHover};
    }
  }
  &:active {
    ${ButtonStyled} {
      background-color: ${ExtraPressed};
    }
  }

  @media (max-width: ${rem(BREAKPOINTS.lg)}) {
    ${Content} {
      padding: ${rem(10)} ${rem(20)};
    }

    ${InfoHexText} {
      font-size: ${rem(16)};
    }
  }
`;

const Container = styled(Grid.Col)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GitPOAPIcon = styled(GitPOAP)`
  path {
    fill: white;
  }
`;

export const FurtherInfoFor = () => {
  const { setIsOpen } = useClaimContext();
  const { user } = useAuthContext();
  const hasGithub = user?.capabilities.hasGithub ?? false;
  const [isFurtherInfoClaimButtonClicked, setIsFurtherInfoClaimButtonClicked] =
    useLocalStorage<boolean>({
      key: 'isFurtherInfoClaimButtonClicked',
      defaultValue: false,
    });

  useEffect(() => {
    if (hasGithub && isFurtherInfoClaimButtonClicked) {
      setIsOpen(true);
      setIsFurtherInfoClaimButtonClicked(false);
    }
  }, [hasGithub, isFurtherInfoClaimButtonClicked]);

  return (
    <>
      <Container xs={10} sm={10} md={5} lg={5} xl={5}>
        <InfoHex href="/eligibility" hoverEffects>
          <Content>
            <InfoHexHeader>{'For Contributors'}</InfoHexHeader>
            <InfoHexText>
              {`Create a public, immutable, & unbiased record of your contributions & show it off via your profile.`}
            </InfoHexText>
            <ButtonStyled style={{ marginTop: rem(40) }} leftIcon={<GitPOAPIcon />}>
              {'Check Eligibility'}
            </ButtonStyled>
          </Content>
        </InfoHex>
      </Container>
      <Container xs={10} sm={10} md={5} lg={5} xl={5}>
        <InfoHex href="/onboard" hoverEffects>
          <Content>
            <InfoHexHeader>{'For Repo Owners'}</InfoHexHeader>
            <InfoHexText>
              {`Recognize, nurture, and grow your community of contributors through the distribution of GitPOAPs & help them build an unbiased record of their work.`}
            </InfoHexText>
            <ButtonStyled style={{ marginTop: rem(40) }} rightIcon={<FaArrowRight />}>
              {'Add Repos'}
            </ButtonStyled>
          </Content>
        </InfoHex>
      </Container>
    </>
  );
};
