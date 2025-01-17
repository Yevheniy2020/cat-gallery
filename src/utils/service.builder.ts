import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export function requestsBuilder<T>(url: string) {
  const getAllEntries = async (): Promise<T[]> => {
    const { data } = await axios.get<T[]>(url);
    return data;
  };

  return {
    getAllEntries,
  };
}

export function serviceBuilder<T>(url: string) {
  const queryRequests = requestsBuilder<T>(url);

  const useGetAllEntries = () => {
    return useQuery<T[]>({
      queryKey: [url],
      queryFn: queryRequests.getAllEntries,
    });
  };

  return {
    useGetAllEntries,
  };
}
