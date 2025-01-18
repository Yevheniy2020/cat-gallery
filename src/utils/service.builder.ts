import axios from "axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export function requestsBuilder<T>(url: string) {
  const getAllEntries = async (params?: Record<string, any>): Promise<T[]> => {
    const { data } = await axios.get<T[]>(url, { params });
    return data;
  };

  return { getAllEntries };
}

interface ServiceBuilderOptions {
  baseUrl: string;
}

type QueryKeyType = readonly [string, Record<string, any>?];

export function serviceBuilder<T>({ baseUrl }: ServiceBuilderOptions) {
  const { getAllEntries } = requestsBuilder<T>(baseUrl);

  const useGetAllEntriesByParams = (
    params?: Record<string, any>,
    queryOptions?: UseQueryOptions<T[], Error, T[], QueryKeyType>,
  ) => {
    return useQuery<T[], Error, T[], QueryKeyType>({
      queryKey: [baseUrl, params] as const,
      queryFn: () => getAllEntries(params),
      ...queryOptions,
    });
  };

  return { useGetAllEntriesByParams };
}
