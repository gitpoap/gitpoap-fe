import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Pagination } from '../components/shared/elements/Pagination';

export default {
  title: 'Elements/Pagination',
  component: Pagination,
} as ComponentMeta<typeof Pagination>;

export const Default: ComponentStory<typeof Pagination> = () => {
  const [page, setPage] = useState(1);

  return <Pagination page={page} onChange={setPage} total={3} withControls={false} />;
};
