import React from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';
import { rem } from 'polished';
import { Header } from '../components/shared/elements/Header';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-self: center;
  flex: 1;
`;

const SubText = styled(Header)`
  font-size: ${rem(26)};
`;

const Custom404: NextPage = () => {
  return (
    <Container>
      <Header>{'404'}</Header>
      <SubText>{'This page could not be found'}</SubText>
    </Container>
  );
};

export default Custom404;
