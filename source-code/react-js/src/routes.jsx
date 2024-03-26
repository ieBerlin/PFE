import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "register",
    element: <RegisterPage />,
  },
  {
    path: "profile",
    children: [
      {
        index: true,
        element: <UserProfilePage />,
      },
      {
        path: "edit",
        element: <EditUserProfilePage />,
      },
      {
        path: ":userId",
        element: <UserProfileByIdPage />,
      },
    ],
  },
  {
    path: "classes",
    children: [
      {
        index: true,
        element: <AllClassesPage />,
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
            element: <ShowClassByIdPage />,
          },
          {
            path: "edit",
            element: <EditClassPage />,
          },
          {
            path: "book",
            element: <BookClassPage />,
          },
          {
            path: "filter/:filteredClasses",
            element: <FilteredClassesPage />,
          },
        ],
      },
    ],
  },
  {
    path: "sports",
    children: [
      {
        index: true,
        element: <AllSportsPage />,
      },
      {
        path: "create",
        element: <CreateSportPage />,
      },
      {
        path: ":name",
        children: [
          {
            index: true,
            element: <ShowSportByNamePage />,
          },
          {
            path: "edit",
            element: <EditSportPage />,
          },
          {
            path: ":sportId/delete",
            element: <DeleteSportPage />,
          },
        ],
      },
    ],
  },
  {
    path: "dashboard",
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "classes",
        element: <ClassDashboardPage />,
      },
      {
        path: "sports",
        element: <SportDashboardPage />,
      },
      {
        path: "users",
        element: <UserDashboardPage />,
      },
    ],
  },
  {
    path: "home",
    element: <HomePage />,
  },
  {
    path: "about",
    element: <AboutPage />,
  },
  {
    path: "contact",
    element: <ContactPage />,
  },
]);
export default router;
