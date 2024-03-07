import { useSearchParams } from "react-router-dom";
import { useReactQuery } from "../../../core/hooks/useReactQuery";
import {
  QueryOptions,
  UseQueryOptions,
  useQueries,
  useQuery,
} from "@tanstack/react-query";
import api from "../../../core/utils/api";
import { AxiosResponse } from "axios";
import { useCallback, useMemo } from "react";
import {} from "dayjs";
import moment from "moment";
type StatType = "number_of_deals" | "value_of_deals";
type UseGetStatArgs = {
  type?: StatType;
};

const getData = async (date: string, state?: string | null) => {
  const selectedDate = moment(date, "YYYY-MM-DD");
  const dates = new Array(7).fill(0).map((_v, index) => {
    const date = moment(selectedDate);
    return date.subtract(index, "y").format("YYYY-MM-DD");
  });

  const datesRequests = await Promise.all(
    dates.map(async (date) => {
      return {
        date,
        requests: [
          await api.post<StatsResponse>("stats/", {
            stat_type: "number_of_deals",
            start_date: date,
            key: "aqarsas_frontend",
            state : Number(state),
            end_date: date,
          }),
          await api.post<StatsResponse>("stats/", {
            start_date: date,
            key: "aqarsas_frontend",
            state : Number(state),
            end_date: date,
          }),
        ],
      };
    })
  );
  return datesRequests.map((_) => ({ date: _.date, data: _.requests }));
};
export const useGetStat = ({ type = "value_of_deals" }: UseGetStatArgs) => {
  const [params] = useSearchParams();

  const query = useQuery({
    queryKey: ["stats", params.toString()],
    queryFn: async () => {
      const data = await getData(
        params.get("start-date") ??
          moment({ year: 2022, month: 1, day: 1 }).format("YYYY-MM-DD"),
        params.get("state")
      );

      return data;
    },
    select(data) {
      return data.map(({ data, date }) => {
        const [number_of_deals, value_of_deals] = data;

        return {
          date,
          data: {
            number_of_deals: number_of_deals.data.Stats_list.reduce(
              (acc, prev) => {
                if (prev.Dtype === "سكني")
                  acc.skini_counter = acc.skini_counter + prev.Stat;
                else acc.tijari_counter = acc.tijari_counter + prev.Stat;
                return acc;
              },
              {
                skini_counter: 0,
                tijari_counter: 0,
              }
            ),
            value_of_deals: value_of_deals.data.Stats_list.reduce(
              (acc, prev) => {
                if (prev.Dtype === "سكني")
                  acc.skini_counter = acc.skini_counter + prev.Stat;
                else acc.tijari_counter = acc.tijari_counter + prev.Stat;
                return acc;
              },
              {
                skini_counter: 0,
                tijari_counter: 0,
              }
            ),
          },
        };
      });
    },
  });

  return query;
};
