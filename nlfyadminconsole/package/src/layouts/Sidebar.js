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
} from "@fortawesome/free-solid-svg-icons";
const navigation = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: faColumns,
  },
  {
    title: "Announcements",
    href: "/announcements",
    icon: faBullhorn,
  },
  {
    title: "Life Groups",
    href: "/lifeGroups",
    icon: faPeopleGroup,
  },
  {
    title: "Events",
    href: "/events",
    icon: faCalendarDays,
  },
  {
    title: "Prayer Requests",
    href: "/prayerRequests",
    icon: faPersonPraying,
  },
  {
    title: "Church Prayers",
    href: "/churchPrayers",
    icon: faPeopleGroup,
  },
  {
    title: "Guest Counter",
    href: "/guestCounter",
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
                onClick={() => showMobilemenu()}
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
