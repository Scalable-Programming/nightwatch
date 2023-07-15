import { useEffect, useState } from "react";

interface Props<T> {
  enabled: boolean;
  fetchData: () => Promise<T>;
}

export const useFetchData = <T>({ enabled, fetchData }: Props<T>) => {
  const [error, setError] = useState<Error>();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T>();

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const loadData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchData();

        setData(data);
        setIsLoading(false);
        setError(undefined);
      } catch (err) {
        setIsLoading(false);
        setError(err as Error);
      }
    };

    void loadData();
  }, [enabled, fetchData]);

  return { error, isLoading, data };
};
