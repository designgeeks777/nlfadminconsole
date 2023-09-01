import { Button } from "reactstrap";
import { useState } from "react";
import ComponentCard from "../../../components/ComponentCard";
import { BASEURL } from "../../../APIKey";
import axios from "axios";
import Alerts from "../Alerts";
import { useNavigate } from "react-router-dom";

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
          message: "Added Life Group successfully",
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
          <div className="mb-4">
            <label htmlFor="place" className="form-label text-dark fw-bold">
              Life Group Name
            </label>
            <input
              type="text"
              className="form-control p-2 modal-body-input shadow-none"
              id="place"
              placeholder="Amruthahalli"
              value={newLifeGroupData.place}
              onChange={handlePlaceChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="leaders" className="form-label text-dark fw-bold">
              Leaders
            </label>
            <input
              type="text"
              className="form-control p-2 modal-body-input shadow-none"
              id="leaders"
              placeholder="Anzi & Vegin"
              value={newLifeGroupData.leaders}
              onChange={handleLifeGroupLeadersChange}
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
              value={newLifeGroupData.meetingDay}
              onChange={handleLifeGroupMeetingDayChange}
            />
          </div>
        </ComponentCard>
        <div className="button-group align-self-end">
          <Button
            className="btn px-4 py-2 mx-3 buttons"
            color="primary"
            onClick={() => {
              addLifeGroup();
            }}
          >
            Add
          </Button>
        </div>
      </div>
    </>
  );
};

export default AddLifeGroup;
