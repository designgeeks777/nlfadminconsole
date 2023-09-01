import { lazy } from "react";
import { Navigate } from "react-router-dom";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

const Dashboard = lazy(() => import("../views/Dashboard.js"));
const About = lazy(() => import("../views/About.js"));
const Alerts = lazy(() => import("../views/ui/Alerts"));
const Announcements = lazy(() => import("../views/ui/Announcements"));
const ChurchPrayers = lazy(() => import("../views/ui/ChurchPrayers"));
const PrayerRequests = lazy(() => import("../views/ui/PrayerRequests"));
const AddLifeGroup = lazy(() => import("../views/ui/LifeGroups/AddLifeGroup"));
const LifeGroups = lazy(() => import("../views/ui/LifeGroups/LifeGroups"));
const LifeGroupDetails = lazy(() =>
  import("../views/ui/LifeGroups/LifeGroupDetails")
);
// const Test = lazy(() => import("../views/ui/test"));
const Badges = lazy(() => import("../views/ui/Badges"));
const Buttons = lazy(() => import("../views/ui/Buttons"));
const Cards = lazy(() => import("../views/ui/Cards"));
const Grid = lazy(() => import("../views/ui/Grid"));
const Tables = lazy(() => import("../views/ui/Tables"));
const Forms = lazy(() => import("../views/ui/Forms"));
const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs"));
const Events = lazy(() => import("../views/ui/Events"));
/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/dashboard" /> },
      { path: "/dashboard", exact: true, element: <Dashboard /> },
      { path: "/about", exact: true, element: <About /> },
      { path: "/alerts", exact: true, element: <Alerts /> },
      { path: "/announcements", exact: true, element: <Announcements /> },
      { path: "/churchPrayers", exact: true, element: <ChurchPrayers /> },
      { path: "/prayerRequests", exact: true, element: <PrayerRequests /> },
      { path: "/lifeGroups", exact: true, element: <LifeGroups /> },
      { path: "/addLifeGroup", exact: true, element: <AddLifeGroup /> },
      // { path: "/test", exact: true, element: <Test /> },
      {
        path: "/lifeGroupsDetails/:id",
        exact: true,
        element: <LifeGroupDetails />,
      },
      { path: "/badges", exact: true, element: <Badges /> },
      { path: "/buttons", exact: true, element: <Buttons /> },
      { path: "/cards", exact: true, element: <Cards /> },
      { path: "/grid", exact: true, element: <Grid /> },
      { path: "/table", exact: true, element: <Tables /> },
      { path: "/forms", exact: true, element: <Forms /> },
      { path: "/breadcrumbs", exact: true, element: <Breadcrumbs /> },
      { path: "/events", exact: true, element: <Events /> },
    ],
  },
];

export default ThemeRoutes;
