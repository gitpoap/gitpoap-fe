import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { Header } from '../../shared/elements/Header';
import { BREAKPOINTS } from '../../../constants';

type Props = {
  title: string;
  className?: string;
  children?: React.ReactNode;
};

export type SelectOption<T = string> = { value: T; label: string };

const Container = styled.div`
  display: inline-flex;
  flex-direction: column;
  width: 100%;
`;

const Heading = styled.div`
  display: inline-flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ListTitle = styled(Header)`
  font-size: ${rem(30)};
  line-height: ${rem(42)};

  @media (max-width: ${BREAKPOINTS.sm}px) {
    font-size: ${rem(26)};
    line-height: ${rem(32)};
  }
`;

export const SearchResultList = ({ children, className, title }: Props) => {
  return (
    <Container className={className}>
      <Heading>
        <ListTitle>{title}</ListTitle>
      </Heading>
      {children}
    </Container>
  );
};
