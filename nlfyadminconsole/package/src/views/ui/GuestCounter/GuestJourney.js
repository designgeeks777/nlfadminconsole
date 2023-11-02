import React, { useContext, useEffect, useState } from "react";
import { BASEURL } from "../../../APIKey";
import axios from "axios";

const GuestJourney = ({ guestData }) => {
  const [selectedId, setSelectedId] = useState(null);
  const onSelectItem = (id) => {
    if (id === selectedId) return setSelectedId(null);
    setSelectedId(id);
  };

  const [lifeGroupPlace, setLifeGroupPlace] = useState("");
  const lifeGroupUrl = `${BASEURL}lifeGroups/${guestData.lifegroupid}`;
  const fetchLifeGroupName = async () => {
    const response = await axios.get(lifeGroupUrl);
    var place = response.data.place;
    setLifeGroupPlace(place);
  };

  useEffect(() => {
    if (guestData.lifegroupid) {
      fetchLifeGroupName();
    }
  }, [guestData]);

  const [followupNotes, setFollowupNotes] = useState([]);

  useEffect(() => {
    if (guestData.followupnotes) {
      let data = guestData.followupnotes;
      setFollowupNotes(data.reverse());
    }
  }, [guestData.followupnotes]);

  //follow up notes section
  const followUpNotesSection = () => {
    if (followupNotes) {
      // return guestData.followupnotes.map((item, index) => {
      return followupNotes.map((item, index) => {
        return (
          <>
            <li key={index}>
              <span className="stepcircle"></span>
              <span className="stepline">
                <p>
                  Followed up on{" "}
                  <strong className="text-black">{item.date}</strong>{" "}
                  <span
                    style={{ cursor: "pointer" }}
                    className="text-primary"
                    onClick={() => {
                      onSelectItem(index);
                    }}
                  >
                    {selectedId === index
                      ? "Close Follow-up note "
                      : "See Follow-up note "}
                    <i
                      className={`bi ${
                        selectedId === index
                          ? "bi-chevron-down"
                          : "bi-chevron-right"
                      }`}
                    ></i>
                  </span>
                </p>
              </span>
            </li>
            {selectedId === index ? (
              <span
                className="followNoteContainer"
                style={{
                  // display: selectedId ? "inline-block" : "none",
                  visibility: selectedId === index ? "visible" : "hidden",
                }}
              >
                <span className="p-2 followNote">{item.note}</span>
              </span>
            ) : null}
          </>
        );
      });
    }
  };
  return (
    <ul className="verticalStepper mb-3">
      {/* finalStep */}
      {guestData.startedlifegroup === "started" && (
        <>
          <div className="guestJourney">
            <div className="stepImage">
              <img
                src={require("../../../assets/images/guestCounter/finalStep.png")}
                alt="finalStep"
                // width={124}
                // height={70}
              />
            </div>
            <div className="stepContent">
              <li>
                <span className="stepcircle"></span>
                <span className="stepline">
                  <p>
                    Hooray! Anand started coming to Life Groups{" "}
                    <strong className="text-black">29/11/2023</strong>{" "}
                    <img
                      src={require("../../../assets/images/guestCounter/tick.png")}
                      alt="happy"
                      width={28}
                      height={28}
                    />
                  </p>
                </span>
              </li>
              {/* added for gap between steps */}
              <li>
                <span className="stepline"></span>
              </li>
              {/* added for gap between steps */}
            </div>
          </div>
          {/* below div to create gap */}
          <div className="lineGap"></div>
        </>
      )}

      {/* followUpAssignStep */}
      <div className="guestJourney">
        <div className="stepImage">
          <img
            src={require("../../../assets/images/guestCounter/followUpAssignStep.png")}
            alt="followUpAssignStep"
            // width={124}
            height={81}
          />
        </div>
        {guestData?.followupmember === "" ||
        guestData?.followupnotes?.length === 0 ? (
          <div className="stepContent">
            <li>
              <span className="stepcircle"></span>
              <span className="stepline">
                <p>
                  No Member assigned yet to follow up with this person{" "}
                  <img
                    src={require("../../../assets/images/guestCounter/sad.png")}
                    alt="sad"
                    width={16}
                    height={16}
                  />{" "}
                  <span className="text-info fw-bold">
                    {guestData?.followupmember === ""
                      ? "Assign Now"
                      : guestData?.followupnotes?.length === 0
                      ? "Follow-up Now"
                      : null}
                  </span>
                </p>
              </span>
            </li>
            {/* added for gap between steps */}
            <li>
              <span className="stepline"></span>
            </li>
            <li>
              <span className="stepline"></span>
            </li>
            {/* added for gap between steps */}
          </div>
        ) : guestData?.followupmember !== "" ? (
          <div className="stepContent">
            {followUpNotesSection()}
            <li>
              <span className="stepcircle"></span>
              <span className="stepline">
                <p>
                  Follow up member <b> {guestData.followupmember} </b> assigned
                  on{" "}
                  <strong className="text-black">
                    followupmemberassigneddate
                  </strong>
                </p>
              </span>
            </li>
            {/* added for gap between steps */}
            <li>
              <span className="stepline"></span>
            </li>
            <li>
              <span className="stepline"></span>
            </li>
            {/* added for gap between steps */}
          </div>
        ) : null}
      </div>
      {/* below div to create gap */}
      <div className="lineGap"></div>
      {/* welcomeStep */}
      <div className="guestJourney">
        <div className="stepImage">
          <img
            src={require("../../../assets/images/guestCounter/welcomeStep.png")}
            alt="welcomeStep"
            // width={124}
            // height={70}
          />
        </div>
        <div className="stepContent">
          <li>
            <span className="stepcircle"></span>
            <span className="stepline">
              <p>
                Assigned to LifeGroup <b> {lifeGroupPlace} </b> on
                {" lifegroupassigndate"}
                <strong className="text-black">
                  {guestData.startedlifegroup}
                </strong>
              </p>
            </span>
          </li>
          <li>
            <span className="stepcircle"></span>
            <span className="stepline">
              <p>
                Interested to join LifeGroup?{" "}
                {guestData.willingnesstojoin === "Hot" || "Warm" ? (
                  <img
                    src={require("../../../assets/images/guestCounter/happy.png")}
                    alt="happy"
                    width={16}
                    height={16}
                  />
                ) : (
                  <img
                    src={require("../../../assets/images/guestCounter/sad.png")}
                    alt="sad"
                    width={16}
                    height={16}
                  />
                )}{" "}
                {guestData.willingnesstojoin}
              </p>
            </span>
          </li>
          <li>
            <span className="stepcircle"></span>
            <span className="stepline">
              <p>
                {guestData.firstname} came first on{" "}
                <strong className="text-black">{guestData.enteredon}</strong>
              </p>
            </span>
          </li>
        </div>
      </div>
    </ul>
  );
};
export default GuestJourney;
