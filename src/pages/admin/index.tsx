import styled from 'styled-components';
import { rem } from 'polished';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Grid, Group } from '@mantine/core';
import { Header } from '../../components/shared/elements';
import { ExtraHover, ExtraPressed } from '../../colors';

const pages = [
  {
    title: 'Add Codes',
    href: '/admin/codes',
  },
  {
    title: 'Create GitPOAP - Single',
    href: '/admin/gitpoap/create',
  },
  {
    title: 'Create GitPOAP for Events - Multiple',
    href: '/admin/gitpoap/create_for_event',
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

const AdminHome: NextPage = () => {
  return (
    <div>
      <Head>
        <title>{'Admin | GitPOAP'}</title>
        <meta name="description" content="GitPOAP Admin" />
      </Head>
      <Grid style={{ marginTop: rem(40) }}>
        <Grid.Col span={10} offset={1}>
          <Group direction="column" align="start" position="left">
            {pages.map((page) => {
              return (
                <Link key={page.href} href={page.href} passHref>
                  <HeaderLink>{page.title}</HeaderLink>
                </Link>
              );
            })}
          </Group>
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default AdminHome;
