import React, { useState } from "react";
import PropTypes from "prop-types";
import { Nav, NavItem, NavLink } from "reactstrap";
import GuestJourney from "../views/ui/GuestCounter/GuestJourney";
import ViewDetails from "../views/ui/GuestCounter/ViewDetails";
import FollowUpNotes from "../views/ui/GuestCounter/FollowUpNotes";

const tabs = [
  { label: "Journey", value: "tab1" },
  { label: "View Details", value: "tab2" },
  { label: "Follow-up Notes", value: "tab3" },
];
const Tabs = ({ guestData, parentCallback, parentFollowupNoteCallback }) => {
  const [active, setActive] = useState(tabs[0].value);

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
                ? guestData?.firstname + "'s " + tab.label
                : tab.label}
            </NavLink>
          </NavItem>
        ))}
      </Nav>
      {/* <div key={active} className="outlet"> */}
      {active === "tab1" ? (
        <GuestJourney guestData={guestData} />
      ) : active === "tab2" ? (
        <ViewDetails guestData={guestData} />
      ) : (
        <FollowUpNotes
          guestData={guestData}
          handleTabsCallback={parentFollowupNoteCallback}
        />
      )}
      {/* </div> */}
    </div>
  );
};

Tabs.propTypes = {
  children: PropTypes.node,
  tabs: PropTypes.array,
};

export default Tabs;
