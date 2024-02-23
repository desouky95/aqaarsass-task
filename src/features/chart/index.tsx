import { Helmet } from "react-helmet-async";
import Breadcrumb from "../../core/components/Breadcrumb/Breadcrumb";
import { ChartFilters } from "./components/ChartFilters";
import { Chart } from "./components/Chart";


const Page = () => {
  return (
    <>
      <Helmet>
        <title>رسم بياني تفاعلي</title>
      </Helmet>
      <Breadcrumb
        withInitial
        items={[{ title: "رسم بياني", path: "/chart" }]}
      />
      <ChartFilters />
      <Chart  />
    </>
  );
};

export default Page;
