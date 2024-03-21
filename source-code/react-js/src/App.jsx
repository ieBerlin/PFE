import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Authentication from "./components/authentication/Authentication.jsx";
import WelcomePage from "./components/welcome/WelcomePage.jsx";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <WelcomePage />,
    },
    {
      path: "/authentication",
      element: <Authentication />,
    },
  ]);
  return <RouterProvider router={router} />;
}
