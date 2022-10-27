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

const SubHeder = styled(Header)`
  font-size: ${rem(32)};
`;

const BreadCrumbs = styled(Text)<TextProps>`
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
      <Grid
        justify="left"
        mt={rem(20)}
        mb={rem(20)}
        style={{
          flex: 1,
        }}
        px={rem(45)}
      >
        <Grid.Col>
          <Link href="\">
            <BreadCrumbs size={12} transform="uppercase">
              <Group align="center" spacing="sm">
                <IoIosArrowBack />
                {'Back to Home'}
              </Group>
            </BreadCrumbs>
          </Link>
          <Header mt={rem(10)}>{'Create GitPOAP'}</Header>
          <SubHeder mt={rem(20)}>{'Select a type of a GitPOAP'}</SubHeder>
        </Grid.Col>
        <Grid.Col xs={12} sm={12} md={12} lg={12} xl={12}>
          <SelectGitPOAPType />
        </Grid.Col>
      </Grid>
    </>
  );
};

export default SelectType;
