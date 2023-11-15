import React, { useContext, useRef, useEffect, useState } from "react";
import { GuestContext } from "../GuestDataContext";
import "react-phone-number-input/style.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { errorMsgs } from "../../../../constants";

const Contact = ({ stepperCallback }) => {
  const { guestData, setGuestDetails } = useContext(GuestContext);
  const formattedDOBDate = useRef("");
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const error = useRef(false);
  const [phoneNumberWithCode, setPhoneNumberWithCode] = useState("");
  const [emailId, setEmailId] = useState("");
  const [emailError, setEmailError] = useState(false);

  const handleFieldChange = (event) => {
    if (event.target.name === "email") {
      setEmailId(event.target.value);
      if (event.target.value.match(/^[a-z0-9_]+@[a-z]+\.[a-z]{2,3}$/)) {
        setEmailError(false);
      } else {
        setEmailError(true);
      }
    } else if (event.target.name === "dob") {
      formattedDOBDate.current = event.target.value
        .split("/")
        .reverse()
        .join("-");
      setGuestDetails(event.target.name, formattedDOBDate.current);
    }
  };

  useEffect(() => {
    if (phoneNumber !== "" && phoneNumber.length > 0) {
      setPhoneNumber(phoneNumber);
      setGuestDetails("contactnumber", phoneNumber);
      stepperCallback(error.current);
      console.log("contactnumber", phoneNumber);
    }
  }, [phoneNumber]);

  const handlePhNoChange = (phonenumber) => {
    if (phonenumber !== undefined && phonenumber.length > 0) {
      let phno = phonenumber.replace(/ /g, "");
      if (isValidPhoneNumber(phno)) {
        error.current = false;
        setGuestDetails("contactnumber", phoneNumber);
      } else {
        error.current = true;
      }
      setPhoneNumber(phno);
    }
    console.log("handlePhNoChange", phoneNumber, error.current);
  };

  useEffect(() => {
    if (emailId !== "") {
      setEmailId(emailId);
      setGuestDetails("email", emailId);
    }
  }, [emailId]);

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
          <div className="form-control modal-body-input">
            <PhoneInput
              international
              countryCallingCodeEditable={false}
              defaultCountry="IN"
              id="contactnumber"
              name="contactnumber"
              value={phoneNumber}
              onChange={handlePhNoChange}
            />
          </div>
          {phoneNumber.length > 0 && error.current && (
            <small className="text-danger">
              {errorMsgs.phoneNumber.invalid}
            </small>
          )}
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
            className="form-control shadow-none contactEmail"
            id="email"
            name="email"
            placeholder="Enter a valid email"
            value={emailId}
          />
          {emailId.length > 0 && emailError && (
            <small className="text-danger">{errorMsgs.email.invalid}</small>
          )}
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
            className="form-control modal-body-input shadow-none DOBDate"
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
