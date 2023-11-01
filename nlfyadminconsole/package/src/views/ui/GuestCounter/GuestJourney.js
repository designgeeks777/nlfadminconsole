import React, { useState } from "react";
const GuestJourney = () => {
  const [selectedId, setSelectedId] = useState(false);

  const onSelectItem = (id) => {
    if (id === selectedId) return setSelectedId(null);
    setSelectedId(id);
  };
  return (
    <ul className="verticalStepper mb-3">
      {/* finalStep */}
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
          <li>
            <span className="stepcircle"></span>
            <span className="stepline">
              <p>
                Followed up on{" "}
                <strong className="text-black">26/11/2023</strong>{" "}
                <span className="text-primary">
                  See Follow-up note{" "}
                  <i
                    className={`bi ${
                      // selectedId === index
                      selectedId ? "bi-chevron-down" : "bi-chevron-right"
                    } text-primary`}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      // onSelectItem(index);
                      setSelectedId(!selectedId);
                    }}
                  />
                </span>
              </p>
            </span>
          </li>
          {/* {selectedId ? (
            <span
              className="p-2 followNote"
              style={{
                display: selectedId ? "inline-block" : "none",
                visibility: selectedId ? "visible" : "hidden",
              }}
            >
              “Had a general conversation on phone.Spoke around 15 mins.Seemed
              pretty enthusiastic.However, seeming little confused as well.”
            </span>
          ) : null} */}
        </div>
      </div>
      {/* below div to create gap */}
      <div className="lineGap"></div>
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
                <span className="text-info">Assing Now/Follow-up Now</span>
              </p>
            </span>
          </li>
          <li>
            <span className="stepcircle"></span>
            <span className="stepline">
              <p>
                Followed up on{" "}
                <strong className="text-black">25/11/2023</strong>{" "}
                <span className="text-primary">
                  {selectedId ? "Close Follow-up note " : "See Follow-up note "}
                  <i
                    className={`bi ${
                      // selectedId === index
                      selectedId ? "bi-chevron-down" : "bi-chevron-right"
                    } text-primary`}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      // onSelectItem(index);
                      setSelectedId(!selectedId);
                    }}
                  />
                </span>
              </p>
            </span>
          </li>
          {selectedId ? (
            <span
              className="followNoteContainer"
              style={{
                // display: selectedId ? "inline-block" : "none",
                visibility: selectedId ? "visible" : "hidden",
              }}
            >
              <span className="p-2 followNote">
                “Had a general conversation on phone.Spoke around 15 mins.Seemed
                pretty enthusiastic.However, seeming little confused as well.”
              </span>
            </span>
          ) : null}
          <li>
            <span className="stepcircle"></span>
            <span className="stepline">
              <p>
                Followed up on{" "}
                <strong className="text-black">24/11/2023</strong>{" "}
                <span className="text-primary">
                  See Follow-up note <i className="bi bi-chevron-right"></i>
                </span>
              </p>
            </span>
          </li>
          {selectedId ? (
            <span
              className="followNoteContainer"
              style={{
                // display: selectedId ? "inline-block" : "none",
                visibility: selectedId ? "visible" : "hidden",
              }}
            >
              <span className="p-2 followNote">
                “Had a general conversation on phone.Spoke around 15 mins.Seemed
                pretty enthusiastic.However, seeming little confused as well.”
              </span>
            </span>
          ) : null}
          <li>
            <span className="stepcircle"></span>
            <span className="stepline">
              <p>
                Follow up member <b> Praveen </b> assigned on{" "}
                <strong className="text-black">24/11/2023</strong>
              </p>
            </span>
          </li>
        </div>
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
                Assigned to LifeGroup <b> Kannur </b> on{" "}
                <strong className="text-black">24/11/2023</strong>
              </p>
            </span>
          </li>
          <li>
            <span className="stepcircle"></span>
            <span className="stepline">
              <p>
                Interested to join LifeGroup?{" "}
                <img
                  src={require("../../../assets/images/guestCounter/happy.png")}
                  alt="happy"
                  width={16}
                  height={16}
                />{" "}
                Warm
              </p>
            </span>
          </li>
          <li>
            <span className="stepcircle"></span>
            <span className="stepline">
              <p>
                Anand came first on{" "}
                <strong className="text-black">23/11/2023</strong>
              </p>
            </span>
          </li>
        </div>
      </div>
    </ul>
  );
};
export default GuestJourney;
