import { Button, Nav, NavItem } from "reactstrap";
import Logo from "./Logo";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faColumns,
  faBullhorn,
  faPeopleGroup,
  faCalendarDays,
  faPersonPraying,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
const navigation = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: faColumns,
  },
  // {
  //   title: "Announcements",
  //   href: "/alerts",
  //   icon: faBullhorn,
  // },
  {
    title: "Announcements",
    href: "/announcements",
    icon: faBullhorn,
  },
  {
    title: "Reminders",
    href: "/badges",
    icon: faBell,
  },
  {
    title: "Life Groups",
    href: "/buttons",
    icon: faPeopleGroup,
  },
  // {
  //   title: "Events",
  //   href: "/forms",
  //   icon: faCalendarDays,
  // },
  // {
  //   title: "Events",
  //   href: "/cards",
  //   icon: faCalendarDays,
  // },
  {
    title: "Events",
    href: "/events",
    icon: faCalendarDays,
  },
  // {
  //   title: "Prayer Requests",
  //   href: "/grid",
  //   icon: faPersonPraying,
  // },
  {
    title: "Prayer Requests",
    href: "/prayerRequests",
    icon: faPersonPraying,
  },
  // {
  //   title: "Church Prayers",
  //   href: "/table",
  //   icon: faPeopleGroup,
  // },
  {
    title: "Church Prayers",
    href: "/churchPrayers",
    icon: faPeopleGroup,
  },
];

const Sidebar = () => {
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();

  return (
    <div className="p-3">
      <div className="d-flex align-items-center">
        <Logo />
        <span className="ms-auto d-lg-none">
          <Button
            close
            size="sm"
            className="ms-auto d-lg-none"
            onClick={() => showMobilemenu()}
          ></Button>
        </span>
      </div>
      <div className="pt-4 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link
                to={navi.href}
                className={
                  location.pathname === navi.href
                    ? "text-primary nav-link py-3"
                    : "nav-link text-secondary py-3"
                }
              >
                <FontAwesomeIcon
                  className="sidenav-icons-color"
                  icon={navi.icon}
                />
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          ))}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
