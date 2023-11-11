import { Button, FormGroup, Input, Label } from "reactstrap";
import { useContext, useEffect, useState } from "react";
import ComponentCard from "../../../components/ComponentCard";
import { BASEURL } from "../../../APIKey";
import axios from "axios";
import Alerts from "../Alerts";
import { useNavigate } from "react-router-dom";
import { errorMsgs, successMsgs } from "../../../constants";
import { LoaderContext } from "../../../LoaderContext";
import CustomStepper from "../../../components/Stepper";
import { GuestContextProvider } from "./GuestDataContext";

const AddGuest = () => {
  let navigate = useNavigate();
  const url = `${BASEURL}guests/`;
  const [showAlert, setShowAlert] = useState({
    isOpen: false,
    type: "",
    message: "",
  });
  const { isLoading, setIsLoading } = useContext(LoaderContext);
  useEffect(() => {
    setIsLoading(false);
  }, []);
  const [newGuestData, setNewGuestData] = useState({
    firstname: "",
    lastname: "",
    address: "",
    contactnumber: "",
    email: "",
    dob: "",
    enteredon: "",
    gender: "",
    maritalstatus: "",
    hearaboutus: "",
    invitedby: "",
    hearaboutusothers: "",
    willingnesstojoin: "",
    lifegroupid: "",
    followupmember: "",
    followupnotes: "",
    startedlifegroup: "",
    lifegroupassigndate: "",
    followupmemberassigneddate: "",
  });
  
  const addGuest = () => {
    console.log("added", newGuestData);
    axios
      .post(url, newGuestData)
      .then(() => {
        setNewGuestData({
          firstname: "",
          lastname: "",
          address: "",
          contactnumber: "",
          email: "",
          dob: "",
          enteredon: "",
          gender: "",
          maritalstatus: "",
          hearaboutus: "",
          invitedby: "",
          hearaboutusothers: "",
          willingnesstojoin: "",
          lifegroupid: "",
          followupmember: "",
          followupnotes: "",
          startedlifegroup: "",
          lifegroupassigndate: "",
          followupmemberassigneddate: "",
        });
        setShowAlert({
          ...showAlert,
          isOpen: true,
          type: "success",
          message: `Guest ${successMsgs.add}`,
        });
        setTimeout(() => {
          setShowAlert({ isOpen: false, type: "", message: "" });
        }, 2000);
      })
      .catch((error) => {
        setShowAlert({
          ...showAlert,
          isOpen: true,
          type: "danger",
          message: errorMsgs.add,
        });
        setTimeout(() => {
          setShowAlert({ isOpen: false, type: "", message: "" });
        }, 2000);
      });
  };

  return (
    <GuestContextProvider>
      <div className="d-flex flex-column">
        {showAlert.isOpen && (
          <Alerts
            props={{
              isOpen: showAlert.isOpen,
              type: showAlert.type,
              message: showAlert.message,
            }}
          />
        )}
        <ComponentCard title="Add Guest">
          <CustomStepper newGuestData={newGuestData} />
        </ComponentCard>
      </div>
    </GuestContextProvider>
  );
};

export default AddGuest;
