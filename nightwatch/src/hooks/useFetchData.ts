import { useEffect, useState } from "react";
import { AbortError } from "../errors";

interface Props<T> {
  fetchData: (signal: AbortSignal) => Promise<T>;
}

interface SetDataProps<T> {
  isLoading?: boolean;
  error?: Error;
  data?: T;
}

let abortController: AbortController | undefined;

export const useFetchData = <T>({ fetchData }: Props<T>) => {
  const [error, setError] = useState<Error>();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T>();

  useEffect(() => {
    return () => {
      if (abortController) {
        abortController.abort();
        abortController = undefined;
      }
    };
  }, [fetchData]);

  const setStateData = ({
    data,
    error,
    isLoading = false,
  }: SetDataProps<T>) => {
    setIsLoading(isLoading);
    setError(error);
    setData(data);
  };

  
  const loadData = async () => {
    if (abortController) {
      abortController.abort();
      abortController = undefined;
    }

    setStateData({ isLoading: true });

    if (!abortController) {
      abortController = new AbortController();
    }

    try {
      const data = await fetchData(abortController.signal);

      setStateData({ data });
    } catch (err) {
      setStateData({
        error: err instanceof AbortError ? undefined : (err as Error),
      });
    }
  };

  return {
    error,
    isLoading,
    data,
    resetData: () => setStateData({}),
    loadData,
  };
};
