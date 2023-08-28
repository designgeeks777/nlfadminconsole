import {
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Carousel,
  CarouselControl,
  CarouselIndicators,
  CarouselItem,
  Col,
  Row,
  Table,
} from "reactstrap";
import ProjectTables from "../../../components/dashboard/ProjectTable";
import { useState } from "react";
import LifeGroupDetails from "./LifeGroupDetails";
import AddLifeGroup from "./AddLifeGroup";
import JoiningRequests from "./JoiningRequests";

const tableData = [
  {
    id: "1",
    location: "Amruthahalli",
    leaders: "Anzi & Vegin",
    meetingDay: "Alternative Thursdays",
    members: "0",
    action: "edit/delete",
  },
  {
    id: "2",
    location: "Kannur",
    leaders: "Suraj & Rose",
    meetingDay: "Alternative Fridays",
    members: [
      "2",
      [
        {
          memberName: "Ria",
          phoneNumber: "+919986169736",
        },
        {
          memberName: "Ria",
          phoneNumber: "+919986169736",
        },
      ],
    ],
    action: "edit/delete",
  },
  {
    id: "3",
    location: "Yelahanka",
    leaders: "Anna & Sandeep",
    meetingDay: "Alternative Wednesdays",
    members: [
      "1",
      [
        {
          memberName: "Ria",
          phoneNumber: "+919986169736",
        },
      ],
    ],
    action: "edit/delete",
  },
];

const tableColumns = [
  { path: "location", name: "Location" },
  { path: "leaders", name: "Leaders" },
  { path: "members", name: "Members" },
  { path: "action", name: "Edit/Delete" },
];
const joiningRequestsArray = [
  {
    location: "Amruthahalli",
    leaders: "Anzi & Vegin",
    name: "Ridan",
    phoneNumber: "919986169736",
  },
  {
    location: "Kannur",
    leaders: "Suraj & Rose",
    name: "Ridan",
    phoneNumber: "919986169736",
  },
  {
    location: "Yelahanka",
    leaders: "Anna & Sandeep",
    name: "Ridan",
    phoneNumber: "919986169736",
  },
  {
    location: "Vidyaranyapura",
    leaders: "Anna & Sandeep",
    name: "Ridan",
    phoneNumber: "919986169736",
  },
];
const LifeGroups = () => {
  const [lifeGroupDetailPageData, setLifeGroupDetailPageData] = useState(null);
  const [state, setState] = useState(false);
  const [addLifeGroup, setAddLifeGroup] = useState(false);

  const handleCallback = (showChild, childData) => {
    // Update the data and show LifeGroupDetails component.
    console.log("handleCallback", showChild, childData);
    setState(showChild);
    setLifeGroupDetailPageData(childData);
  };
  return (
    <>
      {addLifeGroup ? (
        <AddLifeGroup />
      ) : (
        <div className="d-flex flex-column mb-3">
          {!state ? (
            <>
              <JoiningRequests />
              <div className="p-2 mb-3 align-self-end">
                <Button
                  className="btn buttons"
                  color="primary"
                  onClick={() => {
                    setAddLifeGroup(true);
                  }}
                >
                  <i className="bi bi-plus fa-lg"></i> Add Life Group
                </Button>
              </div>
            </>
          ) : null}
          {state ? (
            <LifeGroupDetails props={lifeGroupDetailPageData} />
          ) : (
            <Row>
              <Col lg="12">
                <ProjectTables
                  parentCallback={handleCallback}
                  title="LifeGroup List"
                  tableData={tableData}
                  tableColumns={tableColumns}
                />
              </Col>
            </Row>
          )}
        </div>
      )}
    </>
  );
};

export default LifeGroups;
