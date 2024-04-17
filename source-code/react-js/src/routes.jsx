import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/landing-page/LandingPage.jsx";
import LoginPage from "./components/auth/Login/Login.jsx";
import SportsPage from "./components/sports/SportsPage.jsx";
import ClassesPage from "./components/classes/ClassesPage.jsx";
import EquipmentsPage from "./components/equipments/EquipmentsPage.jsx";
import UserDetailsPage from "./components/user/UserDetailsPage.jsx";
import AllUserPage from "./components/user/AllUserPage.jsx";
import AllNotifications from "./components/user/notifications/AllNotifications.jsx";
import CreateSportCategoriePage from "./components/sports/CreateSportCategoriePage.jsx";
import SportCategoriePage from "./components/sports/SportCategoriePage.jsx";
import DeleteSportCategorie from "./components/sports/DeleteSportCategorie.jsx";
import ReportsPage from "./components/reports/ReportsPage.jsx";
import UserProfil from "./components/user/UserProfil.jsx";
import CoachesPage from "./components/coaches/CoachesPage.jsx";
import EquipmentsBookings from "./components/equipments/EquipmentsBookings.jsx";
import BookEquipmentPage from "./components/equipments/BookEquipmentPage.jsx";
import BookClassPage from "./components/classes/BookClassPage.jsx";
import ClassDetailsPage from "./components/classes/ClassDetailsPage.jsx";
import EditClassPage from "./components/classes/EditClassPage.jsx";
import CreateClassPage from "./components/classes/CreateClassPage.jsx";
import Dashboard from "./components/dashboard/Dashboard.jsx";
import Users from "./components/user/AllUserPage.jsx";
import PaymentsPage from "./components/payments/PaymentsPage.jsx";
import RootLayout from "./components/Layouts/Root/RootLayout.jsx";
import NotFoundPage from "./pages/not-found/NotFoundPage.jsx";
import UpdateUserPasswordPage from "./components/user/UpdateUserPasswordPage.jsx";
import CoachPageDetails, { loader } from "./components/coaches/CoachPageDetails.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "auth",
    element: <LoginPage />,
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
        children: [
          {
            index: true,
            element: <SportsPage />,
          },
          {
            path: "create",
            element: <CreateSportCategoriePage />,
          },
          {
            path: ":categorie",
            children: [
              {
                index: true,
                element: <SportCategoriePage />,
              },

              {
                path: "delete",
                element: <DeleteSportCategorie />,
              },
            ],
          },
        ],
      },
      {
        path: "classes",
        children: [
          { index: true, element: <ClassesPage /> },
          {
            path: "create",
            element: <CreateClassPage />,
          },
          {
            path: ":classId",
            children: [
              {
                index: true,
                element: <ClassDetailsPage />,
              },
              {
                path: "edit",
                element: <EditClassPage />,
              },
              {
                path: "book",
                element: <BookClassPage />,
              },
            ],
          },
        ],
      },
      {
        path: "coaches",
        children: [
          {
            index: true,
            element: <CoachesPage />,
          },
          {
            path: ":coachId",
            element: <CoachPageDetails />,
            loader:loader
          },
        ],
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "payments",
        element: <PaymentsPage />,
      },
      {
        path: "equipments",
        children: [
          {
            path: "page",
            element: <EquipmentsPage />,
          },

          {
            path: "book",
            element: <BookEquipmentPage />,
          },
          {
            path: "bookings",
            element: <EquipmentsBookings />,
          },
        ],
      },
      {
        path: "reports",
        element: <ReportsPage />,
      },
      {
        path: "profile",
        children: [
          {
            index: true,
            element: <UserProfil />,
          },

          {
            path: "update-password",
            element: <UpdateUserPasswordPage />,
          },
        ],
      },
      {
        path: "user",
        children: [
          {
            path: "all-notifications",
            element: <AllNotifications />,
          },
          {
            path: ":userId",
            element: <UserDetailsPage />,
          },
          {
            path: "all-users",
            element: <AllUserPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
