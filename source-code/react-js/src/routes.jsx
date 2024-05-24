import { createBrowserRouter } from "react-router-dom";
import LandingPage, {
  loader as landingPageLoader,
} from "./pages/landing-page/LandingPage.jsx";
import LoginPage, {
  action as authAction,
  loader as loginLoader,
} from "./pages/auth/Login/Login.jsx";
import SportsPage from "./pages/sports/SportsPage.jsx";
import ClassesPage from "./pages/classes/ClassesPage.jsx";
import EquipmentsPage, {
  action as equipmentsPageAction,
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
import UserProfil from "./pages/user/UserProfil.jsx";
import CoachesPage, {
  loader as coachesPageLoader,
} from "./pages/coaches/CoachesPage.jsx";
import ClientsPage from "./pages/coaches/ClientsPage.jsx";
import EquipmentsBookings, {
  loader as bookingsEquipmentsLoader,
} from "./pages/equipments/EquipmentsBookings.jsx";
import BookEquipmentPage, {
  action as bookEquipmentsAction,
  loader as bookEquipmentLoader,
} from "./pages/equipments/BookEquipmentPage.jsx";
import BookClassPage from "./pages/classes/BookClassPage.jsx";
import ClassDetailsPage, {
  loader as classDetailsPage,
} from "./pages/classes/ClassDetailsPage.jsx";
import EditClassPage from "./pages/classes/EditClassPage.jsx";
import CreateClassPage, {
  action as createClassAction,
} from "./pages/classes/CreateClassPage.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import MemberOverviewPage from "./pages/member/MemberOverviewPage.jsx";
import PaymentsPage from "./pages/payments/PaymentsPage.jsx";
import RootLayout, {
  loader as tokenLoader,
} from "./components/Layouts/Root/RootLayout.jsx";
import UpdateUserPasswordPage from "./pages/user/UpdateUserPasswordPage.jsx";
import CoachPageDetails, {
  loader as coachPageDetailsLoader,
} from "./pages/coaches/CoachPageDetails.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import CoachingPage, {
  loader as connectLoader,
} from "./pages/coaches/connect-with/CoachingPage.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: "root",
    loader: tokenLoader,
    children: [
      {
        path: "overview",
        element: <MemberOverviewPage />,
      },
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
          },
          {
            path: "create",
            element: <CreateClassPage />,
            id: "create-class-id",
            action: createClassAction,
          },
          {
            path: "edit",
            children: [
              {
                path: ":classId",
                element: <EditClassPage />,
              },
            ],
          },
          {
            path: ":classId",
            children: [
              {
                index: true,
                element: <ClassDetailsPage />,
                loader: classDetailsPage,
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
            children: [
              {
                index: true,
                element: <CoachPageDetails />,
                id: "coach-details-id",
                loader: coachPageDetailsLoader,
              },
            ],
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
      
      },
      {
        path: "equipments",
        children: [
          {
            index: true,
            element: <EquipmentsPage />,
            id: "equipments-page-id",
            loader: equipmentsPageLoader,
            action: equipmentsPageAction,
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
        path: "clients",
        element: <ClientsPage />,
      },
      {
        path: "coaching",
        children: [
          {
            path: ":userId",
            element: <CoachingPage />,
            loader: connectLoader,
          },
        ],
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
    id: "landing-page-id",
    loader: landingPageLoader,
  },
  {
    path: "auth",
    element: <LoginPage />,
    id: "login-id",
    action: authAction,
    loader: loginLoader,
  },
]);

export default router;
