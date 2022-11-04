import { useEffect, useCallback, useRef, useState } from 'react';
import { useQuery, UseQueryArgs, UseQueryResponse } from 'urql';

export const useLazyQuery: <T extends Record<string, unknown>>(
  args: Omit<UseQueryArgs, 'variables' | 'pause'>,
) => UseQueryResponse<T> = (args) => {
  const firstUpdate = useRef(true);
  const [variables, setVariables] = useState<UseQueryArgs['variables']>();

  const [result, refetch] = useQuery({
    ...args,
    variables,
    pause: true,
  });

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    refetch();
  }, [refetch, variables]);

  const makeRequest = useCallback((reqVariables: UseQueryArgs['variables']) => {
    setVariables(reqVariables);
  }, []);

  return [result, makeRequest];
};
