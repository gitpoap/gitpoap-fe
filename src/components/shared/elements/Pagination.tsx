import React from 'react';
import styled from 'styled-components';
import { Pagination as PaginationUI } from '@mantine/core';
import { BackgroundPanel2, PrimaryBlue } from '../../../colors';

const StyledPagination = styled(PaginationUI)`
  .mantine-Pagination-item {
    background-color: ${BackgroundPanel2};
    color: white;
    &[data-active='true'] {
      background-color: ${PrimaryBlue};
      color: white;
    }
  }
`;

export const Pagination = (props: React.ComponentProps<typeof PaginationUI>) => {
  return <StyledPagination {...props} />;
};
