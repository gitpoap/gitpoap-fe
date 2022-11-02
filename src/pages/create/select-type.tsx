import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { rem } from 'polished';
import { Grid, Text, TextProps, Group } from '@mantine/core';
import { IoIosArrowBack } from 'react-icons/io';
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

const SubHeder = styled(Header)`
  font-size: ${rem(32)};
`;

const BreadCrumbs = styled(Text)<TextProps>`
  display: inline-flex;
  color: ${TextGray};
  cursor: pointer;
`;

const SelectType: NextPage = () => {
  return (
    <>
      <Head>
        <title>{'Onboarding | GitPOAP'}</title>
        <meta
          name="Submit your repos to GitPOAP - a decentralized reputation platform that represents off-chain accomplishments and contributions on chain as POAPs."
          content="Submit Repos"
        />
      </Head>
      <Container justify="center" mt={rem(20)} mb={rem(20)} px={rem(45)}>
        <Grid.Col span={10}>
          <Link href="\">
            <BreadCrumbs variant="link" size={12} transform="uppercase">
              <Group align="center" spacing="sm">
                <IoIosArrowBack />
                {'Back to Home'}
              </Group>
            </BreadCrumbs>
          </Link>
          <Header mt={rem(10)} size={32}>
            {'Create GitPOAP'}
          </Header>
          <SubHeder mt={rem(20)}>{'Select GitPOAP type'}</SubHeder>
        </Grid.Col>
        <Grid.Col span={10}>
          <SelectGitPOAPType />
        </Grid.Col>
      </Container>
    </>
  );
};

export default SelectType;
