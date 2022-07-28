import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { Link } from './Link';
import { rem } from 'polished';
import { Burger, Collapse, Stack, Group } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { DividerGray1, TextLight, MidnightBlue } from '../colors';
import { BREAKPOINTS, TYPEFORM_LINKS } from '../constants';
import { GitPOAPLogo } from './shared/elements/icons/GitPOAPLogoWhite';
import { Wallet } from './wallet/Wallet';
import { GitHub } from './github/GitHub';
import { SearchBox } from './search/SearchBox';
import { useWeb3Context } from './wallet/Web3ContextProvider';
import { NavLink, NavLinkAnchor } from './shared/elements/NavLink';

const Nav = styled(Group)`
  color: ${TextLight} !important;
  z-index: 2;

  @media (max-width: ${rem(BREAKPOINTS.md)}) {
    background: ${MidnightBlue};
  }
`;

const Container = styled(Group)`
  width: 100%;
  height: ${rem(84)};
  padding: 0 ${rem(45)};

  @media (max-width: ${rem(BREAKPOINTS.lg)}) {
    padding: 0 ${rem(30)};
  }
`;

const LogoWrapper = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-decoration: none;
`;

const ContentRight = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  @media (max-width: ${rem(BREAKPOINTS.sm)}) {
    display: none;
  }
`;

const ClaimButton = styled(GitHub)`
  margin-right: ${rem(12)};
`;

const MobileBurgerButton = styled(Burger)`
  display: none;
  @media (max-width: ${rem(BREAKPOINTS.sm)}) {
    display: block;
  }
`;

const MobileCollapseMenu = styled(Collapse)`
  display: none;
  @media (max-width: ${rem(BREAKPOINTS.sm)}) {
    display: block;
  }
`;

const CollapseMenuContent = styled(Stack)`
  width: 100vw;
  padding: 0 3vw ${rem(16)};
  border-bottom: ${rem(1)} solid ${DividerGray1};
  text-align: center;

  > * {
    padding-bottom: ${rem(18)};
    margin: 0;
    &:not(:last-child) {
      border-bottom: ${rem(1)} solid ${DividerGray1};
    }
  }
`;

export const Navbar = () => {
  const router = useRouter();
  const { connectionStatus, address, ensName } = useWeb3Context();
  const matchesBreakpointLg = useMediaQuery(`(min-width: ${rem(BREAKPOINTS.lg)})`, false);
  const matchesBreakpointMd = useMediaQuery(`(min-width: ${rem(BREAKPOINTS.md)})`, false);
  const [isOpen, setIsOpen] = useState(false);
  const title = isOpen ? 'Close navigation' : 'Open navigation';

  const showPOAPsPage = false;
  const showOrgsPage = true;
  const showContributorsPage = false;

  useEffect(() => {
    setIsOpen(false);
  }, [router.asPath]);

  const navItems = (
    <>
      {matchesBreakpointMd && <SearchBox />}
      {showPOAPsPage && <NavLink href="/gitpoaps">{'GitPOAPs'}</NavLink>}
      <NavLink href="/repos">{'Repos'}</NavLink>
      {showOrgsPage && <NavLink href="/orgs">{'Orgs'}</NavLink>}
      {showContributorsPage && <NavLink href="/contributors">{'Contributors'}</NavLink>}
      <NavLinkAnchor href={'https://docs.gitpoap.io'} target="_blank" rel="noopener noreferrer">
        {'Docs'}
      </NavLinkAnchor>
      {connectionStatus === 'connected' && matchesBreakpointLg && (
        <NavLink href={`/p/${ensName ?? address}`}>{'Profile'}</NavLink>
      )}
      <ClaimButton />
      <Wallet hideText={!matchesBreakpointLg} />
    </>
  );

  const navItemsCollapsed = (
    <>
      <SearchBox />
      {showPOAPsPage && <NavLink href="/gitpoaps">{'GitPOAPs'}</NavLink>}
      <NavLink href="/repos">{'Repos'}</NavLink>
      {showOrgsPage && <NavLink href="/orgs">{'Orgs'}</NavLink>}
      {showContributorsPage && <NavLink href="/contributors">{'Contributors'}</NavLink>}
      <NavLinkAnchor href={'https://docs.gitpoap.io'} target="_blank" rel="noopener noreferrer">
        {'Docs'}
      </NavLinkAnchor>
      {connectionStatus === 'connected' && (
        <NavLink href={`/p/${ensName ?? address}`}>{'Profile'}</NavLink>
      )}
      <NavLink href={TYPEFORM_LINKS.feedback}>{'Add Feedback'}</NavLink>
      <ClaimButton />
      <Wallet />
    </>
  );

  return (
    <Nav>
      <Container position="apart">
        <LogoWrapper href="/" passHref>
          <GitPOAPLogo />
        </LogoWrapper>
        <ContentRight>{navItems}</ContentRight>
        <MobileBurgerButton
          opened={isOpen}
          onClick={() => setIsOpen((isOpen) => !isOpen)}
          title={title}
        />
      </Container>
      {/* Conditional prevents SSR hydration issue */}
      {typeof window !== 'undefined' && (
        <MobileCollapseMenu in={isOpen}>
          <CollapseMenuContent spacing="lg">{navItemsCollapsed}</CollapseMenuContent>
        </MobileCollapseMenu>
      )}
    </Nav>
  );
};
