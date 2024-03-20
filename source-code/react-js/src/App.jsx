import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Authentication from "./components/authentication/Authentication.jsx";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/authentication",
      element: <Authentication />,
    },
  ]);
  return <RouterProvider router={router} />;
}
