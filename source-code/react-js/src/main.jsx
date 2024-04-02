import { createRoot } from "react-dom/client";
import "./app.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import store from "./app/store.js";
import { Provider } from "react-redux";
import LandingPage from "./pages/landing-page/LandingPage.jsx";

const root = createRoot(document.getElementById("root"));
const routes = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
]);

root.render(
  <Provider store={store}>
    <RouterProvider router={routes} />
  </Provider>
);
