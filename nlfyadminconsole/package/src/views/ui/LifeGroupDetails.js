import { Button } from "reactstrap";
import { useState } from "react";
import ComponentCard from "../../components/ComponentCard";
import ComponentModal from "../../components/ComponentModal";
import PropTypes from "prop-types";
import Alerts from "./Alerts";
import NestedTable from "../../components/NestedTable";

const LifeGroupDetails = ({ props }) => {
  console.log("LGD", props);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openResetModal, setOpenResetModal] = useState(false);
  const openModal = () => {
    setOpenDeleteModal(!openDeleteModal);
  };
  const openresetModal = () => {
    setOpenResetModal(!openResetModal);
  };
  return props === null || undefined ? (
    <div>ADD LifeGroup</div>
  ) : (
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
        <ComponentCard title={`Life Group - ${props.location}`}>
          <div className="mb-4">
            <label htmlFor="leaders" className="form-label text-dark fw-bold">
              Leaders
            </label>
            <input
              type="text"
              className="form-control p-2 modal-body-input shadow-none"
              id="leaders"
              placeholder="Anzi & Vegin"
              defaultValue={props?.leaders}
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
              defaultValue={props?.meetingDay}
            />
          </div>
          {props?.members[0] === "0" ? null : (
            <div>
              <label
                htmlFor="membersTable"
                className="form-label text-dark fw-bold"
              >
                Members
              </label>
              <NestedTable
                tableData={props?.members[1]}
                fromLifeGroupDetailsPage={true}
              />
            </div>
          )}
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
    </>
  );
};

export default LifeGroupDetails;
