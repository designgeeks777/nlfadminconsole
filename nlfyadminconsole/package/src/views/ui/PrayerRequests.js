import { Col, Row } from "reactstrap";
import ProjectTables from "../../components/dashboard/ProjectTable";
import user1 from "../../assets/images/users/user1.jpg";
import user2 from "../../assets/images/users/user2.jpg";
import user4 from "../../assets/images/users/user4.jpg";
import user3 from "../../assets/images/users/user3.jpg";
import user5 from "../../assets/images/users/user5.jpg";

const tableData = [
  {
    requestBy: [user2, "Hanna"],
    requestMessage:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis n",
    responses: "0",
    raisedOn: "23/11/2022",
  },
  {
    requestBy: [user1, "Hanna"],
    requestMessage:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis n",
    responses: "2",
    raisedOn: "21/01/2022",
  },
  {
    requestBy: [user4, "Hanna"],
    requestMessage:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis n",
    responses: "1",
    raisedOn: "02/02/2022",
  },
];
const tableColumns = [
  { path: "requestBy", name: "Request by" },
  { path: "requestMessage", name: "Request Message" },
  { path: "responses", name: "Responses" },
  { path: "raisedOn", name: "Raised On" },
];

const PrayerRequests = () => {
  return (
    <div>
      <div class="d-flex flex-column mb-3">
        <div class="p-2">
          <Row>
            <Col lg="12">
              <ProjectTables
                title="Prayer Requests"
                tableData={tableData}
                tableColumns={tableColumns}
              />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default PrayerRequests;