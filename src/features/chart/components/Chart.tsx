import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  CoreChartOptions,
  PluginChartOptions,
} from "chart.js";
import { ComponentProps, useMemo } from "react";
import { useGetStat } from "../hooks/useGetStat";
import { Skeleton } from "../../../core/components/Skeleton/Skeleton";
import { Bar } from "react-chartjs-2";
import moment from "moment";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options: Pick<ComponentProps<typeof Bar>, "options"> = {
  options: {
    plugins: {
      title: {
        display: true,
        text: "مقارنة عدد الصفقات بالفترة المماثلة من الأعوام الماضية",
      },
      legend: {
        display: false,
      },
    },
    responsive: true,
    locale: "ar-SA",
    scales: {
      x: {
        stacked: true,
        ticks: {},
      },
      y: {
        stacked: true,
        ticks: {
          callback(tickValue, index, ticks) {
            const d = Number(tickValue);
            if (d >= 1000000000) {
              return (d / 1000000000).toFixed(1).replace(/\.0$/, "") + "مليار";
            }
            if (d >= 1000000) {
              return (d / 1000000).toFixed(1).replace(/\.0$/, "") + "مليون";
            }
            if (d >= 1000) {
              return (d / 1000).toFixed(1).replace(/\.0$/, "") + "ألف";
            }
            return d;
          },
        },
      },
    },
  },
};

type ChartProps = {
  // stats: Array<Stat>;
};
export const Chart = ({}: ChartProps) => {
  const { data, isLoading, isError } = useGetStat({});

  const chart_data = useMemo(() => {
    if (isLoading || isError) return {};
  }, [JSON.stringify(data)]);
  if (isError)
    return (
      <div className="p-6">
        <p>Error, Failed to load </p>
      </div>
    );

  if (isLoading)
    return (
      <div className="p-6">
        <Skeleton width={"100%"} height={"20vh"} />
      </div>
    );

  return (
    <div className="max-h-[40vh] w-full flex justify-center py-4">
      <Bar
        options={options.options}
        data={{
          labels: data?.map((_) => _.date),

          datasets: [
            {
              label: "Number of Deals",
              backgroundColor: "#31238c",
              data: data?.map((_) => _.data.number_of_deals),
            },
            {
              label: "Value of Deals",
              backgroundColor: "#31238c",
              data: data?.map((_) => _.data.value_of_deals),
            },
          ],
        }}
      />
    </div>
  );
};
