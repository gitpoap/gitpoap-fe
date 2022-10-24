import { Box, Container, Divider, Group, Header, NavLink, Stack } from '@mantine/core';
import { Jazzicon } from '@ukstv/jazzicon-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { rem } from 'polished';
import { FaBell, FaPaintBrush } from 'react-icons/fa';
import { GoSettings } from 'react-icons/go';
import styled from 'styled-components';
import { TextAccent } from '../../colors';
import { truncateAddress } from '../../helpers';
import { useUser } from '../../hooks/useUser';
import { Avatar as AvatarUI, Button, CopyableText, Header as HeaderUI } from '../shared/elements';
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

const Name = styled(HeaderUI)`
  font-size: ${rem(32)};
  line-height: ${rem(32)};
  color: ${TextAccent};
`;

const Avatar = styled(AvatarUI)`
  height: ${rem(48)};
  width: ${rem(48)};
`;

const JazzIcon = styled(Jazzicon)`
  height: ${rem(48)};
  width: ${rem(48)};
`;

export const SettingsPageLayout = ({ children }: { children: React.ReactNode }) => {
  const { asPath, router } = useRouter();
  const user = useUser();

  if (!user) {
    return <></>;
  }

  return (
    <Wrapper size={1000} my={48}>
      <Group position="apart" mb={48}>
        <Group>
          {user?.ensAvatarImageUrl ? (
            <Avatar src={user?.ensAvatarImageUrl} />
          ) : (
            <JazzIcon address={user.address} />
          )}
          <Stack spacing={4}>
            <Name>{user.ensName ?? truncateAddress(user.address, 14)}</Name>
            <CopyableText text={truncateAddress(user.address, 14)} textToCopy={user.address} />
          </Stack>
        </Group>
        <Button onClick={() => router.push(`/p/${user.ensName ?? user.address}`)} variant="outline">
          {'Visit Profile'}
        </Button>
      </Group>

      <Box style={{ display: 'flex', flexWrap: 'wrap' }}>
        <Box sx={() => ({ minWidth: rem(200) })} mb={48}>
          <Link href="/settings/profile" passHref>
            <NavLink
              active={asPath === '/settings' || asPath === '/settings/profile'}
              label="Settings"
              icon={<PeopleIcon />}
            />
          </Link>
          {/* <Link href="/settings/profile" passHref>
            <NavLink
              active={asPath === '/settings' || asPath === '/settings/integrations'}
              label="Integrations"
              icon={<GitHub />}
            />
          </Link>
          <Link href="/settings/profile" passHref>
            <NavLink
              active={asPath === '/settings' || asPath === '/settings/appearance'}
              label="Appearance"
              icon={<FaPaintBrush />}
            />
          </Link>
          <Link href="/settings/profile" passHref>
            <NavLink
              active={asPath === '/settings' || asPath === '/settings/notifications'}
              label="Notifications"
              icon={<FaBell />}
            />
          </Link> */}
        </Box>
        <Box style={{ flex: 1, minWidth: rem(400), width: '100%' }}>{children}</Box>
      </Box>
    </Wrapper>
  );
};
