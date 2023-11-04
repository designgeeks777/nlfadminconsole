import React, { useContext, useEffect } from "react";
import {
  Navbar,
  Collapse,
  NavbarBrand,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from "reactstrap";
import avatar from "../assets/images/users/avatar.png";
import { AuthenticationContext } from "../services/AuthService";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const { user, logOut } = useContext(AuthenticationContext);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate("/");
    }
  }, [user]);
  const onLogOut = () => {
    console.log("clicked");
    logOut();
  };

  return (
    <Navbar className="bg-gradient text-white" dark expand="md">
      <div className="d-flex align-items-center">
        <NavbarBrand href="/" className="d-lg-none">
          {/* <LogoWhite /> */}
          <img
            src={require("../assets/images/logos/logoIcon.png")}
            alt="logo"
            width={40}
            height={40}
            className="card-bg"
          />
        </NavbarBrand>
        <Button
          color="primary"
          className="d-lg-none"
          onClick={() => showMobilemenu()}
        >
          <i className="bi bi-list"></i>
        </Button>
      </div>
      <div className="me-auto nav-link welcome-text">
        Welcome {user.displayName}!
      </div>

      <div className="hstack gap-2">
        <Button
          color="primary"
          size="sm"
          className="d-sm-block d-md-none"
          onClick={Handletoggle}
        >
          {isOpen ? (
            <i className="bi bi-x"></i>
          ) : (
            <i className="bi bi-three-dots-vertical"></i>
          )}
        </Button>
      </div>

      <Collapse navbar isOpen={isOpen}>
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle color="transparent">
            <img
              src={user.photoURL}
              alt="profile"
              className="rounded-circle"
              width="40"
              height="40"
            ></img>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem>
              <span onClick={logOut}>Logout</span>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Collapse>
    </Navbar>
  );
};

export default Header;
