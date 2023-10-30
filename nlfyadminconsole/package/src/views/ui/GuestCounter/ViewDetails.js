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
                <label>First Name</label>
                <label>Anand</label>
              </div>
              <div>
                <label>Last Name</label>
                <label>Rao</label>
              </div>
              <div>
                <label>Address</label>
                <label>
                  Flat A/3, 242/1, ABC, Yelahanka Flat A/3, 242/1, ABC,
                  Yelahanka Flat A/3, 242/1, ABC, Yelahanka Flat A/3, 242/1,
                  ABC, Yelahanka
                </label>
              </div>
            </InfoCard>
            <InfoCard cardLabel="Other Info" editLabel="Edit Info">
              <div>
                <div>
                  <label>Gender</label>
                  <label className="ps-3">Male</label>
                </div>
                <div>
                  <label>Entered On</label>
                  <label>23/11/2023</label>
                </div>
              </div>
              <div>
                {/* <label style={{ flex: "1 0 28%" }}>Martial Status</label>
              <label style={{ flex: "2 0 72%" }}>Single</label> */}
                <label>Martial Status</label>
                <label>Single</label>
              </div>
              <div>
                <label>Source</label>
                <label className="ps-3">Personal Information</label>
                <label>Invited By</label>
                <label>Suraj</label>
              </div>
            </InfoCard>
          </div>
        </Col>
        <Col sm="6" md="6">
          <InfoCard cardLabel="Contact Info" editLabel="Edit Info">
            <div>
              <label>Contact number</label>
              <label>+91922938493</label>
            </div>
            <div>
              <label>Email Id</label>
              {/* <label>No Email Id</label> */}
              <label style={{ width: "50%" }}>sephoraPeak@dss@yahoo.com</label>
            </div>
            <div>
              <label>DOB</label>
              <label>04 April 2018</label>
            </div>
          </InfoCard>
          <InfoCard cardLabel="LifeGroup Details" editLabel="Edit Info">
            <div>
              <label>Willingness to join</label>
              <label>Warm</label>
            </div>
            <div>
              <label>LifeGroup</label>
              <label>Kannur</label>
            </div>
            <div>
              <label>Follow-up</label>
              <label>Praveen</label>
            </div>
          </InfoCard>
        </Col>
      </Row>
      <div class="form-check">
        <input
          class="form-check-input text-primary shadow-none"
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
