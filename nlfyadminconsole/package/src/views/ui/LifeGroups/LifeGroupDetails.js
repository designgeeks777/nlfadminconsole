import { Button, FormGroup, Input, Label } from "reactstrap";
import { useContext, useEffect, useState } from "react";
import ComponentCard from "../../../components/ComponentCard";
import ComponentModal from "../../../components/ComponentModal";
import PropTypes from "prop-types";
import Alerts from "../Alerts";
import NestedTable from "../../../components/NestedTable";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASEURL } from "../../../APIKey";
import { errorMsgs, successMsgs } from "../../../constants";
import { LoaderContext } from "../../../LoaderContext";

const LifeGroupDetails = () => {
  const { state } = useLocation();
  const selectedLifeGroupUrl = `${BASEURL}lifeGroups/${state}`;
  const { isLoading, setIsLoading } = useContext(LoaderContext);
  // selectedLifeGroupData = state.selectedLifeGroupData;
  const [selectedLifeGroupData, setSelectedLifeGroupData] = useState({
    place: "",
    leaders: "",
    meetingDay: "",
    members: "",
    _id: "",
  });
  const [resetLifeGroupData, setResetLifeGroupData] = useState({
    place: "",
    leaders: "",
    meetingDay: "",
    members: "",
    _id: "",
  });
  const loadData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(selectedLifeGroupUrl);
      var data = [];
      data = response.data;
      setSelectedLifeGroupData(data);
      setResetLifeGroupData(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [selectedLifeGroupUrl]);

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
          message: `Life Group ${successMsgs.deleted}`,
        });
        setOpenDeleteModal(false);
        setTimeout(() => {
          setShowAlert({ isOpen: false, type: "", message: "" });
          navigate("/lifeGroups");
        }, 2000);
      })
      .catch((error) => {
        setShowAlert({
          ...showAlert,
          isOpen: true,
          type: "danger",
          message: errorMsgs.deleted,
        });
        setOpenDeleteModal(false);
        setTimeout(() => {
          setShowAlert({ isOpen: false, type: "", message: "" });
        }, 2000);
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
          message: `Life Group ${successMsgs.update}`,
        });
        setTimeout(() => {
          setShowAlert({ isOpen: false, type: "", message: "" });
          // navigate("/lifeGroups");
        }, 2000);
      })
      .catch((error) => {
        setShowAlert({
          ...showAlert,
          isOpen: true,
          type: "danger",
          message: errorMsgs.update,
        });
        setTimeout(() => {
          setShowAlert({ isOpen: false, type: "", message: "" });
        }, 2000);
      });
  };

  const resetLifeGroup = () => {
    setOpenResetModal(false);
    setSelectedLifeGroupData({
      ...selectedLifeGroupData,
      place: resetLifeGroupData.place,
      leaders: resetLifeGroupData.leaders,
      meetingDay: resetLifeGroupData.meetingDay,
      members: resetLifeGroupData.members,
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
          message: successMsgs.removeLGMember,
        });
        setTimeout(() => {
          setShowAlert({ isOpen: false, type: "", message: "" });
          // navigate("/lifeGroups");
        }, 2000);
      })
      .catch((error) => {
        setShowAlert({
          ...showAlert,
          isOpen: true,
          type: "danger",
          message: errorMsgs.removeLGMember,
        });
        setTimeout(() => {
          setShowAlert({ isOpen: false, type: "", message: "" });
        }, 2000);
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
              name="leaders"
              placeholder="Anzi & Vegin"
              value={selectedLifeGroupData?.leaders}
              onChange={handleLifeGroupLeadersChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="meetingDays" className="form-label text-dark fw-bold">
              Meeting Days
            </Label>
            <Input
              type="text"
              className="form-control p-2 modal-body-input shadow-none"
              id="meetingDays"
              name="meetingDays"
              placeholder="Alternate Thursdays"
              value={selectedLifeGroupData?.meetingDay}
              onChange={handleLifeGroupMeetingDayChange}
            />
          </FormGroup>
          {selectedLifeGroupData?.members.length === 0 ? null : (
            <div>
              <div className="form-label text-dark fw-bold">Members</div>
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
            disabled={
              selectedLifeGroupData?.leaders === "" ||
              selectedLifeGroupData?.meetingDay === ""
            }
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
