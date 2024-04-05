import { createRoot } from "react-dom/client";
import "./app.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import store from "./app/store.js";
import { Provider } from "react-redux";
import LandingPage from "./pages/landing-page/LandingPage.jsx";
import LoginPage from "./components/Auth/Login/Login.jsx";
import SignUpPage from "./components/Auth/SignUp/SignUp.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import RootLayout from "./components/Dashboard/RootLayout.jsx";
const root = createRoot(document.getElementById("root"));
const routes = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "sports",
        element: <Dashboard />,
      },
      {
        path: "classes",
        element: <Dashboard />,
      },
      {
        path: "coaches",
        element: <Dashboard />,
      },
      {
        path: "equipmentes",
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: "bookings",
            element: <Dashboard />,
          },
        ],
      },
      {
        path: "reports",
        element: <Dashboard />,
      },
      {
        path: "profile",
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: "edit",
            element: <Dashboard />,
          },
        ],
      },
      {
        path: "user",
        children: [
          {
            path: "new-notifications",
            element: <Dashboard />,
          },
          {
            path: "all-notifications",
            element: <Dashboard />,
          },
        ],
      },
    ],
  },
]);

root.render(
  <Provider store={store}>
    <RouterProvider router={routes} />
  </Provider>
);
