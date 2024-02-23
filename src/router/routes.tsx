import {  createBrowserRouter } from "react-router-dom";
import { chartRoutes } from "../features/chart/routes";
import DashboardLayout from "../core/layouts/dashboard/DashboardLayout";
import { HomePage } from "../features/home";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      chartRoutes,
    ],
  },
]);

export const namedRoutes: Array<{ path: string; title: string }> = [
  {
    path: "/chart",
    title: "رسم بياني تفاعلي",
  },
];
