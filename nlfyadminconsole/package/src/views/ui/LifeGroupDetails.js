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
import { useState } from "react";
import ComponentCard from "../../components/ComponentCard";
import ComponentModal from "../../components/ComponentModal";
import PropTypes from "prop-types";
import Alerts from "./Alerts";

const LifeGroupDetails = ({ props, state, action, data }) => {
  console.log("LGD", props, state, action, data);
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
      <Alerts
        props={{
          type: "success",
          icon: "bi-check",
          message: "Changes updated Succesfully!",
        }}
      />
      <Alerts
        props={{
          type: "danger",
          icon: "bi-exclamation-circle-fill",
          message:
            "Oops Sorry ! The changes couldnt be updated at the moment.Please check your network and ensure server is up.",
        }}
      />
      {props.state ? (
        <div className="d-flex flex-column">
          <div className="p-2 align-self-end mb-3">
            <Button
              className="btn px-4 py-2 buttons"
              color="primary"
              onClick={() => {
                setOpenDeleteModal(true);
              }}
            >
              Delete
            </Button>
            {openDeleteModal ? (
              <ComponentModal
                state={openDeleteModal}
                toggle={openModal}
                title="Delete"
                submitButtonTitle="Yes"
                cancelButtonTitle="No"
              >
                <p className="text-center">
                  Are you sure to delete the LifeGroup?
                </p>
              </ComponentModal>
            ) : null}
          </div>
          <ComponentCard title="Life Group Amruthahalli">
            <div className="mb-4">
              <label htmlFor="leaders" className="form-label text-dark fw-bold">
                Leaders
              </label>
              <input
                type="text"
                className="form-control p-2 modal-body-input shadow-none"
                id="leaders"
                placeholder="Anzi & Vegin"
                //   value={props.data.leaders}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="meetingDays"
                className="form-label text-dark fw-bold"
              >
                Meeting Days
              </label>
              <input
                type="text"
                className="form-control p-2 modal-body-input shadow-none"
                id="meetingDays"
                placeholder="Alternate Thursdays"
              />
            </div>
            <div>
              <label
                htmlFor="membersTable"
                className="form-label text-dark fw-bold"
              >
                Members
              </label>
              {/* <Card
                id="membersTable"
                className="shadow-none w-50 custom-table-card"
              >
                <CardBody className="p-0"> */}
              <Table
                className="my-0 w-50 custom-table no-wrap
                      align-middle"
                responsive
                borderless
              >
                <thead>
                  <tr>
                    <th className="text-primary nowrap">Member Name</th>
                    <th className="text-primary nowrap">Mobile Name</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Mark</td>
                    <td>
                      +919986169736 <span className="text-info">Remove</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Jacob</td>
                    <td>
                      +919986169736 <span className="text-info">Remove</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Larry</td>
                    <td>
                      +919986169736 <span className="text-info">Remove</span>
                    </td>
                  </tr>
                </tbody>
              </Table>
              {/* </CardBody>
              </Card> */}
            </div>
          </ComponentCard>
          <div className="button-group align-self-end">
            <Button
              className="btn px-4 py-2 mx-3 buttons"
              color="secondary"
              onClick={() => {
                setOpenResetModal(true);
              }}
            >
              Reset
            </Button>
            <Button className="btn px-4 py-2 buttons" color="primary">
              Update
            </Button>
          </div>
          {openResetModal ? (
            <ComponentModal
              state={openResetModal}
              toggle={openresetModal}
              title="Reset"
              submitButtonTitle="Yes"
              cancelButtonTitle="No"
            >
              <p>
                Are you sure you want to reset? All your changes will be undone.
              </p>
            </ComponentModal>
          ) : null}
        </div>
      ) : null}
    </>
  );
};

LifeGroupDetails.propTypes = {
  data: PropTypes.any,
  key: PropTypes.any,
  state: PropTypes.bool,
  // toggle: PropTypes.func,
  // children: PropTypes.node,
  // title: PropTypes.string,
};
export default LifeGroupDetails;
