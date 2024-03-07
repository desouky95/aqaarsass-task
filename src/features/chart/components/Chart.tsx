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
      },
      y: {
        // beginAtZero: true,
        // max: 100,
        // min: 0,
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

  data?.forEach(d => console.log(d.data.value_of_deals))

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
              label: "سكني",
              backgroundColor: "#2984C9",
              data: data?.map((_) => _.data.value_of_deals.skini_counter),
            },
            {
              label: "تجاري",
              backgroundColor: "#F8B358",
              data: data?.map((_) => _.data.value_of_deals.tijari_counter),
            },
          ],
        }}
      />
    </div>
  );
};
