import React, { useContext, useEffect, useRef, useState } from "react";
import InfoCard from "../../../../components/InfoCard";
import { Col, Row } from "reactstrap";
import { BASEURL } from "../../../../APIKey";
import axios from "axios";
import { LoaderContext } from "../../../../LoaderContext";
import ComponentModal from "../../../../components/ComponentModal";
import { errorMsgs, successMsgs } from "../../../../constants";
import { GuestContext } from "../GuestDataContext";

const ViewDetails = ({
  guestData,
  handleTabsCallback,
  lifeGroupOptions,
  lifeGroupPlace,
}) => {
  const guestUrl = `${BASEURL}guests/${guestData._id}`;
  const { isLoading, setIsLoading } = useContext(LoaderContext);
  const formattedEnteredOnDate = useRef("");
  const formattedDOBDate = useRef("");
  // const checked = useRef(false);
  const { assignNow, setAssignNow } = useContext(GuestContext);
  // const [isChecked, setIsChecked] = useState(false);
  const isChecked = useRef(false);
  const [startedComingCheckedModal, setStartedComingCheckedModal] =
    useState(false);
  const [notComingCheckedModal, setNotComingCheckedModal] = useState(false);

  const formatDate = () => {
    formattedEnteredOnDate.current = guestData.enteredon
      .split("/")
      .reverse()
      .join("-");
    if (guestData.dob) {
      formattedDOBDate.current = guestData.dob.split("/").reverse().join("-");
    }
  };

  useEffect(() => {
    if (assignNow) {
      showModal("LifeGroup Details");
    }
    // console.log(assignNow);
  }, [assignNow]);
  useEffect(() => {
    // Format the date to YYYY-MM-DD
    formatDate();
    if (guestData.startedlifegroup === "started") {
      isChecked.current.checked = true;
    } else {
      isChecked.current.checked = false;
    }
  }, [guestData]);

  const [show, setShow] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [selectedGuestData, setSelectedGuestData] = useState({
    firstname: guestData.firstname,
    lastname: guestData.lastname,
    address: guestData.address,
    contactnumber: guestData.contactnumber,
    email: guestData.email,
    dob: guestData.dob,
    enteredon: guestData.enteredon,
    gender: guestData.gender,
    maritalstatus: guestData.maritalstatus,
    hearaboutus: guestData.hearaboutus,
    invitedby: guestData.invitedby,
    hearaboutusothers: guestData.hearaboutusothers,
    willingnesstojoin: guestData.willingnesstojoin,
    lifegroupid: guestData.lifegroupid,
    followupmember: guestData.followupmember,
    followupnotes: guestData.followupnotes,
    startedlifegroup: guestData.startedlifegroup,
    lifegroupassigndate: guestData.lifegroupassigndate,
    followupmemberassigneddate: guestData.followupmemberassigneddate,
  });

  const showModal = (value) => {
    setShow(true);
    setModalTitle(value);
  };
  const resetModalData = () => {
    formatDate();
    setSelectedGuestData({
      firstname: guestData.firstname,
      lastname: guestData.lastname,
      address: guestData.address,
      contactnumber: guestData.contactnumber,
      email: guestData.email,
      dob: guestData.dob,
      enteredon: guestData.enteredon,
      gender: guestData.gender,
      maritalstatus: guestData.maritalstatus,
      hearaboutus: guestData.hearaboutus,
      invitedby: guestData.invitedby,
      hearaboutusothers: guestData.hearaboutusothers,
      willingnesstojoin: guestData.willingnesstojoin,
      lifegroupid: guestData.lifegroupid,
      followupmember: guestData.followupmember,
      followupnotes: guestData.followupnotes,
      startedlifegroup: guestData.startedlifegroup,
      lifegroupassigndate: guestData.lifegroupassigndate,
      followupmemberassigneddate: guestData.followupmemberassigneddate,
    });
  };
  const toggle = () => {
    setShow(!show);
    setAssignNow(false);
    resetModalData();
  };
  const editCardInfo = () => {
    // setIsLoading(true);
    let showAlert = {};
    if (selectedGuestData.lifegroupid !== "") {
      selectedGuestData.lifegroupassigndate = new Date().toLocaleDateString(
        "en-GB"
      );
    }
    if (selectedGuestData.followupmember !== "") {
      selectedGuestData.followupmemberassigneddate =
        new Date().toLocaleDateString("en-GB");
    }
    if (selectedGuestData.startedlifegroup !== "") {
      selectedGuestData.startedlifegroupdate = new Date().toLocaleDateString(
        "en-GB"
      );
    } else {
      selectedGuestData.startedlifegroupdate = "";
    }
    Object.keys(selectedGuestData).forEach(
      (k) =>
        (selectedGuestData[k] =
          typeof selectedGuestData[k] == "string"
            ? selectedGuestData[k].trim()
            : selectedGuestData[k])
    );

    // console.log("editCardInfo", modalTitle, selectedGuestData);
    axios
      .patch(guestUrl, selectedGuestData)
      .then((res) => {
        setSelectedGuestData(res.data);
        setIsLoading(false);
        setShow(false);
        setAssignNow(false);
        showAlert = {
          isOpen: true,
          type: "success",
          message: modalTitle + " " + successMsgs.update,
        };
        handleTabsCallback(true, showAlert);
      })
      .catch((err) => {
        resetModalData();
        showAlert = {
          isOpen: true,
          type: "danger",
          message: errorMsgs.update,
        };
        setIsLoading(false);
        handleTabsCallback(false, showAlert);
        // console.error("POST Error:", err, showAlert);
      });
  };

  let updatedValue = "";
  var inputType = "";
  useEffect(() => {
    if (updatedValue !== selectedGuestData[inputType]) {
      setSelectedGuestData({
        ...selectedGuestData,
        inputType: updatedValue,
      });
    }
    // console.log("in useeffect", updatedValue, selectedGuestData.inputType);
  }, [updatedValue, inputType]);

  const handleFieldChange = (event) => {
    inputType = event.target.name;
    if (inputType === "enteredon") {
      setSelectedGuestData({
        ...selectedGuestData,
        enteredon: new Date(formattedEnteredOnDate.current).toLocaleDateString(
          "en-GB"
        ),
      });
    } else if (inputType === "dob") {
      setSelectedGuestData({
        ...selectedGuestData,
        dob: new Date(formattedDOBDate.current).toLocaleDateString("en-GB"),
      });
    } else {
      setSelectedGuestData({
        ...selectedGuestData,
        [event.target.name]: event.target.value,
      });
    }
  };
  const willingnessOptions = [
    { label: "Hot", value: "hot" },
    { label: "Warm", value: "warm" },
    { label: "Cold", value: "cold" },
  ];
  const handleEnteredOnDateChange = (event) => {
    formattedEnteredOnDate.current = event.target.value;
  };
  const handleDOBDateChange = (event) => {
    formattedDOBDate.current = event.target.value;
  };

  //below code for checkbox
  const handleChange = (event) => {
    isChecked.current.checked = event.target.checked;
    if (isChecked.current.checked) {
      setStartedComingCheckedModal(true);
      setSelectedGuestData({
        ...selectedGuestData,
        startedlifegroup: "started",
      });
    } else {
      setSelectedGuestData({
        ...selectedGuestData,
        startedlifegroup: "",
      });
      setNotComingCheckedModal(true);
    }
  };
  const toggleStartedComingCheckboxModal = () => {
    isChecked.current.checked = false;
    setSelectedGuestData({
      ...selectedGuestData,
      startedlifegroup: "",
    });
    setStartedComingCheckedModal(false);
  };
  const toggleNotComingCheckboxModal = () => {
    setNotComingCheckedModal(false);
  };
  const updateStartedComingCheckbox = () => {
    setSelectedGuestData({
      ...selectedGuestData,
      startedlifegroup: "started",
    });
    editCardInfo();
    setStartedComingCheckedModal(false);
  };
  const updateNotComingCheckbox = () => {
    setSelectedGuestData({
      ...selectedGuestData,
      startedlifegroup: "",
    });
    editCardInfo();
    setNotComingCheckedModal(false);
  };
  return (
    <div className="m-1 mt-5">
      <Row>
        <Col sm="6" md="6">
          <div className="viewDetails">
            <InfoCard
              openModal={showModal}
              cardLabel="Basic Info"
              editLabel="Edit Info"
            >
              <div>
                <p>First Name</p>
                <p>{guestData.firstname}</p>
              </div>
              <div>
                <p>Last Name</p>
                <p>{guestData.lastname}</p>
              </div>
              <div>
                <p>Address</p>
                <p>{guestData.address}</p>
              </div>
            </InfoCard>
            <InfoCard
              openModal={showModal}
              cardLabel="Other Info"
              editLabel="Edit Info"
            >
              <div>
                <div>
                  <p>Gender</p>
                  <p className="ps-3">{guestData.gender}</p>
                </div>
                <div>
                  <p>Entered On</p>
                  <p>{guestData.enteredon}</p>
                </div>
              </div>
              <div>
                <p>Martial Status</p>
                <p>{guestData.maritalstatus}</p>
              </div>
              <div>
                <p>Source</p>
                <p className="sourceValue">{guestData.hearaboutus}</p>
                <p>
                  {guestData.hearaboutus === "Personal Invitation"
                    ? "Invited By"
                    : guestData.hearaboutus === "others"
                    ? "Other Source"
                    : null}
                </p>
                <p>
                  {guestData.hearaboutus === "Personal Invitation"
                    ? guestData.invitedby
                    : guestData.hearaboutus === "others"
                    ? guestData.hearaboutusothers
                    : null}
                </p>
              </div>
            </InfoCard>
          </div>
        </Col>
        <Col sm="6" md="6">
          <InfoCard
            openModal={showModal}
            cardLabel="Contact Info"
            editLabel="Edit Info"
          >
            <div>
              <p>Contact number</p>
              <p>{guestData.contactnumber}</p>
            </div>
            <div>
              <p>Email Id</p>
              <p style={{ width: "50%", textTransform: "none" }}>
                {guestData.email === "" ? "No email Id" : guestData.email}
              </p>
            </div>
            <div>
              <p>DOB</p>
              <p>{guestData.dob}</p>
            </div>
          </InfoCard>
          <InfoCard
            openModal={showModal}
            cardLabel="LifeGroup Details"
            editLabel="Edit Info"
          >
            <div>
              <p>Willingness to join</p>
              <p>{guestData.willingnesstojoin}</p>
            </div>
            <div>
              <p>LifeGroup</p>
              <p>
                {guestData.lifegroupid === "" ? "Not Assigned" : lifeGroupPlace}
              </p>
            </div>
            <div>
              <p>Follow-up</p>
              <p>
                {guestData.followupmember === ""
                  ? "Not assigned"
                  : guestData.followupmember}
              </p>
            </div>
          </InfoCard>
        </Col>
      </Row>
      {show ? (
        <ComponentModal
          show={show}
          toggle={toggle}
          title={modalTitle}
          submitButtonTitle="Save"
          cancelButtonTitle="Cancel"
          submitButtonClick={() => editCardInfo()}
          cancelButtonClick={toggle}
        >
          {modalTitle === "Basic Info" && (
            <form onChange={handleFieldChange}>
              <label
                htmlFor="firstname"
                size="md"
                className="form-label modal-body-label"
              >
                First Name
              </label>
              <input
                type="text"
                className="form-control modal-body-input shadow-none mb-2"
                id="firstname"
                name="firstname"
                placeholder=""
                value={selectedGuestData.firstname}
              />
              <label
                htmlFor="lastname"
                size="md"
                className="form-label modal-body-label"
              >
                Last Name
              </label>
              <input
                type="text"
                className="form-control modal-body-input shadow-none mb-2"
                id="lastname"
                name="lastname"
                placeholder=""
                value={selectedGuestData.lastname}
              />
              <label htmlFor="address" className="form-label modal-body-label">
                Address
              </label>
              <textarea
                name="address"
                className="form-control modal-body-textarea shadow-none mb-2"
                id="address"
                rows={5}
                value={selectedGuestData.address}
              />
            </form>
          )}
          {modalTitle === "Contact Info" && (
            <form onChange={handleFieldChange}>
              <label
                htmlFor="contactnumber"
                size="md"
                className="form-label modal-body-label"
              >
                Contact Number
              </label>
              <input
                type="text"
                className="form-control modal-body-input shadow-none mb-2"
                id="contactnumber"
                name="contactnumber"
                placeholder=""
                value={selectedGuestData.contactnumber}
              />
              <label
                htmlFor="email"
                size="md"
                className="form-label modal-body-label"
              >
                Email Id
              </label>
              <input
                type="email"
                className="form-control modal-body-input shadow-none mb-2"
                id="email"
                name="email"
                placeholder=""
                value={selectedGuestData.email}
              />
              <label
                htmlFor="dob"
                size="md"
                className="form-label modal-body-label"
              >
                DOB
              </label>
              <input
                type="date"
                className="form-control modal-body-input shadow-none mb-2 w-50"
                id="dob"
                name="dob"
                placeholder=""
                // value={selectedGuestData.dob}
                value={formattedDOBDate.current}
                onChange={handleDOBDateChange}
              />
            </form>
          )}
          {modalTitle === "Other Info" && (
            <form onChange={handleFieldChange}>
              <div className="d-flex flex-column mb-3">
                <label
                  htmlFor="enteredon"
                  size="md"
                  className="form-label modal-body-label"
                >
                  Entered On
                </label>
                <input
                  type="date"
                  className="form-control modal-body-input shadow-none mb-2 w-50"
                  id="enteredon"
                  name="enteredon"
                  placeholder=""
                  value={formattedEnteredOnDate.current}
                  onChange={handleEnteredOnDateChange}
                />
                <label size="md" className="form-label modal-body-label">
                  Select Gender
                </label>
                <div className="d-flex">
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input text-primary shadow-none"
                      type="radio"
                      name="gender"
                      id="inlineRadio1"
                      value="male"
                      checked={
                        selectedGuestData.gender === "male" ? true : false
                      }
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
                      checked={
                        selectedGuestData.gender === "female" ? true : false
                      }
                    />
                    <label class="form-check-label" htmlFor="inlineRadio2">
                      Female
                    </label>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-column mb-3">
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
                      checked={
                        selectedGuestData.maritalstatus === "single"
                          ? true
                          : false
                      }
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
                      checked={
                        selectedGuestData.maritalstatus === "married"
                          ? true
                          : false
                      }
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
                        selectedGuestData.maritalstatus === "divorced/ widowed"
                          ? true
                          : false
                      }
                    />
                    <label class="form-check-label" htmlFor="inlineRadio3">
                      Divorced/ Widowed
                    </label>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-column mb-3">
                <label size="md" className="form-label modal-body-label">
                  How did you hear about us?
                </label>
                <div className="d-flex">
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input text-primary shadow-none"
                      type="radio"
                      name="hearaboutus"
                      id="inlineRadio1hearaboutus"
                      value="website"
                      checked={
                        selectedGuestData.hearaboutus === "website"
                          ? true
                          : false
                      }
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
                        selectedGuestData.hearaboutus === "Personal Invitation"
                          ? true
                          : false
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
                      checked={
                        selectedGuestData.hearaboutus === "Social Media"
                          ? true
                          : false
                      }
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
                      checked={
                        selectedGuestData.hearaboutus === "others"
                          ? true
                          : false
                      }
                    />
                    <label class="form-check-label" htmlFor="inlineRadio2">
                      Others
                    </label>
                  </div>
                </div>
                {(selectedGuestData.hearaboutus === "Personal Invitation" ||
                  selectedGuestData.hearaboutus === "others") && (
                  <>
                    <label
                      htmlFor={
                        selectedGuestData.hearaboutus === "Personal Invitation"
                          ? "invitedby"
                          : "hearaboutusothers"
                      }
                      size="md"
                      className="form-label modal-body-label"
                    >
                      {selectedGuestData.hearaboutus === "Personal Invitation"
                        ? "Invited By"
                        : "Let us know how you came to know about us"}
                    </label>
                    <input
                      type="text"
                      className="form-control modal-body-input shadow-none mb-2"
                      id={
                        selectedGuestData.hearaboutus === "Personal Invitation"
                          ? "invitedby"
                          : "hearaboutusothers"
                      }
                      name={
                        selectedGuestData.hearaboutus === "Personal Invitation"
                          ? "invitedby"
                          : "hearaboutusothers"
                      }
                      placeholder=""
                      value={
                        selectedGuestData.hearaboutus === "Personal Invitation"
                          ? selectedGuestData.invitedby
                          : selectedGuestData.hearaboutus === "others"
                          ? selectedGuestData.hearaboutusothers
                          : ""
                      }
                    />
                  </>
                )}
              </div>
            </form>
          )}
          {(modalTitle === "LifeGroup Details" || assignNow) && (
            <form onChange={handleFieldChange}>
              <label
                htmlFor="followupmember"
                size="md"
                className="form-label modal-body-label"
              >
                Assign a follow-up member
              </label>
              <input
                type="text"
                className="form-control modal-body-input shadow-none mb-3"
                id="followupmember"
                name="followupmember"
                placeholder=""
                value={selectedGuestData.followupmember}
              />
              <label
                htmlFor="willingnesstojoin"
                size="md"
                className="form-label modal-body-label"
              >
                Willing to join church/lifeGroup?
              </label>
              <select
                id="willingnesstojoin"
                name="willingnesstojoin"
                className="form-select shadow-none w-75 mb-3"
                value={selectedGuestData.willingnesstojoin}
              >
                {willingnessOptions.map((option) => (
                  <option
                    append-to="body"
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
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
                className="form-select shadow-none w-75 mb-3"
                value={selectedGuestData.lifegroupid}
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
            </form>
          )}
        </ComponentModal>
      ) : null}
      <div className="form-check">
        <input
          className="form-check-input text-primary shadow-none"
          type="checkbox"
          ref={isChecked}
          // value={isChecked}
          // checked={isChecked}
          onChange={handleChange}
          id="startedlifegroup"
          name="startedlifegroup"
        />
        <label
          htmlFor="startedlifegroup"
          className="p-0 form-check-label fw-bold"
        >
          Started coming to church/lifeGroup regularly?
        </label>
      </div>
      <ComponentModal
        title=""
        show={startedComingCheckedModal}
        toggle={toggleStartedComingCheckboxModal}
        submitButtonTitle="Yes"
        cancelButtonTitle=""
        submitButtonClick={() => updateStartedComingCheckbox()}
      >
        Are you sure <strong>{guestData?.firstname}</strong> is coming to
        church/lifeGroup regularly?
      </ComponentModal>
      <ComponentModal
        title=""
        show={notComingCheckedModal}
        toggle={toggleNotComingCheckboxModal}
        submitButtonTitle="Yes"
        cancelButtonTitle=""
        submitButtonClick={() => updateNotComingCheckbox()}
      >
        Are you sure <strong>{guestData?.firstname}</strong> is not coming to
        church/lifeGroup regularly?
      </ComponentModal>
    </div>
  );
};
export default ViewDetails;
