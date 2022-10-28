import React from 'react';
import { Pagination as PaginationUI } from '@mantine/core';

export const Pagination = (props: React.ComponentProps<typeof PaginationUI>) => (
  <PaginationUI {...props} />
);
