import React, { useCallback, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { rem } from 'polished';
import { FaDiscord, FaTwitter, FaMedium, FaGithub, FaCheckCircle } from 'react-icons/fa';
import { MdOutlineError, MdSend } from 'react-icons/md';
import { Box, BoxProps, Divider, Text, TextProps, Loader } from '@mantine/core';
import { validate } from 'email-validator';
import { GitPOAPLogo } from './shared/elements/icons/GitPOAPLogoWhite';
import {
  BackgroundPanel2,
  ExtraHover,
  ExtraPressed,
  TextDarkGray,
  TextGray,
  TextLight,
} from '../colors';
import { Link } from './Link';
import { Button, Input } from './shared/elements';
import { BREAKPOINTS } from '../constants';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 ${rem(45)};
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
  gap: ${rem(20)};
  font-family: PT Mono;
  font-style: normal;
  font-weight: normal;
  font-size: ${rem(12)};
  line-height: ${rem(17)};
  letter-spacing: ${rem(0.5)};
  color: ${TextGray};
  padding: ${rem(32)} 0;
`;

const GitPOAPLink = styled.a`
  text-decoration: none;
  display: flex;
  align-items: center;
`;

const FooterText = styled(Text)<TextProps<'div'>>`
  font-family: PT Mono;
  font-style: normal;
  font-weight: normal;
  font-weight: 400;
  font-size: ${rem(13)};
  line-height: ${rem(16)};
  letter-spacing: ${rem(-0.1)};
`;

const GitPOAPContent = styled(Box)<BoxProps<'div'>>`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: ${rem(340)};

  @media (max-width: ${rem(BREAKPOINTS.lg)}) {
    width: ${rem(340)};
  }

  @media (max-width: ${rem(BREAKPOINTS.md)}) {
    width: 100%;
    margin-bottom: ${rem(20)};
  }

  @media (max-width: ${rem(BREAKPOINTS.sm)}) {
    width: ${rem(340)};
    order: 1;
  }
`;

const FooterLinks = styled(Box)`
  display: flex;
  flex-direction: row;

  @media (max-width: ${rem(BREAKPOINTS.lg)}) {
    margin-bottom: ${rem(20)};
  }

  @media (max-width: ${rem(BREAKPOINTS.md)}) {
    margin-bottom: ${rem(20)};
    width: ${rem(280)};
    justify-content: space-between;
  }

  @media (max-width: ${rem(BREAKPOINTS.sm)}) {
    width: ${rem(340)};
    order: 3;
  }
`;

const Subscribe = styled(Box)`
  display: flex;
  flex-direction: column;

  @media (max-width: ${rem(BREAKPOINTS.lg)}) {
    width: ${rem(340)};
    margin-bottom: ${rem(20)};
    order: 1;
  }

  @media (max-width: ${rem(BREAKPOINTS.md)}) {
    width: ${rem(340)};
    margin-bottom: ${rem(20)};
  }

  @media (max-width: ${rem(BREAKPOINTS.sm)}) {
    margin-bottom: ${rem(40)};
  }
`;

const LinkColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  &:not(:last-child) {
    margin-right: ${rem(72)};

    @media (max-width: ${rem(BREAKPOINTS.lg)}) {
      margin-right: ${rem(48)};
    }

    @media (max-width: ${rem(BREAKPOINTS.md)}) {
      margin-right: ${rem(28)};
    }
  }

  > * {
    &:not(:first-child) {
      margin-top: ${rem(14)};
    }
  }
`;

const FooterHeader = styled.div`
  font-family: 'PT Mono';
  font-style: normal;
  font-weight: 700;
  font-size: ${rem(11)};
  line-height: ${rem(18)};
  letter-spacing: ${rem(1.2)};
  text-transform: uppercase;
  color: ${TextLight};
`;

const LinkStyles = css`
  font-size: ${rem(13)};
  font-weight: 700;
  letter-spacing: ${rem(0.5)};
  color: ${TextGray};
  transition: 150ms color ease;

  > * {
    color: ${TextGray};
    transition: 150ms color ease;
  }

  &:hover:not([disabled]) {
    color: ${ExtraHover};
    cursor: pointer;
    > * {
      color: ${ExtraHover};
    }
  }
  &:active:not([disabled]) {
    color: ${ExtraPressed};
    > * {
      color: ${ExtraPressed};
    }
  }
  &[disabled] {
    color: ${TextDarkGray};
    > * {
      color: ${TextDarkGray};
    }
  }
`;

const InternalLink = styled(Link)`
  ${LinkStyles};
`;

const OutboundLink = styled.a`
  ${LinkStyles};
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledGitPOAPLogo = styled(GitPOAPLogo)`
  margin-right: ${rem(8)};
  path {
    fill: ${TextGray};
  }
`;

type LoadingState = 'initial' | 'loading' | 'success' | 'error';

export const Footer = () => {
  const [loadingState, setLoadingState] = useState<LoadingState>('initial');
  const [email, setEmail] = useState<string>('');
  const [formStatus, setFormStatus] = useState<string>('');

  const isDisabled = !validate(email) || email.length === 0;

  const submitEmail = useCallback(async () => {
    try {
      setLoadingState('loading');
      const resJwt = await fetch(`${process.env.NEXT_PUBLIC_GITPOAP_API_URL}/jwt/`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const data = await (resJwt.json() as Promise<{ access_token: string }>);
      await fetch(`${process.env.NEXT_PUBLIC_GITPOAP_API_URL}/subscribe`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${data.access_token}`,
        },
        method: 'POST',
        body: JSON.stringify({ email: email }),
      });
      setLoadingState('success');
      setEmail('');
      setFormStatus('Thanks! Email successfully submitted');
    } catch (e) {
      console.warn(e);
      setLoadingState('error');
      setFormStatus('Please enter a valid email address');
    }
  }, [email]);

  useEffect(() => {
    if (formStatus.length > 0) {
      setTimeout(() => setFormStatus(''), 5000);
    }
  }, [formStatus]);

  return (
    <Content>
      <Divider style={{ borderTopColor: BackgroundPanel2 }} />
      <Container>
        <GitPOAPContent>
          <GitPOAPLink href={`https://gitpoap.io`} target="_blank" rel="noopener noreferrer">
            <StyledGitPOAPLogo style={{}} />
          </GitPOAPLink>
          <FooterText style={{ marginTop: rem(20) }}>
            {
              "We're memorializing software contributions as POAPs to help usher in new era of #web3"
            }
          </FooterText>
        </GitPOAPContent>

        <FooterLinks>
          <LinkColumn>
            <FooterHeader>{'Explore'}</FooterHeader>
            <InternalLink href="/">{'Home'}</InternalLink>
            <InternalLink href="/repos">{'Repos'}</InternalLink>
            <InternalLink href="/orgs">{'Orgs'}</InternalLink>
            {/* <InternalLink href="/events">{'Events'}</InternalLink> */}
          </LinkColumn>
          <LinkColumn>
            <FooterHeader>{'Community'}</FooterHeader>
            <OutboundLink
              href={'https://medium.com/gitpoap'}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaMedium style={{ marginRight: rem(7) }} />
              {'Medium'}
            </OutboundLink>
            <OutboundLink
              href={'https://twitter.com/gitpoap'}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter style={{ marginRight: rem(7) }} />
              {'Twitter'}
            </OutboundLink>
            <OutboundLink
              href={'https://gitpoap.io/discord'}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaDiscord style={{ marginRight: rem(7) }} />
              {'Discord'}
            </OutboundLink>
            <OutboundLink
              href={'https://github.com/gitpoap'}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub style={{ marginRight: rem(7) }} />
              {'GitHub'}
            </OutboundLink>
          </LinkColumn>
          <LinkColumn>
            <FooterHeader>{'About'}</FooterHeader>
            <OutboundLink href="https://docs.gitpoap.io" target="_blank" rel="noopener noreferrer">
              {'Docs'}
            </OutboundLink>
            <OutboundLink
              href="https://docs.gitpoap.io/about"
              target="_blank"
              rel="noopener noreferrer"
            >
              {'Team'}
            </OutboundLink>
            <InternalLink href="mailto:team@gitpoap.io">{'Contact Us'}</InternalLink>
          </LinkColumn>
        </FooterLinks>

        <Subscribe>
          <FooterHeader>{'Sign up for updates'}</FooterHeader>
          <Box style={{ marginTop: rem(12) }}>
            <Input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              placeholder={'Email'}
              value={email}
              error={!(validate(email) || email.length < 3)}
              style={{ marginRight: rem(7) }}
            />
            <Button
              onClick={async () => {
                if (validate(email)) {
                  await submitEmail();
                }
              }}
              disabled={isDisabled}
              rightIcon={
                loadingState === 'loading' ? (
                  <Loader color="white" size={14} />
                ) : loadingState === 'success' ? (
                  <FaCheckCircle color={isDisabled ? TextGray : 'white'} size={14} />
                ) : loadingState === 'error' ? (
                  <MdOutlineError color={isDisabled ? TextGray : 'white'} size={14} />
                ) : (
                  <MdSend color={isDisabled ? TextGray : 'white'} size={14} />
                )
              }
            >
              {'Sign Up'}
            </Button>
          </Box>
        </Subscribe>
      </Container>
    </Content>
  );
};
