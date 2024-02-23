import { RouteObject } from "react-router-dom";
import Chart from "./index";

const PREFIX = "chart";

export const chartRoutes: RouteObject = {
  path: PREFIX,

  children: [
    {
      index: true,
      Component: Chart,
    },
  ],
};
