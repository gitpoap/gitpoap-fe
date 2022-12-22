import React, { useCallback, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { rem } from 'polished';
import { FaDiscord, FaTwitter, FaMedium, FaGithub, FaCheckCircle } from 'react-icons/fa';
import { MdOutlineError, MdSend } from 'react-icons/md';
import { Box, Divider, Text, TextProps, Loader, Group, Stack } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
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
import { Link } from './shared/compounds/Link';
import { Button, Input } from './shared/elements';
import { BREAKPOINTS } from '../constants';
import { GITPOAP_API_URL } from '../environment';
import { trackClickEmailSignup } from '../lib/tracking/events';

const Container = styled(Group)`
  justify-content: space-evenly;
  gap: ${rem(20)};
  font-size: ${rem(12)};
  line-height: ${rem(17)};
  letter-spacing: ${rem(0.5)};
`;

const GitPOAPLink = styled.a`
  text-decoration: none;
  display: flex;
  align-items: center;
`;

const FooterText = styled(Text)<TextProps>`
  line-height: ${rem(16)};
  letter-spacing: ${rem(-0.1)};
`;

const GitPOAPContent = styled(Stack)`
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

const FooterLinks = styled(Group)`
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

const Subscribe = styled(Stack)`
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

const LinkColumn = styled(Stack)`
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

const FooterHeader = (props: { children: React.ReactNode }) => (
  <Text
    size={11}
    color={TextLight}
    transform="uppercase"
    weight={700}
    sx={{ lineHeight: rem(18), letterSpacing: rem(1.2) }}
  >
    {props.children}
  </Text>
);

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
  const matchesBreakpointSm = useMediaQuery(`(min-width: ${rem(BREAKPOINTS.sm)})`, false);

  const isDisabled = !validate(email) || email.length === 0;

  const submitEmail = useCallback(async () => {
    try {
      setLoadingState('loading');
      const resJwt = await fetch(`${GITPOAP_API_URL}/jwt/`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const data = await (resJwt.json() as Promise<{ access_token: string }>);
      await fetch(`${GITPOAP_API_URL}/subscribe`, {
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
    <Stack id="contact" py={0} px={rem(45)} spacing={0}>
      <Divider style={{ borderTopColor: BackgroundPanel2 }} />
      <Container py={rem(32)} px={0} spacing={0} align="flex-start">
        <GitPOAPContent spacing={0}>
          <GitPOAPLink href={`https://gitpoap.io`} target="_blank" rel="noopener noreferrer">
            <StyledGitPOAPLogo style={{}} />
          </GitPOAPLink>
          <FooterText style={{ marginTop: rem(20) }} weight={400} size={13}>
            {
              "We're memorializing software contributions as GitPOAPs to help usher in a new era of #web3"
            }
          </FooterText>
        </GitPOAPContent>

        <FooterLinks spacing={0} align="flex-start">
          <LinkColumn spacing={0} justify="flex-start">
            <FooterHeader>{'Explore'}</FooterHeader>
            <InternalLink href="/">{'Home'}</InternalLink>
            <InternalLink href="/repos">{'Repos'}</InternalLink>
            <InternalLink href="/orgs">{'Orgs'}</InternalLink>
            <InternalLink href="/gitpoaps">{'GitPOAPs'}</InternalLink>
          </LinkColumn>
          <LinkColumn spacing={0} justify="flex-start">
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
          <LinkColumn spacing={0} justify="flex-start">
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
            <InternalLink href="mailto:team@gitpoap.io">{'Contact'}</InternalLink>
          </LinkColumn>
        </FooterLinks>

        <Subscribe spacing={0} justify="flex-start">
          <FooterHeader>{'Sign up for updates'}</FooterHeader>
          <Box style={{ marginTop: rem(12), display: 'flex' }}>
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
                  trackClickEmailSignup('footer');
                  await submitEmail();
                }
              }}
              disabled={isDisabled}
              style={{ height: rem(36) }}
              styles={() => ({
                rightIcon: {
                  marginLeft: matchesBreakpointSm ? 10 : 0,
                },
              })}
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
              {matchesBreakpointSm && 'Sign Up'}
            </Button>
          </Box>
        </Subscribe>
      </Container>
    </Stack>
  );
};
