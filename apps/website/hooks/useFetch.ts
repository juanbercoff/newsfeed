import { useCallback, useEffect, useState } from 'react';

export function useFetch<ReturnData, RequestPayload = Record<string, never>>(
  fetchFunction: (
    payload?: RequestPayload,
    token?: string | null
  ) => Promise<ReturnData>,
  payload: RequestPayload,
  token?: string | null
) {
  const [data, setData] = useState<ReturnData | null>(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetch = useCallback(
    async (payload: RequestPayload) => {
      try {
        const data = await fetchFunction(payload, token);
        setData(data);
      } catch (e) {
        setError(true);
        throw new Error(e as string);
      } finally {
        setIsLoading(false);
      }
    },
    [fetchFunction, token]
  );

  useEffect(() => {
    fetch(payload);
  }, []);

  return {
    data,
    error,
    isLoading,
  };
}
