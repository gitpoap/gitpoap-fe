import { Box, Container, NavLink } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { rem } from 'polished';
import { FaBell, FaPaintBrush } from 'react-icons/fa';
import { GoSettings } from 'react-icons/go';
import styled from 'styled-components';
import { GitHub, People } from '../shared/elements/icons';

const Wrapper = styled(Container)`
  width: 100vw;
`;

const PeopleIcon = styled(People)`
  color: inherit;
  & * {
    fill: currentColor;
  }
`;

export const SettingsPageLayout = (page: React.ReactNode) => {
  const { asPath } = useRouter();

  return (
    <Wrapper size={800} my={48}>
      <Container style={{ display: 'flex', flexWrap: 'wrap', gap: rem(48) }}>
        <Box sx={() => ({ minWidth: rem(200) })}>
          <Link href="/settings/profile" passHref>
            <NavLink
              active={asPath === '/settings' || asPath === '/settings/profile'}
              label="Profile"
              icon={<PeopleIcon />}
            />
          </Link>
        </Box>
        <Box style={{ flex: 1, minWidth: rem(400) }}>{page}</Box>
      </Container>
    </Wrapper>
  );
};
