import { RouterProvider } from "react-router-dom";
import router from "./routes.jsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./hooks/http.js";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
