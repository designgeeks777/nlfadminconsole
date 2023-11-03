import React, { useContext, useEffect, useRef, useState } from "react";
import InfoCard from "../../../components/InfoCard";
import { Col, Row, Table } from "reactstrap";
import { BASEURL } from "../../../APIKey";
import axios from "axios";
import { LoaderContext } from "../../../LoaderContext";
import ComponentModal from "../../../components/ComponentModal";
import { errorMsgs, successMsgs } from "../../../constants";

const ViewDetails = ({ guestData, handleTabsCallback }) => {
  const id = "65433e146392cbd2128dba31";
  const guestUrl = `${BASEURL}guests/${id}`;
  const [lifeGroupPlace, setLifeGroupPlace] = useState("");
  const lifeGroupByIdUrl = `${BASEURL}lifeGroups/${guestData.lifegroupid}`;
  const lifeGroupsUrl = `${BASEURL}lifeGroups/`;
  const [showAlert, setShowAlert] = useState({
    isOpen: false,
    type: "",
    message: "",
  });
  const { isLoading, setIsLoading } = useContext(LoaderContext);
  const [lifeGroupOptions, setLifeGroupOptions] = useState([]);
  const formattedEnteredOnDate = useRef("");
  const formattedDOBDate = useRef("");
  //get all lifeGroup places list
  const getLifeGroupOptions = async () => {
    const LGResponse = await axios.get(lifeGroupsUrl);
    let options = LGResponse.data.map((lifeGroup) => {
      const { place, _id } = lifeGroup;
      return { place: place, lifegroupid: _id };
    });
    setLifeGroupOptions(options);
  };
  const formatDate = () => {
    formattedEnteredOnDate.current = new Date(guestData.enteredon)
      .toLocaleDateString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .split("/")
      .reverse()
      .join("-");
    if (guestData.dob) {
      formattedDOBDate.current = guestData.dob.split("/").reverse().join("-");
    }
  };
  const checked = useRef(false);
  const fetchLifeGroupName = async () => {
    const response = await axios.get(lifeGroupByIdUrl);
    var place = response.data.place;
    setLifeGroupPlace(place);
  };
  useEffect(() => {
    getLifeGroupOptions();
    if (guestData.lifegroupid) {
      fetchLifeGroupName();
    }
    // if (lifeGroupOptions.length > 0) {
    //   let lifeGroupplace = lifeGroupOptions.filter(
    //     (selectedLifeGroupPlace) =>
    //       selectedLifeGroupPlace.lifegroupid === guestData.lifegroupid
    //   );
    //   if (lifeGroupplace) {
    //     setLifeGroupPlace(lifeGroupplace[0].place);
    //     // console.log(lifeGroupplace[0].place);
    //   }
    // }

    // Format the date to YYYY-MM-DD
    formatDate();
    if (guestData.startedlifegroup === "started") {
      checked.current = true;
    } else {
      checked.current = false;
    }
    // console.log(startedlifegroup);
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
    resetModalData();
  };
  const editCardInfo = () => {
    console.log("editCardInfo", selectedGuestData);
    axios
      .patch(guestUrl, selectedGuestData)
      .then((res) => {
        setSelectedGuestData(res.data);
        // resetModalData();
        setShow(false);
        setShowAlert({
          ...showAlert,
          isOpen: true,
          type: "success",
          message: `${modalTitle} ${successMsgs.update}`,
        });
        handleTabsCallback(true, showAlert);
      })
      .catch((err) => {
        resetModalData();
        setShowAlert({
          ...showAlert,
          isOpen: true,
          type: "danger",
          message: errorMsgs.update,
        });
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
    console.log("in useeffect", updatedValue, selectedGuestData.inputType);
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

  //below code for checbox
  let val = "";
  useEffect(() => {
    if (val !== selectedGuestData.startedlifegroup) {
      if (checked.current) {
        setSelectedGuestData({
          ...selectedGuestData,
          startedlifegroup: "started",
        });
      }
    }
    // console.log("effect", checked.current, selectedGuestData.startedlifegroup);
  }, [val, checked.current]);
  const handleChange = (e) => {
    checked.current = e.target.checked;
    setSelectedGuestData({
      ...selectedGuestData,
      startedlifegroup: checked.current ? "started" : "",
    });
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
                <p className="ps-2">{guestData.hearaboutus}</p>
                <p>
                  {guestData.hearaboutus === "personalInvitation"
                    ? "Invited By"
                    : guestData.hearaboutus === "others"
                    ? "Other Source"
                    : null}
                </p>
                <p>
                  {guestData.hearaboutus === "personalInvitation"
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
              {/* <p>No Email Id</p> */}
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
          submitButtonTitle="Edit"
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
                type="text"
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
                      value="divorced/widowed"
                      checked={
                        selectedGuestData.maritalstatus === "divorced/widowed"
                          ? true
                          : false
                      }
                    />
                    <label class="form-check-label" htmlFor="inlineRadio3">
                      Divorced/Widowed
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
                      value="personalInvitation"
                      checked={
                        selectedGuestData.hearaboutus === "personalInvitation"
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
                      value="socialMedia"
                      checked={
                        selectedGuestData.hearaboutus === "socialMedia"
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
                {(selectedGuestData.hearaboutus === "personalInvitation" ||
                  selectedGuestData.hearaboutus === "others") && (
                  <>
                    <label
                      htmlFor={
                        selectedGuestData.hearaboutus === "personalInvitation"
                          ? "invitedby"
                          : "hearaboutusothers"
                      }
                      size="md"
                      className="form-label modal-body-label"
                    >
                      {selectedGuestData.hearaboutus === "personalInvitation"
                        ? "Invited By"
                        : "Let us know how you came to know about us"}
                    </label>
                    <input
                      type="text"
                      className="form-control modal-body-input shadow-none mb-2"
                      id={
                        selectedGuestData.hearaboutus === "personalInvitation"
                          ? "invitedby"
                          : "hearaboutusothers"
                      }
                      name={
                        selectedGuestData.hearaboutus === "personalInvitation"
                          ? "invitedby"
                          : "hearaboutusothers"
                      }
                      placeholder=""
                      value={
                        selectedGuestData.hearaboutus === "personalInvitation"
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
          {modalTitle === "LifeGroup Details" && (
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
                Willingness to join
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
          checked={checked.current}
          onChange={handleChange}
          value="test"
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
    </div>
  );
};
export default ViewDetails;
