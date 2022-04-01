import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { FaDiscord as DiscordIcon, FaTwitter as TwitterIcon } from 'react-icons/fa';
import { Divider } from '@mantine/core';
import { GitPOAP } from './shared/elements/icons/GitPOAP';
import { BackgroundPanel2, ExtraHover, TextGray } from '../colors';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 ${rem(45)};
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-family: PT Mono;
  font-style: normal;
  font-weight: normal;
  font-size: ${rem(12)};
  line-height: ${rem(17)};
  letter-spacing: ${rem(0.5)};
  color: ${TextGray};
  padding: ${rem(32)} 0;
`;

const ContentLeft = styled.div`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
`;

const ContentRight = styled.div`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
`;

const SocialLink = styled.a`
  text-decoration: none;
  color: inherit;

  &:hover {
    color: ${ExtraHover};
  }

  svg {
    height: ${rem(24)};
    margin: 0 ${rem(12)};
    width: ${rem(24)};
  }
`;

const GitPOAPLink = styled.a`
  text-decoration: none;
  display: flex;
  align-items: center;
`;

export const Footer = () => {
  return (
    <Content>
      <Divider style={{ borderTopColor: BackgroundPanel2 }} />
      <Container>
        <ContentLeft>
          <GitPOAPLink href={`https://gitpoap.io`} target="_blank" rel="noopener noreferrer">
            <GitPOAP style={{ marginRight: rem(8) }} />
          </GitPOAPLink>
          {'GitPOAP 2022'}
        </ContentLeft>
        <ContentRight>
          <SocialLink href={'https://gitpoap.io/discord'} target="_blank" rel="noopener noreferrer">
            <DiscordIcon />
          </SocialLink>
          <SocialLink
            href={'https://twitter.com/gitpoap'}
            target="_blank"
            rel="noopener noreferrer"
          >
            <TwitterIcon />
          </SocialLink>
        </ContentRight>
      </Container>
    </Content>
  );
};
