// @ts-expect-error - required for the type to be found
import type { UseQueryResult } from "@tanstack/react-query/src/types.ts";

interface UseEntityManagerProps<T> {
  useGetAll: () => UseQueryResult<T[]>;
}

export const useEntityActions = <T>({
  useGetAll,
}: UseEntityManagerProps<T>) => {
  const { data, isFetching, error } = useGetAll();

  return {
    data,
    isLoading: isFetching,
    isError: !!error,
  } as {
    data: T[] | undefined;
    isLoading: boolean;
    isError: boolean;
  };
};
