import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { Grid } from '@mantine/core';
import { Button, Header, Text } from '../shared/elements';
import { Link } from '../shared/compounds/Link';
import { FaArrowRight } from 'react-icons/fa';
import { HowGraphic } from './HowGraphic';
import { BREAKPOINTS } from '../../constants';

const GraphicContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledText = styled(Text)`
  letter-spacing: -0.1px;
  font-size: ${rem(16)};
  line-height: ${rem(24)};
`;

const HowGraphicStyled = styled(HowGraphic)`
  @media (max-width: ${rem(BREAKPOINTS.lg)}) {
    width: 100%;
  }
`;

export const FurtherInfoHow = () => {
  return (
    <>
      <Grid.Col xs={10} sm={10} md={5} lg={5} xl={5}>
        <Header>{'How it works'}</Header>
        <StyledText style={{ marginTop: rem(35) }}>
          <b>{'A POAP '}</b>
          {`is a digital collectible created as an NFT that represents an action taken by the owner. POAPs exist with cryptographic provability on the blockchain and are displayable as badges & viewable by anyone.`}
        </StyledText>
        <StyledText style={{ marginTop: rem(25), marginBottom: rem(35) }}>
          <b>{`A GitPOAP `}</b>
          {`is a regular POAP (with an extra spin) that is minted through the GitPOAP platform for meaningful contributions. Repo owners can automatically distribute GitPOAPs to their contributors as recognition of their work.
          `}
        </StyledText>
        <Link href="https://docs.gitpoap.io" rel="noopener noreferrer" target="_blank">
          <Button variant="outline" rightIcon={<FaArrowRight />}>
            {'See Docs'}
          </Button>
        </Link>
      </Grid.Col>
      <Grid.Col xs={10} sm={10} md={5} lg={5} xl={5}>
        <GraphicContainer>
          <HowGraphicStyled />
        </GraphicContainer>
      </Grid.Col>
    </>
  );
};
