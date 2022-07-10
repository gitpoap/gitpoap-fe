import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { Grid } from '@mantine/core';
import { Body, BodyAsAnchor, Button, Header, InfoHexBase, Text } from '../shared/elements';
import { FaArrowRight } from 'react-icons/fa';
import { GoMarkGithub } from 'react-icons/go';
import { BREAKPOINTS } from '../../constants';
import { useClaimModalContext } from '../ClaimModal/ClaimModalContext';

const InfoHexHeader = styled(Header)`
  margin-bottom: ${rem(20)};
  font-size: ${rem(36)};
  line-height: ${rem(48)};
  text-align: center;
`;

const InfoHexText = styled(Text)`
  letter-spacing: -0.1px;
  font-size: ${rem(16)};
  line-height: ${rem(24)};
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

const BODY_HEIGHT = 20;

const InfoHex = styled(InfoHexBase)`
  width: ${rem(600)};
  max-width: 100%;

  ${Body}, ${BodyAsAnchor} {
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

const ButtonStyled = styled(Button)`
  pointer-events: none;
`;

export const FurtherInfoFor = () => {
  const { setIsOpen } = useClaimModalContext();

  return (
    <>
      <Container xs={10} sm={10} md={5} lg={5} xl={5}>
        <InfoHex onClick={() => setIsOpen(true)} hoverEffects>
          <Content>
            <InfoHexHeader>{'For Contributors'}</InfoHexHeader>
            <InfoHexText>
              {`Collect GitPOAPs for your meaningful contributions to open source community & unbiased reputation for your work visible via your profile page.`}
            </InfoHexText>
            <ButtonStyled style={{ marginTop: rem(40) }} leftIcon={<GoMarkGithub size={16} />}>
              {'Claim POAPs'}
            </ButtonStyled>
          </Content>
        </InfoHex>
      </Container>
      <Container xs={10} sm={10} md={5} lg={5} xl={5}>
        <InfoHex href="/repos" hoverEffects>
          <Content>
            <InfoHexHeader>{'For Repo Owners'}</InfoHexHeader>
            <InfoHexText>
              {`Distribute GitPOAPs to contributors for their meaningful contributions to the open source community & build an unbiased reputation for your work visible via your profile page.`}
            </InfoHexText>
            <ButtonStyled style={{ marginTop: rem(40) }} rightIcon={<FaArrowRight />}>
              {'View Repos'}
            </ButtonStyled>
          </Content>
        </InfoHex>
      </Container>
    </>
  );
};
