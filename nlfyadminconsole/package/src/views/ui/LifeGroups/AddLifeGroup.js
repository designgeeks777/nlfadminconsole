import { Button, FormGroup, Input, Label } from "reactstrap";
import { useState } from "react";
import ComponentCard from "../../../components/ComponentCard";
import { BASEURL } from "../../../APIKey";
import axios from "axios";
import Alerts from "../Alerts";
import { useNavigate } from "react-router-dom";
import { errorMsgs, successMsgs } from "../../../constants";

const AddLifeGroup = () => {
  console.log("ALG");
  let navigate = useNavigate();
  const url = `${BASEURL}lifeGroups/`;
  const [showAlert, setShowAlert] = useState({
    isOpen: false,
    type: "",
    message: "",
  });
  const [newLifeGroupData, setNewLifeGroupData] = useState({
    place: "",
    leaders: "",
    meetingDay: "",
  });

  const addLifeGroup = () => {
    console.log("added", newLifeGroupData);
    axios
      .post(url, newLifeGroupData)
      .then(() => {
        setNewLifeGroupData({ place: "", leaders: "", meetingDay: "" });
        setShowAlert({
          ...showAlert,
          isOpen: true,
          type: "success",
          message: `Life Group ${successMsgs.add}`,
        });
        setTimeout(() => {
          setShowAlert({ isOpen: false, type: "", message: "" });
        }, 2000);
      })
      .catch((error) => {
        setShowAlert({
          ...showAlert,
          isOpen: true,
          type: "danger",
          message: errorMsgs.add,
        });
        setTimeout(() => {
          setShowAlert({ isOpen: false, type: "", message: "" });
        }, 2000);
      });
  };

  const handlePlaceChange = (event) => {
    setNewLifeGroupData({
      ...newLifeGroupData,
      place: event.target.value,
    });
  };

  const handleLifeGroupLeadersChange = (event) => {
    setNewLifeGroupData({ ...newLifeGroupData, leaders: event.target.value });
  };

  const handleLifeGroupMeetingDayChange = (event) => {
    setNewLifeGroupData({
      ...newLifeGroupData,
      meetingDay: event.target.value,
    });
  };

  return (
    <>
      <div className="d-flex flex-column">
        {showAlert.isOpen && (
          <Alerts
            props={{
              isOpen: showAlert.isOpen,
              type: showAlert.type,
              message: showAlert.message,
            }}
          />
        )}
        <ComponentCard title="Add New Life Group">
          <FormGroup>
            <Label for="place" className="form-label text-dark fw-bold">
              Life Group Name
            </Label>
            <Input
              type="text"
              className="form-control p-2 modal-body-input shadow-none"
              id="place"
              placeholder="Amruthahalli"
              value={newLifeGroupData.place}
              onChange={handlePlaceChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="leaders" className="form-label text-dark fw-bold">
              Leaders
            </Label>
            <Input
              type="text"
              className="form-control p-2 modal-body-input shadow-none"
              id="leaders"
              placeholder="Anzi & Vegin"
              value={newLifeGroupData.leaders}
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
              placeholder="Alternate Thursdays"
              value={newLifeGroupData.meetingDay}
              onChange={handleLifeGroupMeetingDayChange}
            />
          </FormGroup>
        </ComponentCard>
        <div className="button-group align-self-end">
          <Button
            className="btn px-4 py-2 mx-3 buttons"
            color="primary"
            onClick={() => {
              addLifeGroup();
            }}
            disabled={
              newLifeGroupData.place === "" ||
              newLifeGroupData.leaders === "" ||
              newLifeGroupData.meetingDay === ""
            }
          >
            Add
          </Button>
        </div>
      </div>
    </>
  );
};

export default AddLifeGroup;
