import {
  useMutation,
  useQuery,
  UseQueryOptions,
  UseMutationOptions,
  QueryFunction,
} from "@tanstack/react-query";
import api from "../utils/api";
import { useCallback } from "react";
import { useFetcher } from "./useFetcher";
import { Axios, AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

type BaseOptions<T> = UseQueryOptions<T, AxiosError> &
  Pick<AxiosRequestConfig, "data">;

type UseQueryArgs<T> = {
  endpoint: string;
  queryKey: string[];
  // queryFn?: (...args: Parameters<any>) => Promise<Function>;
  method?: string;
} & BaseOptions<T>;

export const useReactQuery = <T>({
  endpoint,
  queryKey,
  queryFn,
  method,
  data,
  ...options
}: UseQueryArgs<AxiosResponse<T>>) => {
  const fetch = useFetcher();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery<AxiosResponse<T>, AxiosError>({
    queryKey,
    queryFn: async (context) => {
      // if (queryFn) return await queryFn(context);
      return await fetch<T>({
        url: endpoint,
        method: method ?? "GET",
        data,
      });
    },
    ...options,
  });
};
