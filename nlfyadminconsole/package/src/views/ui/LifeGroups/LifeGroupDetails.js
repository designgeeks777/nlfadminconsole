import { Button, FormGroup, Input, Label } from "reactstrap";
import { useState } from "react";
import ComponentCard from "../../../components/ComponentCard";
import ComponentModal from "../../../components/ComponentModal";
import PropTypes from "prop-types";
import Alerts from "../Alerts";
import NestedTable from "../../../components/NestedTable";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASEURL } from "../../../APIKey";

const LifeGroupDetails = () => {
  const { state } = useLocation();
  const [selectedLifeGroupData, setSelectedLifeGroupData] = useState({
    place: state.selectedLifeGroupData.place,
    leaders: state.selectedLifeGroupData.leaders,
    meetingDay: state.selectedLifeGroupData.meetingDay,
    members: state.selectedLifeGroupData.members,
    _id: state.selectedLifeGroupData._id,
  });
  // selectedLifeGroupData = state.selectedLifeGroupData;

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openResetModal, setOpenResetModal] = useState(false);
  const openModal = () => {
    setOpenDeleteModal(!openDeleteModal);
  };
  const openresetModal = () => {
    setOpenResetModal(!openResetModal);
  };

  const [showAlert, setShowAlert] = useState({
    isOpen: false,
    type: "",
    message: "",
  });

  const url = `${BASEURL}lifeGroups/`;
  let navigate = useNavigate();
  console.log("LGD", selectedLifeGroupData);

  const deleteLifeGroup = () => {
    console.log("in delete func");
    axios
      .delete(url + selectedLifeGroupData._id)
      .then(() => {
        setShowAlert({
          ...showAlert,
          isOpen: true,
          type: "success",
          message: "Deleted Life Group successfully",
        });
        setOpenDeleteModal(false);
        setTimeout(() => {
          setShowAlert({ isOpen: false, type: "", message: "" });
          navigate("/lifeGroups");
        }, 3000);
      })
      .catch((error) => {
        setShowAlert({
          ...showAlert,
          isOpen: true,
          type: "danger",
          message: error.message,
        });
        setOpenDeleteModal(false);
        setTimeout(() => {
          setShowAlert({ isOpen: false, type: "", message: "" });
        }, 3000);
        console.error(error);
      });
  };

  const updateLifeGroup = () => {
    console.log("added", selectedLifeGroupData);
    axios
      .patch(`${url}${selectedLifeGroupData._id}`, selectedLifeGroupData)
      .then(() => {
        setShowAlert({
          ...showAlert,
          isOpen: true,
          type: "success",
          message: "Updated Life Group successfully",
        });
        setTimeout(() => {
          setShowAlert({ isOpen: false, type: "", message: "" });
          // navigate("/lifeGroups");
        }, 3000);
      })
      .catch((error) => {
        setShowAlert({
          ...showAlert,
          isOpen: true,
          type: "danger",
          message: error.message,
        });
        setTimeout(() => {
          setShowAlert({ isOpen: false, type: "", message: "" });
        }, 3000);
      });
  };

  const resetLifeGroup = () => {
    setOpenResetModal(false);
    setSelectedLifeGroupData({
      ...selectedLifeGroupData,
      place: state.selectedLifeGroupData.place,
      leaders: state.selectedLifeGroupData.leaders,
      meetingDay: state.selectedLifeGroupData.meetingDay,
      members: state.selectedLifeGroupData.members,
    });
  };

  const handleLifeGroupLeadersChange = (event) => {
    setSelectedLifeGroupData({
      ...selectedLifeGroupData,
      leaders: event.target.value,
    });
  };

  const handleLifeGroupMeetingDayChange = (event) => {
    setSelectedLifeGroupData({
      ...selectedLifeGroupData,
      meetingDay: event.target.value,
    });
  };

  const removeMember = (removeMember) => {
    selectedLifeGroupData.members = selectedLifeGroupData.members.filter(
      (member) => {
        return member.uid !== removeMember.uid;
      }
    );
    console.log(selectedLifeGroupData.members);
    axios
      .post(`${url}${selectedLifeGroupData._id}`, selectedLifeGroupData)
      .then(() => {
        setShowAlert({
          ...showAlert,
          isOpen: true,
          type: "success",
          message: "Removed member from Life Group successfully",
        });
        setTimeout(() => {
          setShowAlert({ isOpen: false, type: "", message: "" });
          // navigate("/lifeGroups");
        }, 3000);
      })
      .catch((error) => {
        setShowAlert({
          ...showAlert,
          isOpen: true,
          type: "danger",
          message: error.message,
        });
        setTimeout(() => {
          setShowAlert({ isOpen: false, type: "", message: "" });
        }, 3000);
      });
  };
  return (
    <>
      {showAlert.isOpen && (
        <Alerts
          props={{
            isOpen: showAlert.isOpen,
            type: showAlert.type,
            message: showAlert.message,
          }}
        />
      )}
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
              show={openDeleteModal}
              toggle={openModal}
              title="Delete"
              submitButtonTitle="Yes"
              cancelButtonTitle="No"
              submitButtonClick={() => deleteLifeGroup()}
              cancelButtonClick={openModal}
            >
              <p className="text-center">
                Are you sure to delete the LifeGroup?
              </p>
            </ComponentModal>
          ) : null}
        </div>
        <ComponentCard title={`Life Group - ${selectedLifeGroupData?.place}`}>
          <FormGroup>
            <Label for="leaders" className="form-label text-dark fw-bold">
              Leaders
            </Label>
            <Input
              type="text"
              className="form-control p-2 modal-body-input shadow-none"
              id="leaders"
              placeholder="Anzi & Vegin"
              value={selectedLifeGroupData?.leaders}
              onChange={handleLifeGroupLeadersChange}
            />
          </FormGroup>
          <FormGroup>
            <Label
              for="meetingDays"
              className="form-label text-dark fw-bold"
            >
              Meeting Days
            </Label>
            <Input
              type="text"
              className="form-control p-2 modal-body-input shadow-none"
              id="meetingDays"
              placeholder="Alternate Thursdays"
              value={selectedLifeGroupData?.meetingDay}
              onChange={handleLifeGroupMeetingDayChange}
            />
          </FormGroup>
          {selectedLifeGroupData?.members.length === 0 ? null : (
            <div>
              <Label
                for="membersTable"
                className="form-label text-dark fw-bold"
              >
                Members
              </Label>
              <NestedTable
                tableData={selectedLifeGroupData?.members}
                fromLifeGroupDetailsPage={true}
                parentCallback={removeMember}
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
          <Button
            className="btn px-4 py-2 buttons"
            color="primary"
            onClick={() => updateLifeGroup()}
          >
            Update
          </Button>
        </div>
        {openResetModal ? (
          <ComponentModal
            show={openResetModal}
            toggle={openresetModal}
            title="Reset"
            submitButtonTitle="Yes"
            cancelButtonTitle="No"
            submitButtonClick={() => resetLifeGroup()}
            cancelButtonClick={openresetModal}
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
