import styled from 'styled-components';
import { rem } from 'polished';
import { NextPageWithLayout } from '../_app';
import Head from 'next/head';
import { Link } from '../../components/shared/compounds/Link';
import { Grid, Stack } from '@mantine/core';
import { Header } from '../../components/shared/elements';
import { ExtraHover, ExtraPressed } from '../../colors';

const pages = [
  {
    title: 'Add Codes',
    href: '/admin/codes',
  },
  {
    title: 'GitPOAP Requests',
    href: '/admin/gitpoap/requests',
  },
  {
    title: 'Create GitPOAPs',
    href: '/admin/gitpoap/create-multiple',
  },
  {
    title: 'Create GitPOAPs for Events',
    href: '/admin/gitpoap/create-multiple-event',
  },
  {
    title: 'Claims Dashboard',
    href: '/admin/gitpoap/claims',
  },
  {
    title: 'Repos Dashboard',
    href: '/admin/repos',
  },
  {
    title: 'Vitals Dashboard',
    href: '/admin/vitals',
  },
];

const HeaderLink = styled(Header)`
  align-self: start;
  transition: 150ms color ease;
  &:hover {
    color: ${ExtraHover};
    cursor: pointer;
  }
  &:active {
    color: ${ExtraPressed};
  }
`;

const AdminHome: NextPageWithLayout = () => {
  return (
    <div>
      <Head>
        <title>{'Admin | GitPOAP'}</title>
        <meta name="description" content="GitPOAP Admin" />
      </Head>
      <Grid
        justify="center"
        style={{
          flex: 1,
          marginTop: rem(40),
          marginBottom: rem(20),
        }}
      >
        <Grid.Col span={10}>
          <Stack align="start" justify="left">
            {pages.map((page) => {
              return (
                <Link key={page.href} href={page.href} passHref>
                  <HeaderLink>{page.title}</HeaderLink>
                </Link>
              );
            })}
          </Stack>
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default AdminHome;
