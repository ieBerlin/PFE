import { createRoot } from "react-dom/client";
import "./app.css";
import BasicExample from "./BasicExample.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./components/RootLayout.jsx";
import SideBarContextProvider from "./assets/store/sidebar-context.jsx";

const root = createRoot(document.getElementById("root"));
const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <BasicExample />,
      },
    ],
  },
]);

root.render(
  <SideBarContextProvider>
    <RouterProvider router={routes} />
  </SideBarContextProvider>
);
