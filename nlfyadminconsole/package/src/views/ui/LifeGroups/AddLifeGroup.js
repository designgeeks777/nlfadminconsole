import { Button } from "reactstrap";
import { useState } from "react";
import ComponentCard from "../../../components/ComponentCard";

const AddLifeGroup = () => {
  console.log("ALG");

  const [newLifeGroupData, setNewLifeGroupData] = useState({
    lifeGroupName: "",
    leaders: "",
    meetingDay: "",
  });

  const addLifeGroup = () => {
    console.log("added", newLifeGroupData);
  };

  const handleLifeGroupNameChange = (event) => {
    setNewLifeGroupData({
      ...newLifeGroupData,
      lifeGroupName: event.target.value,
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
        <ComponentCard title="Add New Life Group">
          <div className="mb-4">
            <label
              htmlFor="lifeGroupName"
              className="form-label text-dark fw-bold"
            >
              Life Group Name
            </label>
            <input
              type="text"
              className="form-control p-2 modal-body-input shadow-none"
              id="lifeGroupName"
              placeholder="Amruthahalli"
              value={newLifeGroupData.lifeGroupName}
              onChange={handleLifeGroupNameChange}
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
