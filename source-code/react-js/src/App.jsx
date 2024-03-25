import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Authentication from "./components/authentication/Authentication.jsx";
import WelcomePage from "./components/welcome/WelcomePage.jsx";
import Test from "./components/Test.jsx";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Test />,
    },
    {
      path: "/authentication",
      element: <Authentication />,
    },
  ]);
  return <RouterProvider router={router} />;
}
