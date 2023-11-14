import React, { useContext, useRef, useEffect, useState } from "react";
import { GuestContext } from "../GuestDataContext";
import { FormFeedback, FormGroup, Input, Label } from "reactstrap";
const Contact = () => {
  const { guestData, setGuestDetails } = useContext(GuestContext);
  const formattedDOBDate = useRef("");

  const handleFieldChange = (event) => {
    if (event.target.name === "email") {
      validateEmail(event.target.value);
    }
    if (event.target.name === "dob") {
      formattedDOBDate.current = event.target.value
        .split("/")
        .reverse()
        .join("-");
      setGuestDetails(event.target.name, formattedDOBDate.current);
    } else {
      console.log(event.target.value);
      setGuestDetails(event.target.name, event.target.value);
    }
  };

  // Email Validation
  const [emailError, setEmailError] = useState(false);
  useEffect(() => {
    if (guestData.email === "") {
      setEmailError(false);
    }
  }, []);
  const validateEmail = (mail) => {
    // var email = e.target.value;
    console.log(mail);
    if (mail.match(/^[a-z0-9_]+@[a-z]+\.[a-z]{2,3}$/)) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  };

  return (
    <form onChange={handleFieldChange}>
      <div className="basicDetails">
        <div>
          <label
            htmlFor="contactnumber"
            size="md"
            className="form-label modal-body-label"
          >
            Contact Number
            <label htmlFor="contactnumber" className="text-danger">
              *
            </label>
          </label>
          <input
            type="text"
            // pattern={[^\+[1-9]{1}[0-9]{3,14}$]}
            className="form-control modal-body-input shadow-none mb-2"
            id="contactnumber"
            name="contactnumber"
            placeholder="Enter number with country code"
            value={guestData.contactnumber}
          />
        </div>
        <div>
          <label
            htmlFor="email"
            size="md"
            className="form-label modal-body-label"
          >
            Email Id
          </label>
          <input
            type="email"
            className="form-control modal-body-input shadow-none mb-0"
            id="email"
            name="email"
            placeholder="Enter a valid email"
            value={guestData.email}
            invalid={emailError}
          />
          {emailError && <small className="mb-2 text-danger">Please enter valid email</small>}
        </div>
        <div>
          <label
            htmlFor="dob"
            size="md"
            className="form-label modal-body-label"
          >
            DOB
            <label htmlFor="dob" className="text-danger">
              *
            </label>
          </label>
          <input
            type="date"
            className="form-control modal-body-input shadow-none mb-2"
            id="dob"
            name="dob"
            placeholder=""
            value={formattedDOBDate.current}
          />
        </div>
      </div>
    </form>
  );
};
export default Contact;
