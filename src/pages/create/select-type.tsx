import { NextPageWithLayout } from '../_app';
import Head from 'next/head';
import Link from 'next/link';
import { rem } from 'polished';
import { Grid, Text, Group } from '@mantine/core';
import styled from 'styled-components';
import { Header } from '../../components/shared/elements';
import { SelectGitPOAPType } from '../../components/onboard/SelectGitPOAPType';
import { TextGray } from '../../colors';
import { BREAKPOINTS } from '../../constants';

const Container = styled(Grid)`
  width: 100%;
  height: ${rem(84)};
  padding: 0 ${rem(45)};
  flex: 1;

  @media (max-width: ${rem(BREAKPOINTS.lg)}) {
    padding: 0 ${rem(30)};
  }
`;

const SelectType: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>{'Create - Select Type | GitPOAP'}</title>
      </Head>
      <Container justify="center" mt={rem(20)} px={rem(45)}>
        <Grid.Col span={10}>
          <Group align="stretch" style={{ width: '100%' }}>
            <Link href={`/`}>
              <Text mb="xs" variant="link" sx={{ color: TextGray }}>
                {'< BACK TO HOME'}
              </Text>
            </Link>
          </Group>
          <Header size={32} mb={rem(20)}>
            {'Create GitPOAP - Select Type'}
          </Header>
          <SelectGitPOAPType />
        </Grid.Col>
      </Container>
    </>
  );
};

export default SelectType;
