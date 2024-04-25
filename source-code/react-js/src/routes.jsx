import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/landing-page/LandingPage.jsx";
import LoginPage, {
  action as authAction,
} from "./components/auth/Login/Login.jsx";
import SportsPage from "./components/sports/SportsPage.jsx";
import ClassesPage from "./components/classes/ClassesPage.jsx";
import EquipmentsPage, {
  loader as equipmentsPageLoader,
} from "./components/equipments/EquipmentsPage.jsx";
import UserDetailsPage, {
  action as userDetailAction,
  loader as userPageDetailsLoader,
} from "./components/user/UserDetailsPage.jsx";
import AllUserPage, {
  loader as allUsersLoader,
  action as allUsersAction,
} from "./components/user/AllUserPage.jsx";
import AllNotifications, {
  loader as notificationsLoader,
} from "./components/user/notifications/AllNotifications.jsx";
import CreateSportCategoriePage from "./components/sports/CreateSportCategoriePage.jsx";
import SportCategoriePage from "./components/sports/SportCategoriePage.jsx";
import DeleteSportCategorie from "./components/sports/DeleteSportCategorie.jsx";
import ReportsPage, {
  loader as reportsLoader,
} from "./components/reports/ReportsPage.jsx";
import UserProfil, {
  loader as userProfileLoader,
} from "./components/user/UserProfil.jsx";
import CoachesPage, {
  loader as coachesPageLoader,
} from "./components/coaches/CoachesPage.jsx";
import EquipmentsBookings, {
  loader as bookingsEquipmentsLoader,
} from "./components/equipments/EquipmentsBookings.jsx";
import BookEquipmentPage from "./components/equipments/BookEquipmentPage.jsx";
import BookClassPage from "./components/classes/BookClassPage.jsx";
import ClassDetailsPage from "./components/classes/ClassDetailsPage.jsx";
import EditClassPage from "./components/classes/EditClassPage.jsx";
import CreateClassPage from "./components/classes/CreateClassPage.jsx";
import Dashboard from "./components/dashboard/Dashboard.jsx";
import PaymentsPage, {
  action as paymentsAction,
  loader as paymentsLoader,
} from "./components/payments/PaymentsPage.jsx";
import RootLayout, {
  loader as tokenLoader,
} from "./components/Layouts/Root/RootLayout.jsx";
import NotFoundPage from "./components/NotFoundPage.jsx";
import UpdateUserPasswordPage from "./components/user/UpdateUserPasswordPage.jsx";
import CoachPageDetails, {
  loader as coachPageDetailsLoader,
} from "./components/coaches/CoachPageDetails.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    // errorElement: <ErrorPage />,
    id: "root",
    loader: tokenLoader,
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
            id: "coaches-page",
            loader: coachesPageLoader,
          },
          {
            path: ":coachId",
            element: <CoachPageDetails />,
            id: "coach-details-id",
            loader: coachPageDetailsLoader,
          },
        ],
      },
      {
        path: "users",
        element: <AllUserPage />,
        id: "all-users-id",
        loader: allUsersLoader,
        action: allUsersAction,
      },
      {
        path: "payments",
        element: <PaymentsPage />,
        id: "payments-loader",
        loader: paymentsLoader,
        action: paymentsAction,
      },
      {
        path: "equipments",
        children: [
          {
            index: true,
            element: <EquipmentsPage />,
            id: "equipments-page-id",
            loader: equipmentsPageLoader,
          },

          {
            path: "book",
            element: <BookEquipmentPage />,
          },
          {
            path: "bookings",
            element: <EquipmentsBookings />,
            id: "equipments-bookings-id",
            loader: bookingsEquipmentsLoader,
          },
        ],
      },
      {
        path: "reports",
        element: <ReportsPage />,
        id: "reports-loader",
        loader: reportsLoader,
      },
      {
        path: "profile",
        children: [
          {
            index: true,
            element: <UserProfil />,
            id: "user-profile-id",
            loader: userProfileLoader,
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
            id: "notifications-id",
            loader: notificationsLoader,
          },
          {
            path: ":userId",
            element: <UserDetailsPage />,
            id: "user-detail-id",
            loader: userPageDetailsLoader,
            action: userDetailAction,
          },
        ],
      },
    ],
  },
  {
    index: true,
    element: <LandingPage />,
  },
  {
    path: "auth",
    element: <LoginPage />,
    action: authAction,
  },
]);

export default router;
