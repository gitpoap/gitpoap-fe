import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { rem } from 'polished';
import { Burger, Collapse, Stack, Group } from '@mantine/core';
import { DividerGray1, TextLight, MidnightBlue } from '../colors';
import { BREAKPOINTS } from '../constants';
import { GitPOAPLogo } from './shared/elements/icons/GitPOAPLogoWhite';
import { Wallet } from './wallet/Wallet';
import { GitHub } from './github/GitHub';
import { SearchBox as SearchBoxUI } from './search/SearchBox';
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

const LogoWrapper = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-decoration: none;
`;

const ContentRight = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  @media (max-width: ${rem(BREAKPOINTS.md)}) {
    display: none;
  }
`;

const ClaimButton = styled(GitHub)`
  margin-right: ${rem(12)};

  @media (max-width: ${rem(BREAKPOINTS.md)}) {
    margin-right: 0;
  }
`;

const SearchBox = styled(SearchBoxUI)`
  margin-right: ${rem(25)};
  width: ${rem(300)};

  @media (max-width: ${rem(BREAKPOINTS.lg)}) {
    width: ${rem(240)};
  }

  @media (max-width: ${rem(BREAKPOINTS.md)}) {
    width: 100%;
  }
`;

const MobileBurgerButton = styled(Burger)`
  display: none;
  @media (max-width: ${rem(BREAKPOINTS.md)}) {
    display: block;
  }
`;

const MobileCollapseMenu = styled(Collapse)`
  display: none;
  @media (max-width: ${rem(BREAKPOINTS.md)}) {
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
  const { connectionStatus, address, ensName } = useWeb3Context();
  const [opened, setOpened] = useState(false);
  const title = opened ? 'Close navigation' : 'Open navigation';

  const showPOAPsPage = false;
  const showProjectsPage = false;
  const showContributorsPage = false;

  const navItems = (
    <>
      <SearchBox />
      {showPOAPsPage && <NavLink href="/poaps">{'POAPS'}</NavLink>}
      {showProjectsPage && <NavLink href="/projects">{'Projects'}</NavLink>}
      {showContributorsPage && <NavLink href="/contributors">{'Contributors'}</NavLink>}
      <NavLinkAnchor href={'https://docs.gitpoap.io'} target="_blank" rel="noopener noreferrer">
        {'Docs'}
      </NavLinkAnchor>
      {connectionStatus === 'connected' && (
        <NavLink href={`/p/${ensName ?? address}`}>{'Profile'}</NavLink>
      )}
      <ClaimButton />
      <Wallet />
    </>
  );

  return (
    <Nav>
      <Container position="apart">
        <Link href="/" passHref>
          <LogoWrapper>
            <GitPOAPLogo />
          </LogoWrapper>
        </Link>
        <ContentRight>{navItems}</ContentRight>
        <MobileBurgerButton opened={opened} onClick={() => setOpened((o) => !o)} title={title} />
      </Container>
      <MobileCollapseMenu in={opened}>
        <CollapseMenuContent spacing="lg">{navItems}</CollapseMenuContent>
      </MobileCollapseMenu>
    </Nav>
  );
};
