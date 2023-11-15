import React, { useEffect, useState } from "react";

const GuestJourney = ({ guestData, goToTab, lifeGroupPlace }) => {
  const [selectedId, setSelectedId] = useState(null);
  const onSelectItem = (id) => {
    if (id === selectedId) return setSelectedId(null);
    setSelectedId(id);
  };

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
                src={require("../../../../assets/images/guestCounter/finalStep.png")}
                alt="finalStep"
              />
            </div>
            <div className="stepContent">
              <li>
                <span className="stepcircle"></span>
                <span className="stepline">
                  <p>
                    Hooray!{" "}
                    {guestData?.firstname?.charAt(0).toUpperCase() +
                      guestData?.firstname?.slice(1)}{" "}
                    started coming to Life Group{" "}
                    <strong className="text-black">
                      {guestData?.startedlifegroupdate}
                    </strong>{" "}
                    <img
                      src={require("../../../../assets/images/guestCounter/tick.png")}
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
            src={require("../../../../assets/images/guestCounter/followUpAssignStep.png")}
            alt="followUpAssignStep"
            height={81}
          />
        </div>
        {guestData?.followupmember === "" ? (
          <div className="stepContent">
            <li>
              <span className="stepcircle"></span>
              <span className="stepline">
                <p>
                  No Member assigned yet to follow up with this person{" "}
                  <img
                    src={require("../../../../assets/images/guestCounter/sad.png")}
                    alt="sad"
                    width={16}
                    height={16}
                  />{" "}
                  <span
                    className="text-info fw-bold"
                    onClick={() => {
                      goToTab("viewDetails");
                    }}
                  >
                    Assign Now
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
            {guestData?.followupnotes?.length === 0 ? (
              <li>
                <span className="stepcircle"></span>
                <span className="stepline">
                  <p>
                    No follow-up has happened with this person yet{" "}
                    <img
                      src={require("../../../../assets/images/guestCounter/sad.png")}
                      alt="sad"
                      width={16}
                      height={16}
                    />{" "}
                    <span
                      className="text-info fw-bold"
                      onClick={() => {
                        goToTab("followup");
                      }}
                    >
                      Follow-up Now
                    </span>
                  </p>
                </span>
              </li>
            ) : (
              followUpNotesSection()
            )}
            <li>
              <span className="stepcircle"></span>
              <span className="stepline">
                <p>
                  Follow up member <b> {guestData.followupmember} </b> assigned
                  on{" "}
                  <strong className="text-black">
                    {guestData.followupmemberassigneddate}
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
            src={require("../../../../assets/images/guestCounter/welcomeStep.png")}
            alt="welcomeStep"
          />
        </div>
        <div className="stepContent">
          <li>
            <span className="stepcircle"></span>
            <span className="stepline">
              {guestData.lifegroupid === "" ? (
                <p>
                  Not assigned to any LifeGroup yet{" "}
                  <img
                    src={require("../../../../assets/images/guestCounter/sad.png")}
                    alt="sad"
                    width={16}
                    height={16}
                  />{" "}
                  <span
                    className="text-info fw-bold"
                    onClick={() => {
                      goToTab("viewDetails");
                    }}
                  >
                    Assign Now
                  </span>
                </p>
              ) : (
                <p>
                  Assigned to LifeGroup <b> {lifeGroupPlace} </b> on{" "}
                  <strong className="text-black">
                    {guestData.lifegroupassigndate}
                  </strong>
                </p>
              )}
            </span>
          </li>
          <li>
            <span className="stepcircle"></span>
            <span className="stepline">
              <p>
                Interested to join LifeGroup?{" "}
                {guestData.willingnesstojoin === "Hot" || "Warm" ? (
                  <img
                    src={require("../../../../assets/images/guestCounter/happy.png")}
                    alt="happy"
                    width={16}
                    height={16}
                  />
                ) : (
                  <img
                    src={require("../../../../assets/images/guestCounter/sad.png")}
                    alt="sad"
                    width={16}
                    height={16}
                  />
                )}{" "}
                {guestData?.willingnesstojoin?.charAt(0).toUpperCase() +
                  guestData?.willingnesstojoin?.slice(1)}
              </p>
            </span>
          </li>
          <li>
            <span className="stepcircle"></span>
            <span className="stepline">
              <p>
                {guestData?.firstname?.charAt(0).toUpperCase() +
                  guestData?.firstname?.slice(1)}{" "}
                came first on{" "}
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
