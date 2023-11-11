import React, { useContext, useEffect, useRef, useState } from "react";
import { GuestContext } from "../GuestDataContext";
import { BASEURL } from "../../../../APIKey";
import axios from "axios";

const AssignLifeGroup = () => {
  const { guestData, setGuestDetails } = useContext(GuestContext);
  const formattedEnteredOnDate = useRef("");
  const [lifeGroupOptions, setLifeGroupOptions] = useState([]);
  const lifeGroupsUrl = `${BASEURL}lifeGroups/`;
  const willingnessOptions = [
    { label: "Select willingness", value: "" },
    { label: "Hot", value: "hot" },
    { label: "Warm", value: "warm" },
    { label: "Cold", value: "cold" },
  ];

  //get all lifeGroup places list
  const getLifeGroupOptions = async () => {
    const LGResponse = await axios.get(lifeGroupsUrl);
    let options = [];
    setLifeGroupOptions([{ place: "Select a LifeGroup", lifegroupid: 0 }]);
    options = LGResponse.data.map((lifeGroup) => {
      const { place, _id } = lifeGroup;
      return { place: place, lifegroupid: _id };
    });
    setLifeGroupOptions((prevState) => [...prevState, ...options]);
  };

  useEffect(() => {
    getLifeGroupOptions();
  }, []);

  const handleFieldChange = (event) => {
    formattedEnteredOnDate.current = event.target.value
      .split("/")
      .reverse()
      .join("-");
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
            Willing to be part of Church?
            <label htmlFor="willingnesstojoin" className="text-danger">
              *
            </label>
          </label>
          <select
            id="willingnesstojoin"
            name="willingnesstojoin"
            className="form-select shadow-none mb-1"
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
            className="form-select shadow-none mb-1"
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
            className="form-control modal-body-input shadow-none mb-1"
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
