import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { Link } from './shared/compounds/Link';
import { rem } from 'polished';
import { Burger, Collapse, Stack, Group } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { DividerGray1, TextLight, MidnightBlue } from '../colors';
import { BREAKPOINTS, TYPEFORM_LINKS } from '../constants';
import { GitPOAPLogo } from './shared/elements/icons/GitPOAPLogoWhite';
import { Wallet } from './wallet/Wallet';
import { ConnectionButton } from './oauth/ConnectionButton';
import { SearchBox } from './search/box/SearchBox';
import { NavLink } from './shared/elements/NavLink';
import { useWeb3Context, ConnectionStatus } from './wallet/Web3Context';

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

const ClaimButton = styled(ConnectionButton)`
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

  const { connectionStatus, ensName, address } = useWeb3Context();

  const matches1330 = useMediaQuery(`(min-width: ${rem(1330)})`, false);
  const matchesLg = useMediaQuery(`(min-width: ${rem(BREAKPOINTS.lg)})`, false);
  const matchesMd = useMediaQuery(`(min-width: ${rem(BREAKPOINTS.md)})`, false);
  const [isOpen, setIsOpen] = useState(false);
  const title = isOpen ? 'Close navigation' : 'Open navigation';

  const showContributorsPage = false;

  useEffect(() => {
    setIsOpen(false);
  }, [router.asPath]);

  const navItems = (
    <>
      {matchesMd && <SearchBox />}
      <NavLink href="/gitpoaps">{'GitPOAPs'}</NavLink>
      <NavLink href="/repos">{'Repos'}</NavLink>
      <NavLink href="/orgs">{'Orgs'}</NavLink>
      {showContributorsPage && <NavLink href="/contributors">{'Contributors'}</NavLink>}
      <NavLink href={'https://docs.gitpoap.io'} target="_blank" rel="noopener noreferrer">
        {'Docs'}
      </NavLink>
      <ClaimButton hideText={!matchesLg} />
      <Wallet hideText={!matches1330} isMobile={false} />
    </>
  );

  const navItemsCollapsed = (
    <>
      <SearchBox />
      <NavLink href="/gitpoaps">{'GitPOAPs'}</NavLink>
      <NavLink href="/repos">{'Repos'}</NavLink>
      <NavLink href="/orgs">{'Orgs'}</NavLink>
      {showContributorsPage && <NavLink href="/contributors">{'Contributors'}</NavLink>}
      <NavLink href={'https://docs.gitpoap.io'} target="_blank" rel="noopener noreferrer">
        {'Docs'}
      </NavLink>
      {connectionStatus === ConnectionStatus.CONNECTED_TO_WALLET && (
        <>
          <NavLink href={`/p/${ensName ?? address}`}>{'Profile'}</NavLink>
          <NavLink href={`/settings`}>{'Settings'}</NavLink>
        </>
      )}
      <NavLink href={TYPEFORM_LINKS.feedback}>{'Add Feedback'}</NavLink>
      <ClaimButton />
      <Wallet isMobile={true} />
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
      <MobileCollapseMenu in={isOpen}>
        <CollapseMenuContent spacing="lg">{navItemsCollapsed}</CollapseMenuContent>
      </MobileCollapseMenu>
    </Nav>
  );
};
