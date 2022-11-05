import NextNProgress from 'nextjs-progressbar';
import React from 'react';

export const LoadingBar = () => {
  return (
    <NextNProgress
      color="#307AE8"
      startPosition={0.3}
      stopDelayMs={200}
      height={2}
      showOnShallow={false}
      options={{ showSpinner: false }}
    />
  );
};
