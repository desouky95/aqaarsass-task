import {
  useMutation,
  useQuery,
  UseQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import api from "../utils/api";
import { useCallback } from "react";
import { useFetcher } from "./useFetcher";
import { AxiosRequestConfig } from "axios";

type BaseOptions = UseMutationOptions & Pick<AxiosRequestConfig, "data">;

type UseMutationArgs = {
  endpoint: string;
  mutationFn?: (...args: Parameters<any>) => Promise<Function>;
  method?: string;
} & BaseOptions;

export const useReactMutation = ({
  endpoint,
  mutationKey,
  mutationFn,
  method,
  data,
  ...options
}: UseMutationArgs) => {
  const fetch = useFetcher();

  return useMutation({
    mutationKey,
    mutationFn: async (...args: Parameters<any>) => {
      if (mutationFn) return await mutationFn(...args);

      return await fetch({
        url: endpoint,
        method: method ?? "POST",
        data,
      });
    },
    ...(options as UseMutationOptions),
  });
};
