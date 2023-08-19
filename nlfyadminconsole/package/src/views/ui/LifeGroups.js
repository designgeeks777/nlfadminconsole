import {
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Col,
  Row,
  Table,
} from "reactstrap";
import ProjectTables from "../../components/dashboard/ProjectTable";
import { useState } from "react";
import ComponentCard from "../../components/ComponentCard";
import ComponentModal from "../../components/ComponentModal";
import Alerts from "./Alerts";
import LifeGroupDetails from "./LifeGroupDetails";

const tableData = [
  {
    id: "1",
    location: "Amruthahalli",
    leaders: "Anzi & Vegin",
    members: "0",
    action: "edit/delete",
  },
  {
    id: "2",
    location: "Kannur",
    leaders: "Suraj & Rose",
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
  const [state, setState] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openResetModal, setOpenResetModal] = useState(false);
  const openModal = () => {
    setOpenDeleteModal(!openDeleteModal);
  };
  const openresetModal = () => {
    setOpenResetModal(!openResetModal);
  };
  return (
    <>
      <div className="d-flex flex-column mb-3">
        {!state ? (
          <>
            <div>
              <CardTitle tag="h4" className="text-primary">
                Joining Requests
              </CardTitle>
              <Row className="mt-3">
                <Col sm="6" lg="4">
                  <Card body color="white" className="p-4">
                    <CardTitle tag="h5">Amruthahalli</CardTitle>
                    <CardText className="text-dark">
                      Lead by: Anzi & Vegin
                    </CardText>
                    <CardText className="text-primary fw-bold">Ridan</CardText>
                    <CardText className="text-primary">
                      (+919986169736)
                    </CardText>
                    <div className="button-group d-flex">
                      <Button className="btn jrlg-buttons mx-2" color="primary">
                        Accept
                      </Button>
                      <Button className="btn jrlg-buttons" color="secondary">
                        Decline
                      </Button>
                    </div>
                  </Card>
                </Col>
                <Col sm="6" lg="4">
                  <Card body color="white" className="p-4">
                    <CardTitle tag="h5">Vidyanarayanpura</CardTitle>
                    <CardText className="text-dark">
                      Lead by: Sandeep & Anna
                    </CardText>
                    <CardText className="text-primary fw-bold">Ridan</CardText>
                    <CardText className="text-primary">
                      (+919986169736)
                    </CardText>
                    <div className="button-group d-flex">
                      <Button className="btn jrlg-buttons mx-2" color="primary">
                        Accept
                      </Button>
                      <Button className="btn jrlg-buttons" color="secondary">
                        Decline
                      </Button>
                    </div>
                  </Card>
                </Col>
                <Col sm="6" lg="4">
                  <Card body color="white" className="p-4">
                    <CardTitle tag="h5">Yelahanka</CardTitle>
                    <CardText className="text-dark">
                      Lead by: Sudhakar & Sherly
                    </CardText>
                    <CardText className="text-primary fw-bold">Ridan</CardText>
                    <CardText className="text-primary">
                      (+919986169736)
                    </CardText>
                    <div className="button-group d-flex">
                      <Button className="btn jrlg-buttons mx-2" color="primary">
                        Accept
                      </Button>
                      <Button className="btn jrlg-buttons" color="secondary">
                        Decline
                      </Button>
                    </div>
                  </Card>
                </Col>
              </Row>
            </div>
            <div className="p-2 align-self-end">
              <Button
                className="btn buttons"
                color="primary"
                onClick={() => {
                  setState(true);
                }}
              >
                <i className="bi bi-plus fa-lg"></i> Add Life Group
              </Button>
            </div>
          </>
        ) : null}
        {state ? (
          <LifeGroupDetails props={{ state: state }} />
        ) : (
          // <div className="d-flex flex-column">
          //   <div className="p-2 align-self-end mb-3">
          //     <Button
          //       className="btn px-4 py-2 buttons"
          //       color="primary"
          //       onClick={() => {
          //         setOpenDeleteModal(true);
          //       }}
          //     >
          //       Delete
          //     </Button>
          //     {openDeleteModal ? (
          //       <ComponentModal
          //         state={openDeleteModal}
          //         toggle={openModal}
          //         title="Delete"
          //         submitButtonTitle="Yes"
          //         cancelButtonTitle="No"
          //       >
          //         <p className="text-center">
          //           Are you sure to delete the LifeGroup?
          //         </p>
          //       </ComponentModal>
          //     ) : null}
          //   </div>
          //   <ComponentCard title="Life Group Amruthahalli">
          //     <div className="mb-4">
          //       <label
          //         htmlFor="leaders"
          //         className="form-label text-dark fw-bold"
          //       >
          //         Leaders
          //       </label>
          //       <input
          //         type="text"
          //         className="form-control p-2 modal-body-input shadow-none"
          //         id="leaders"
          //         placeholder="Anzi & Vegin"
          //       />
          //     </div>
          //     <div className="mb-4">
          //       <label
          //         htmlFor="meetingDays"
          //         className="form-label text-dark fw-bold"
          //       >
          //         Meeting Days
          //       </label>
          //       <input
          //         type="text"
          //         className="form-control p-2 modal-body-input shadow-none"
          //         id="meetingDays"
          //         placeholder="Alternate Thursdays"
          //       />
          //     </div>
          //     <div>
          //       <label
          //         htmlFor="membersTable"
          //         className="form-label text-dark fw-bold"
          //       >
          //         Members
          //       </label>
          //       <Card
          //         id="membersTable"
          //         className="shadow-none w-50 custom-table-card"
          //       >
          //         <CardBody className="p-0">
          //           <Table
          //             className="my-0 custom-table no-wrap
          //           align-middle"
          //             responsive
          //             borderless
          //           >
          //             <thead>
          //               <tr>
          //                 <th className="text-primary nowrap">Member Name</th>
          //                 <th className="text-primary nowrap">Mobile Name</th>
          //               </tr>
          //             </thead>
          //             <tbody>
          //               <tr>
          //                 <td>Mark</td>
          //                 <td>
          //                   +919986169736{" "}
          //                   <span className="text-info">Remove</span>
          //                 </td>
          //               </tr>
          //               <tr>
          //                 <td>Jacob</td>
          //                 <td>
          //                   +919986169736{" "}
          //                   <span className="text-info">Remove</span>
          //                 </td>
          //               </tr>
          //               <tr>
          //                 <td>Larry</td>
          //                 <td>
          //                   +919986169736{" "}
          //                   <span className="text-info">Remove</span>
          //                 </td>
          //               </tr>
          //             </tbody>
          //           </Table>
          //         </CardBody>
          //       </Card>
          //     </div>
          //   </ComponentCard>
          //   <div className="button-group align-self-end">
          //     <Button
          //       className="btn px-4 py-2 mx-3 buttons"
          //       color="secondary"
          //       onClick={() => {
          //         setOpenResetModal(true);
          //       }}
          //     >
          //       Reset
          //     </Button>
          //     <Button className="btn px-4 py-2 buttons" color="primary">
          //       Update
          //     </Button>
          //   </div>
          //   {openResetModal ? (
          //     <ComponentModal
          //       state={openResetModal}
          //       toggle={openresetModal}
          //       title="Reset"
          //       submitButtonTitle="Yes"
          //       cancelButtonTitle="No"
          //     >
          //       <p>
          //         Are you sure you want to reset? All your changes will be
          //         undone.
          //       </p>
          //     </ComponentModal>
          //   ) : null}
          // </div>
          <Row>
            <Col lg="12">
              <ProjectTables
                title="LifeGroup List"
                tableData={tableData}
                tableColumns={tableColumns}
              />
            </Col>
          </Row>
        )}
      </div>
    </>
  );
};

export default LifeGroups;
