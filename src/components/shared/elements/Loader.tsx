import React from 'react';
import styled from 'styled-components';
import { Loader as LoaderUI } from '@mantine/core';
import { PrimaryBlue } from '../../../colors';

const StyledLoader = styled(LoaderUI)`
  stroke: ${PrimaryBlue};
`;

export const Loader = (props: React.ComponentProps<typeof LoaderUI>) => {
  return <StyledLoader {...props} />;
};
