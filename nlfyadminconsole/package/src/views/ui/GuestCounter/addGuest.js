import { Button, FormGroup, Input, Label } from "reactstrap";
import { useContext, useEffect, useState } from "react";
import ComponentCard from "../../../components/ComponentCard";
import { BASEURL } from "../../../APIKey";
import axios from "axios";
import Alerts from "../Alerts";
import { useLocation, useNavigate } from "react-router-dom";
import { errorMsgs, successMsgs } from "../../../constants";
import { LoaderContext } from "../../../LoaderContext";
import { GuestContext, GuestContextProvider } from "./GuestDataContext";
import CustomStepper from "../../../components/Stepper";

const AddGuest = ({ handleGuestCounterCallback }) => {
  let navigate = useNavigate();
  const url = `${BASEURL}guests/`;
  const [showAlert, setShowAlert] = useState({
    isOpen: false,
    type: "",
    message: "",
  });
  const { isLoading, setIsLoading } = useContext(LoaderContext);
  const state = useLocation();
  useEffect(() => {
    setIsLoading(false);
    console.log(state);
  }, []);

  const addGuest = (guestData) => {
    let showAlert = {};
    console.log("added", guestData);
    setIsLoading(true);
    // navigate("/guestCounter");
    axios
      .post(url, guestData)
      .then(() => {
        navigate("/guestCounter");
        setIsLoading(false);
        showAlert = {
          isOpen: true,
          type: "success",
          message: `Guest ${successMsgs.add}`,
        };
        handleGuestCounterCallback(true, showAlert);
      })
      .catch((error) => {
        setIsLoading(false);
        showAlert = {
          isOpen: true,
          type: "danger",
          message: errorMsgs.add,
        };
        handleGuestCounterCallback(false, showAlert);
      });
  };

  const handleCallback = (guestData) => {
    addGuest(guestData);
  };
  return (
    <GuestContextProvider>
      <ComponentCard title="Add Guest">
        <CustomStepper parentCallback={handleCallback} />
      </ComponentCard>
    </GuestContextProvider>
  );
};

export default AddGuest;
