import { createRoot } from "react-dom/client";
import "./app.css";
import BasicExample from "./BasicExample.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./components/RootLayout.jsx";
import store from "./app/store.js"
import { Provider } from "react-redux";

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
  <Provider store={store}>
    <RouterProvider router={routes} />
  </Provider>
);
