import React, { useContext, useRef } from "react";
import { GuestContext } from "../GuestDataContext";
import { Col, Row } from "reactstrap";

const OtherDetails = () => {
  const { guestData, setGuestDetails } = useContext(GuestContext);

  const handleFieldChange = (event) => {
    setGuestDetails(event.target.name, event.target.value);
  };

  return (
    <form onChange={handleFieldChange}>
      <div className="basicDetails">
        <div className="d-flex flex-column">
          <label size="md" className="form-label modal-body-label">
            Select Gender
          </label>
          <div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input text-primary shadow-none"
                type="radio"
                name="gender"
                id="inlineRadio1"
                value="male"
                checked={guestData.gender === "male" ? true : false}
              />
              <label class="form-check-label" htmlFor="inlineRadio1">
                Male
              </label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input text-primary shadow-none"
                type="radio"
                name="gender"
                id="inlineRadio2"
                value="female"
                checked={guestData.gender === "female" ? true : false}
              />
              <label class="form-check-label" htmlFor="inlineRadio2">
                Female
              </label>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column">
          <label size="md" className="form-label modal-body-label">
            Select Marital Status
          </label>
          <div className="d-flex">
            <div class="form-check form-check-inline">
              <input
                class="form-check-input text-primary shadow-none"
                type="radio"
                name="maritalstatus"
                id="inlineRadio1maritalstatus"
                value="single"
                checked={guestData.maritalstatus === "single" ? true : false}
              />
              <label class="form-check-label" htmlFor="inlineRadio1">
                Single
              </label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input text-primary shadow-none"
                type="radio"
                name="maritalstatus"
                id="inlineRadio2maritalstatus"
                value="married"
                checked={guestData.maritalstatus === "married" ? true : false}
              />
              <label class="form-check-label" htmlFor="inlineRadio2">
                Married
              </label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input text-primary shadow-none"
                type="radio"
                name="maritalstatus"
                id="inlineRadio3maritalstatus"
                value="divorced/ widowed"
                checked={
                  guestData.maritalstatus === "divorced/ widowed" ? true : false
                }
              />
              <label class="form-check-label" htmlFor="inlineRadio3">
                Divorced/ Widowed
              </label>
            </div>
          </div>
        </div>

        <div className="d-flex flex-column" style={{ flex: 1 }}>
          <label size="md" className="form-label modal-body-label">
            How did you hear about us?
          </label>
          <div className="d-flex mb-2 flex-wrap">
            <div class="form-check form-check-inline">
              <input
                class="form-check-input text-primary shadow-none"
                type="radio"
                name="hearaboutus"
                id="inlineRadio1hearaboutus"
                value="website"
                checked={guestData.hearaboutus === "website" ? true : false}
              />
              <label class="form-check-label" htmlFor="inlineRadio1">
                Website
              </label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input text-primary shadow-none"
                type="radio"
                name="hearaboutus"
                id="inlineRadio2hearaboutus"
                value="Personal Invitation"
                checked={
                  guestData.hearaboutus === "Personal Invitation" ? true : false
                }
              />
              <label class="form-check-label" htmlFor="inlineRadio2">
                Personal Invitation
              </label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input text-primary shadow-none"
                type="radio"
                name="hearaboutus"
                id="inlineRadio3hearaboutus"
                value="Social Media"
                checked={guestData.hearaboutus === "Social Media" ? true : false}
              />
              <label class="form-check-label" htmlFor="inlineRadio1">
                Social Media
              </label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input text-primary shadow-none"
                type="radio"
                name="hearaboutus"
                id="inlineRadio4hearaboutus"
                value="others"
                checked={guestData.hearaboutus === "others" ? true : false}
              />
              <label class="form-check-label" htmlFor="inlineRadio2">
                Others
              </label>
            </div>
          </div>
          {(guestData.hearaboutus === "Personal Invitation" ||
            guestData.hearaboutus === "others") && (
            <>
              <label
                htmlFor={
                  guestData.hearaboutus === "Personal Invitation"
                    ? "invitedby"
                    : "hearaboutusothers"
                }
                size="md"
                className="form-label modal-body-label"
              >
                {guestData.hearaboutus === "Personal Invitation" ? (
                  "Who invited you?"
                ) : (
                  <>
                    Let us know how you came to know about us
                    <label
                      htmlFor={
                        guestData.hearaboutus === "Personal Invitation"
                          ? "invitedby"
                          : "hearaboutusothers"
                      }
                      className="text-danger"
                    >
                      *
                    </label>
                  </>
                )}
              </label>
              <input
                type="text"
                className="form-control modal-body-input shadow-none hearaboutusInput"
                id={
                  guestData.hearaboutus === "Personal Invitation"
                    ? "invitedby"
                    : "hearaboutusothers"
                }
                name={
                  guestData.hearaboutus === "Personal Invitation"
                    ? "invitedby"
                    : "hearaboutusothers"
                }
                placeholder=""
                value={
                  guestData.hearaboutus === "Personal Invitation"
                    ? guestData.invitedby
                    : guestData.hearaboutus === "others"
                    ? guestData.hearaboutusothers
                    : ""
                }
              />
            </>
          )}
        </div>
      </div>
    </form>
  );
};
export default OtherDetails;
