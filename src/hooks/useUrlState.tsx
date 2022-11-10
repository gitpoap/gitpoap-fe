import { useDebouncedValue } from '@mantine/hooks';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

/**
 * This hook is used to sync the state of a value with a field in the URL query string. In
 * addition to acting as the source of truth for that piece of state, the hook also
 * sets the value within state to the value in the URL query string on initial load.
 *
 * Finally, the hook debounces the value in state and updates the URL query string.
 */
export const useUrlState = (key: string) => {
  const router = useRouter();
  const isReady = router.isReady;
  const urlValue = router.query[key] as string | undefined;
  const [value, setValue] = useState<string | undefined>(undefined);
  const [debouncedValue] = useDebouncedValue(value, 200);

  useEffect(() => {
    if (isReady && urlValue && value === undefined) {
      setValue(urlValue ?? '');
    } else if (debouncedValue === '') {
      const { [key]: _, ...restQuery } = router.query;
      void router.replace({ pathname: router.pathname, query: { ...restQuery } }, undefined, {
        shallow: true,
      });
    } else if (debouncedValue && debouncedValue.length > 0) {
      void router.replace(
        {
          pathname: router.pathname,
          query: {
            ...router.query,
            [key]: debouncedValue,
          },
        },
        undefined,
        { shallow: true },
      );
    }
  }, [isReady, urlValue, value, debouncedValue, key]);

  return { debouncedValue, value: value ?? '', setValue };
};
