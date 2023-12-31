import React, { useContext, useEffect } from "react";
import { GuestContext } from "../GuestDataContext";

const AssignLifeGroup = () => {
  const { guestData, setGuestDetails, lifeGroupOptions } =
    useContext(GuestContext);
  const willingnessOptions = [
    { label: "Select willingness", value: "" },
    { label: "Hot", value: "hot" },
    { label: "Warm", value: "warm" },
    { label: "Cold", value: "cold" },
  ];
  
  const handleFieldChange = (event) => {
    setGuestDetails(event.target.name, event.target.value);
  };

  return (
    <form onChange={handleFieldChange}>
      <div className="basicDetails">
        <div>
          <label
            htmlFor="willingnesstojoin"
            size="md"
            className="form-label modal-body-label"
          >
            Willing to be part of church/LifeGroup?
            <label htmlFor="willingnesstojoin" className="text-danger">
              *
            </label>
          </label>
          <select
            id="willingnesstojoin"
            name="willingnesstojoin"
            className="form-select shadow-none assignLGSelect"
            value={guestData.willingnesstojoin}
          >
            {willingnessOptions.map((option) => (
              <option append-to="body" key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <small className="modal-body-label">
            Select how willing is the member to be part of the church
          </small>
        </div>
        <div>
          <label
            htmlFor="lifegroupid"
            size="md"
            className="form-label modal-body-label"
          >
            Assign Life Group
          </label>
          <select
            id="lifegroupid"
            name="lifegroupid"
            className="form-select shadow-none assignLGSelect"
            value={guestData.lifegroupid}
          >
            {lifeGroupOptions.map((option) => (
              <option
                append-to="body"
                key={option.lifegroupid}
                value={option.lifegroupid}
              >
                {option.place}
              </option>
            ))}
          </select>
          <small className="modal-body-label">
            You can assign LifeGroup later also!
          </small>
        </div>
        <div>
          <label
            htmlFor="followupmember"
            size="md"
            className="form-label modal-body-label"
          >
            Assign a follow-up member
          </label>
          <input
            type="text"
            className="form-control modal-body-input shadow-none followupMember"
            id="followupmember"
            name="followupmember"
            placeholder="Type member name"
            value={guestData.followupmember}
          />
          <small className="modal-body-label">
            You can assign member later also!
          </small>
        </div>
      </div>
    </form>
  );
};
export default AssignLifeGroup;
