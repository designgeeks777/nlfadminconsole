import React, { useContext } from "react";
import { GuestContext } from "../GuestDataContext";

const BasicDetails = () => {
  const { guestData, setGuestDetails } = useContext(GuestContext);

  const handleFieldChange = (event) => {
    setGuestDetails(event.target.name, event.target.value);
  };

  return (
    <form onChange={handleFieldChange}>
      <div className="basicDetails">
        <div>
          <label
            htmlFor="firstname"
            size="md"
            className="form-label modal-body-label"
          >
            First Name
            <label htmlFor="firstname" className="text-danger">
              *
            </label>
          </label>
          <input
            type="text"
            className="form-control modal-body-input shadow-none"
            id="firstname"
            name="firstname"
            placeholder="Enter valid first name"
            value={guestData.firstname}
          />
        </div>
        <div>
          <label
            htmlFor="lastname"
            size="md"
            className="form-label modal-body-label"
          >
            Last Name
            <label htmlFor="lastname" className="text-danger">
              *
            </label>
          </label>
          <input
            type="text"
            className="form-control modal-body-input shadow-none"
            id="lastname"
            name="lastname"
            placeholder="Enter valid last name"
            value={guestData.lastname}
          />
        </div>
        <div>
          <label htmlFor="address" className="form-label modal-body-label">
            Address
            <label htmlFor="address" className="text-danger">
              *
            </label>
          </label>
          <textarea
            name="address"
            className="form-control modal-body-textarea shadow-none"
            id="address"
            rows={5}
            placeholder="Enter your address"
            value={guestData.address}
          />
        </div>
      </div>
    </form>
  );
};
export default BasicDetails;
