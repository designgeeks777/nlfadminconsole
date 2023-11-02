import React, { useContext, useEffect, useRef, useState } from "react";
import InfoCard from "../../../components/InfoCard";
import { Col, Row, Table } from "reactstrap";
import { BASEURL } from "../../../APIKey";
import axios from "axios";
import { LoaderContext } from "../../../LoaderContext";

const ViewDetails = ({ guestData }) => {
  const id = "65433e146392cbd2128dba31";
  const url = `${BASEURL}guests/${id}`;
  const [lifeGroupPlace, setLifeGroupPlace] = useState("");
  const lifeGroupUrl = `${BASEURL}lifeGroups/${guestData.lifegroupid}`;
  const [showAlert, setShowAlert] = useState({
    isOpen: false,
    type: "",
    message: "",
  });
  const { isLoading, setIsLoading } = useContext(LoaderContext);

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
  const [started, setStarted] = useState(false);
  // const postStartedlifegroup = () => {
  //   let updateBody = { startedlifegroup: started };
  //   axios
  //     .patch(url, updateBody)
  //     .then(() => {})
  //     .catch((err) => {
  //       setIsLoading(false);
  //       console.error("POST Error:", err, showAlert);
  //     });
  // };
  return (
    <div className="m-1 mt-5">
      <Row>
        <Col sm="6" md="6">
          <div className="viewDetails">
            <InfoCard cardLabel="Basic Info" editLabel="Edit Info">
              <div>
                <p>First Name</p>
                <p>{guestData.firstname}</p>
              </div>
              <div>
                <p>Last Name</p>
                <p>{guestData.lastname}</p>
              </div>
              <div>
                <p>Address</p>
                <p>{guestData.address}</p>
              </div>
            </InfoCard>
            <InfoCard cardLabel="Other Info" editLabel="Edit Info">
              <div>
                <div>
                  <p>Gender</p>
                  <p className="ps-3">{guestData.gender}</p>
                </div>
                <div>
                  <p>Entered On</p>
                  <p>{guestData.enteredon}</p>
                </div>
              </div>
              <div>
                {/* <p style={{ flex: "1 0 28%" }}>Martial Status</p>
              <p style={{ flex: "2 0 72%" }}>Single</p> */}
                <p>Martial Status</p>
                <p>{guestData.maritalstatus}</p>
              </div>
              <div>
                <p>Source</p>
                <p className="ps-2">{guestData.hearaboutus}</p>
                <p>
                  {guestData.hearaboutus === "Personal Invitation"
                    ? "Invited By"
                    : guestData.hearaboutus === "Others"
                    ? "Other Source"
                    : null}
                </p>
                <p>
                  {guestData.hearaboutus === "Personal Invitation"
                    ? guestData.invitedby
                    : guestData.hearaboutus === "Others"
                    ? guestData.hearaboutusothers
                    : null}
                </p>
              </div>
            </InfoCard>
          </div>
        </Col>
        <Col sm="6" md="6">
          <InfoCard cardLabel="Contact Info" editLabel="Edit Info">
            <div>
              <p>Contact number</p>
              <p>{guestData.contactnumber}</p>
            </div>
            <div>
              <p>Email Id</p>
              {/* <p>No Email Id</p> */}
              <p style={{ width: "50%", textTransform: "none" }}>
                {guestData.email === "" ? "No email Id" : guestData.email}
              </p>
            </div>
            <div>
              <p>DOB</p>
              <p>{guestData.dob}</p>
            </div>
          </InfoCard>
          <InfoCard cardLabel="LifeGroup Details" editLabel="Edit Info">
            <div>
              <p>Willingness to join</p>
              <p>{guestData.willingnesstojoin}</p>
            </div>
            <div>
              <p>LifeGroup</p>
              <p>
                {guestData.lifegroupid === "" ? "Not assigned" : lifeGroupPlace}
              </p>
            </div>
            <div>
              <p>Follow-up</p>
              <p>
                {guestData.followupmember === ""
                  ? "Not assigned"
                  : guestData.followupmember}
              </p>
            </div>
          </InfoCard>
        </Col>
      </Row>
      <div className="form-check">
        <input
          className="form-check-input text-primary shadow-none"
          type="checkbox"
          checked={started}
          onChange={() => {
            setStarted(!started);
          }}
          id="flexCheckDefault"
          name="flexCheckDefault"
        />
        <label
          htmlFor="flexCheckDefault"
          className="p-0 form-check-label fw-bold"
        >
          Started coming to church/lifeGroup regularly?
        </label>
      </div>
    </div>
  );
};
export default ViewDetails;
