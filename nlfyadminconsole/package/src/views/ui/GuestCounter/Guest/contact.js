import React, { useContext, useRef, useEffect, useState } from "react";
import { GuestContext } from "../GuestDataContext";

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
    } else {
      if (event.target.name === "countrycode") {
        var code = event.target.value.replace(
          /[a-zA-Z!@#\\$%\\^\\&*\\)\\(=._-]*/g,
          ""
        );
        setCountryCode(code);
        if (code.match(/^(\+?\d{1,3}|\d{1,4})$/gm)) {
          error.current = false;
        } else {
          // setCountryCode("");
          error.current = true;
        }
      }
      if (event.target.name === "contactnumber") {
        // if (event.target.value.match(/^[0-9]+$/)) {
        setPhoneNumber(event.target.value);
        if (event.target.value.match(/^[0-9]{1,10}$/)) {
          error.current = false;
        } else {
          error.current = true;
        }
      }
    }
  };
  useEffect(() => {
    if (countryCode !== "") {
      setCountryCode(countryCode);
    }
  }, [countryCode]);
  useEffect(() => {
    if (phoneNumber !== "") {
      setPhoneNumber(phoneNumber);
    }
  }, [phoneNumber]);
  useEffect(() => {
    setPhoneNumberWithCode(countryCode + phoneNumber);
    stepperCallback(error.current);
    setGuestDetails("contactnumber", phoneNumberWithCode);
  }, [countryCode, phoneNumber]);

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
          <div className="d-flex mb-2">
            <input
              type="text"
              className={`${
                error.current ? "contactError" : undefined
              } form-control shadow-none contactNoCountryCode`}
              id="countrycode"
              name="countrycode"
              placeholder="+91"
              value={countryCode}
            />
            <input
              type="number"
              className={`${
                error.current ? "contactError" : undefined
              } form-control shadow-none contactNo`}
              id="contactnumber"
              name="contactnumber"
              placeholder="Enter number with country code"
              value={phoneNumber}
            />
          </div>
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
            className={`${
              emailError ? "contactError" : undefined
            } form-control shadow-none mb-0 contactEmail`}
            id="email"
            name="email"
            placeholder="Enter a valid email"
            value={emailId}
          />
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
