import React from 'react';
import styled from 'styled-components';
import { Loader as LoaderUI } from '@mantine/core';
import { ExtraHover } from '../../../colors';

const StyledLoader = styled(LoaderUI)`
  stroke: ${ExtraHover};
`;

export const Loader = (props: React.ComponentProps<typeof LoaderUI>) => {
  return <StyledLoader {...props} />;
};
