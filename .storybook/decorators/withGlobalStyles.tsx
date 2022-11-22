import React from 'react';
import { HexagonPath } from '../../src/components/shared/elements';
import { GlobalStyles } from '../../src/styles/globalStyles';

export const withGlobalStyles = (storyFn: any) => {
  return (
    <>
      <GlobalStyles />
      <HexagonPath />
      {storyFn()}
    </>
  );
};
