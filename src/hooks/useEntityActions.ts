// @ts-expect-error - required for the type to be found
import type { UseQueryResult } from "@tanstack/react-query/src/types.ts";

interface UseEntityManagerProps<T> {
  useGetAll: (params?: Record<string, any>) => UseQueryResult<T[]>;
  params?: Record<string, any>;
}

export const useEntityActions = <T>({
  useGetAll,
  params,
}: UseEntityManagerProps<T>) => {
  const { data, isFetching, error } = useGetAll(params);

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
