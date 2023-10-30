import React, { useState } from "react";
import PropTypes from "prop-types";
import { Nav, NavItem, NavLink } from "reactstrap";

const Tabs = ({ tabs, guestFirstName, parentCallback }) => {
  const [active, setActive] = useState(tabs[1].value);
  return (
    <div>
      <Nav className="tabnav">
        {tabs.map((tab) => (
          <NavItem key={tab.value} className="tabnav-link">
            <NavLink
              className="tabnav-link"
              key={tab.value}
              active={active === tab.value}
              onClick={() => {
                setActive(tab.value);
                parentCallback(tab.value);
              }}
            >
              {tab.value === "tab1"
                ? guestFirstName + "'s " + tab.label
                : tab.label}
            </NavLink>
          </NavItem>
        ))}
      </Nav>
      {tabs.map((tab) => (
        <div key={tab.value} className="outlet">
          {active === tab.value ? tab.component : null}
        </div>
      ))}
    </div>
  );
};

Tabs.propTypes = {
  children: PropTypes.node,
  tabs: PropTypes.array,
};

export default Tabs;
