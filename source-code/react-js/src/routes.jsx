import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/landing-page/LandingPage.jsx";
import LoginPage, { action as authAction } from "./pages/auth/Login/Login.jsx";
import SportsPage from "./pages/sports/SportsPage.jsx";
import ClassesPage, {
  loader as classesLoader,
} from "./pages/classes/ClassesPage.jsx";
import EquipmentsPage, {
  loader as equipmentsPageLoader,
} from "./pages/equipments/EquipmentsPage.jsx";
import UserDetailsPage, {
  action as userDetailAction,
  loader as userPageDetailsLoader,
} from "./pages/user/UserDetailsPage.jsx";
import AllUserPage, {
  loader as allUsersLoader,
  action as allUsersAction,
} from "./pages/user/AllUserPage.jsx";
import AllNotifications, {
  loader as notificationsLoader,
} from "./pages/user/notifications/AllNotifications.jsx";
import CreateSportCategoriePage from "./pages/sports/CreateSportCategoriePage.jsx";
import SportCategoriePage from "./pages/sports/SportCategoriePage.jsx";
import DeleteSportCategorie from "./pages/sports/DeleteSportCategorie.jsx";
import ReportsPage, {
  loader as reportsLoader,
} from "./pages/reports/ReportsPage.jsx";
import UserProfil, {
  loader as userProfileLoader,
} from "./pages/user/UserProfil.jsx";
import CoachesPage, {
  loader as coachesPageLoader,
} from "./pages/coaches/CoachesPage.jsx";
import EquipmentsBookings, {
  loader as bookingsEquipmentsLoader,
} from "./pages/equipments/EquipmentsBookings.jsx";
import BookEquipmentPage, {
  action as bookEquipmentsAction,
  loader as bookEquipmentLoader,
} from "./pages/equipments/BookEquipmentPage.jsx";
import BookClassPage from "./pages/classes/BookClassPage.jsx";
import ClassDetailsPage from "./pages/classes/ClassDetailsPage.jsx";
import EditClassPage from "./pages/classes/EditClassPage.jsx";
import CreateClassPage from "./pages/classes/CreateClassPage.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import PaymentsPage, {
  action as paymentsAction,
  loader as paymentsLoader,
} from "./pages/payments/PaymentsPage.jsx";
import RootLayout, {
  loader as tokenLoader,
} from "./components/Layouts/Root/RootLayout.jsx";
import UpdateUserPasswordPage from "./pages/user/UpdateUserPasswordPage.jsx";
import CoachPageDetails, {
  loader as coachPageDetailsLoader,
} from "./pages/coaches/CoachPageDetails.jsx";
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
          {
            index: true,
            element: <ClassesPage />,
            id: "classes-page-id",
            loader: classesLoader,
          },
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
            children: [
              {
                path: ":equipmentId",
                element: <BookEquipmentPage />,
                id: "book-equipment-page",
                loader: bookEquipmentLoader,
                action: bookEquipmentsAction,
              },
            ],
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
