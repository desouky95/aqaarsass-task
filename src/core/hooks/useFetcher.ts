import { AxiosRequestConfig } from "axios";
import api from "../utils/api";

type UseFetcherArgs = AxiosRequestConfig;
export const useFetcher = () => {
  return async <T>(args: UseFetcherArgs) => {
    return await api<T>(args);
  };
};
