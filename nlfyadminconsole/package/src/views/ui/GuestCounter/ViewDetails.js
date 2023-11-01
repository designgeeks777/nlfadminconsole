import React from "react";
import InfoCard from "../../../components/InfoCard";
import { Col, Row, Table } from "reactstrap";
const ViewDetails = () => {
  return (
    <div className="m-1 mt-5">
      <Row>
        <Col sm="6" md="6">
          <div className="viewDetails">
            <InfoCard cardLabel="Basic Info" editLabel="Edit Info">
              <div>
                <p>First Name</p>
                <p>Anand</p>
              </div>
              <div>
                <p>Last Name</p>
                <p>Rao</p>
              </div>
              <div>
                <p>Address</p>
                <p>
                  Flat A/3, 242/1, ABC, Yelahanka Flat A/3, 242/1, ABC,
                  Yelahanka Flat A/3, 242/1, ABC, Yelahanka Flat A/3, 242/1,
                  ABC, Yelahanka
                </p>
              </div>
            </InfoCard>
            <InfoCard cardLabel="Other Info" editLabel="Edit Info">
              <div>
                <div>
                  <p>Gender</p>
                  <p className="ps-3">Male</p>
                </div>
                <div>
                  <p>Entered On</p>
                  <p>23/11/2023</p>
                </div>
              </div>
              <div>
                {/* <p style={{ flex: "1 0 28%" }}>Martial Status</p>
              <p style={{ flex: "2 0 72%" }}>Single</p> */}
                <p>Martial Status</p>
                <p>Single</p>
              </div>
              <div>
                <p>Source</p>
                <p className="ps-3">Personal Information</p>
                <p>Invited By</p>
                <p>Suraj</p>
              </div>
            </InfoCard>
          </div>
        </Col>
        <Col sm="6" md="6">
          <InfoCard cardLabel="Contact Info" editLabel="Edit Info">
            <div>
              <p>Contact number</p>
              <p>+91922938493</p>
            </div>
            <div>
              <p>Email Id</p>
              {/* <p>No Email Id</p> */}
              <p style={{ width: "50%" }}>sephoraPeak@dss@yahoo.com</p>
            </div>
            <div>
              <p>DOB</p>
              <p>04 April 2018</p>
            </div>
          </InfoCard>
          <InfoCard cardLabel="LifeGroup Details" editLabel="Edit Info">
            <div>
              <p>Willingness to join</p>
              <p>Warm</p>
            </div>
            <div>
              <p>LifeGroup</p>
              <p>Kannur</p>
            </div>
            <div>
              <p>Follow-up</p>
              <p>Praveen</p>
            </div>
          </InfoCard>
        </Col>
      </Row>
      <div className="form-check">
        <input
          className="form-check-input text-primary shadow-none"
          type="checkbox"
          value=""
          id="flexCheckDefault"
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
