import { Button, FormGroup, Input, Label } from "reactstrap";
import { useContext, useEffect, useState } from "react";
import ComponentCard from "../../../components/ComponentCard";
import { BASEURL } from "../../../APIKey";
import axios from "axios";
import Alerts from "../Alerts";
import { useNavigate } from "react-router-dom";
import { errorMsgs, successMsgs } from "../../../constants";
import { LoaderContext } from "../../../LoaderContext";
import { GuestContext, GuestContextProvider } from "./GuestDataContext";
import CustomStepper from "../../../components/Stepper";

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
  
  const addGuest = (guestData) => {
    console.log("added", guestData);
    axios
      .post(url, guestData)
      .then(() => {
        navigate("/dashboard");
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

  const handleCallback = (guestData) => {
    addGuest(guestData);
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
          <CustomStepper parentCallback={handleCallback} />
        </ComponentCard>
      </div>
    </GuestContextProvider>
  );
};

export default AddGuest;
