import { lazy } from "react";
import { Navigate } from "react-router-dom";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

const Dashboard = lazy(() => import("../views/Dashboard"));
const Login = lazy(() => import("../views/Login"));
const Alerts = lazy(() => import("../views/ui/Alerts"));
const Announcements = lazy(() => import("../views/ui/Announcements"));
const Users = lazy(() => import("../views/ui/Users"));
const ChurchPrayers = lazy(() => import("../views/ui/ChurchPrayers"));
const PrayerRequests = lazy(() => import("../views/ui/PrayerRequests"));
const AddLifeGroup = lazy(() => import("../views/ui/LifeGroups/AddLifeGroup"));
const LifeGroups = lazy(() => import("../views/ui/LifeGroups/LifeGroups"));
const LifeGroupDetails = lazy(() =>
  import("../views/ui/LifeGroups/LifeGroupDetails")
);
const Events = lazy(() => import("../views/ui/Events"));
const GuestCounterDetails = lazy(() =>
  import("../views/ui/GuestCounter/GuestCounterDetails")
);
/*****Routes******/

const ThemeRoutes = (isAuthenticated) =>
  [
    {
      path: "/",
      element: isAuthenticated ? <FullLayout /> : <Navigate to="/login" />,
      children: [
        { path: "/", element: <Navigate to="/dashboard" /> },
        // { path: "/login", element: <Login /> },
        { path: "/dashboard", exact: true, element: <Dashboard /> },
        { path: "/alerts", exact: true, element: <Alerts /> },
        { path: "/announcements", exact: true, element: <Announcements /> },
        { path: "/users", exact: true, element: <Users /> },
        { path: "/churchPrayers", exact: true, element: <ChurchPrayers /> },
        {
          path: "/prayerRequests",
          exact: true,
          element: <PrayerRequests />,
        },
        { path: "/lifeGroups", exact: true, element: <LifeGroups /> },
        { path: "/addLifeGroup", exact: true, element: <AddLifeGroup /> },
        {
          path: "/lifeGroupsDetails/:id",
          exact: true,
          element: <LifeGroupDetails />,
        },
        { path: "/events", exact: true, element: <Events /> },
        {
          path: "/guestCounterDetails/:id",
          exact: true,
          element: <GuestCounterDetails />,
        },
      ],
    },
    {
      path: "/",
      element: !isAuthenticated ? <Login /> : <Navigate to="/dashboard" replace={true} />,
      children: [
        { path: "login", element: <Login /> },
        // { path: "/", element: <Navigate to="/login" /> },
      ],
    },
  ];

export default ThemeRoutes;
