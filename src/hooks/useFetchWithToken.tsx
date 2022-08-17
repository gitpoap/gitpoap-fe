import { useState, useEffect } from 'react';

import { fetchWithToken } from '../helpers';

export function useFetchWithToken<Data = any, Error = any>(
  url: string,
  token: string,
): { data?: Data; error?: Error; loading: boolean } {
  const [data, setData] = useState<Data>();
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let ignore = false;
    const fetchProduct = async () => {
      setLoading(true);
      try {
        setError(undefined);
        const data = await fetchWithToken(url, token);
        if (!ignore) {
          setData(data);
        }
      } catch (err: any) {
        setError(err);
        console.error(err);
      }
      setLoading(false);
    };
    fetchProduct();
    return () => {
      ignore = true;
    };
  }, [url]);

  return { data, loading, error };
}

export default useFetchWithToken;
