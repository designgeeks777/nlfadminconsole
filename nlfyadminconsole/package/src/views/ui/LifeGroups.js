import { Col, Row } from "reactstrap";
import ProjectTables from "../../components/dashboard/ProjectTable";

const tableData = [
  {
    location: "Amruthahalli",
    leaders: "Anzi/Vegin",
    members: "0",
    action: "edit/delete",
  },
  {
    location: "Kannur",
    leaders: "Anzi & Vegin",
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
    location: "Yelahanka",
    leaders: "Anna & Sandeep",
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

const LifeGroups = () => {
  return (
    <div>
      <div className="d-flex flex-column mb-3">
        <div className="p-2">
          <Row>
            <Col lg="12">
              <ProjectTables
                title="LifeGroup List"
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

export default LifeGroups;
