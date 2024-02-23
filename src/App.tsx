import { RouterProvider } from "react-router-dom";
import { routes } from "./router/routes";
import "./styles/global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Helmet, HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient();

function App() {
  return (
    <HelmetProvider>
      <Helmet>
        <html className="dark" />
        <body dir="rtl" />
      </Helmet>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={routes} />
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
