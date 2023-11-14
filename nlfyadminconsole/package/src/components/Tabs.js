import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Nav, NavItem, NavLink, Spinner } from "reactstrap";
import GuestJourney from "../views/ui/GuestCounter/GuestCounterDetails/GuestJourney";
import ViewDetails from "../views/ui/GuestCounter/GuestCounterDetails/ViewDetails";
import FollowUpNotes from "../views/ui/GuestCounter/GuestCounterDetails/FollowUpNotes";
import { LoaderContext } from "../LoaderContext";

const tabs = [
  { label: "Journey", value: "tab1" },
  { label: "View Details", value: "tab2" },
  { label: "Follow-up Notes", value: "tab3" },
];
const Tabs = ({
  guestData,
  parentCallback,
  parentTabsCallback,
  lifeGroupOptions,
  lifeGroupPlace,
}) => {
  const [active, setActive] = useState(tabs[0].value);
  const { isLoading } = useContext(LoaderContext);

  const goToTab = (tab) => {
    if (tab === "viewDetails") {
      setActive(tabs[1].value);
    }
    if (tab === "followup") {
      setActive(tabs[2].value);
      parentCallback(tabs[2].value);
    }
  };

  if (isLoading) {
    return (
      <div style={{ height: 250 }}>
        <Spinner color="primary" className="table-spinner" />
      </div>
    );
  }

  return (
    <>
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
                ? guestData?.firstname?.charAt(0).toUpperCase() +
                  guestData?.firstname?.slice(1) +
                  "'s " +
                  tab.label
                : tab.label}
            </NavLink>
          </NavItem>
        ))}
      </Nav>
      {active === "tab1" ? (
        <GuestJourney
          guestData={guestData}
          goToTab={goToTab}
          lifeGroupPlace={lifeGroupPlace}
        />
      ) : active === "tab2" ? (
        <ViewDetails
          guestData={guestData}
          handleTabsCallback={parentTabsCallback}
          lifeGroupOptions={lifeGroupOptions}
          lifeGroupPlace={lifeGroupPlace}
        />
      ) : (
        <FollowUpNotes
          guestData={guestData}
          handleTabsCallback={parentTabsCallback}
        />
      )}
    </>
  );
};

Tabs.propTypes = {
  children: PropTypes.node,
  tabs: PropTypes.array,
};

export default Tabs;
