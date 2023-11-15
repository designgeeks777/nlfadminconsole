import { useContext, useEffect, useRef } from "react";
import ComponentCard from "../../../components/ComponentCard";
import { BASEURL } from "../../../APIKey";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { errorMsgs, successMsgs } from "../../../constants";
import { LoaderContext } from "../../../LoaderContext";
import { AlertContext } from "../../../services/AlertService";
import CustomStepper from "../../../components/Stepper";

const AddGuest = () => {
  let navigate = useNavigate();
  const url = `${BASEURL}guests/`;
  const { setIsLoading } = useContext(LoaderContext);
  const { setAlert } = useContext(AlertContext);
  const hideCard = useRef(false);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const addGuest = (guestData) => {
    let showAlert = {};
    console.log("added", guestData);
    setIsLoading(true);
    navigate("/guestCounter");
    axios
      .post(url, guestData)
      .then(() => {
        setIsLoading(false);
        showAlert = {
          isOpen: true,
          type: "success",
          message: `Guest ${successMsgs.add}`,
        };
        setAlert(showAlert);
      })
      .catch((error) => {
        setIsLoading(false);
        showAlert = {
          isOpen: true,
          type: "danger",
          message: errorMsgs.add,
        };
        setAlert(showAlert);
      });
  };

  const handleCallback = (guestData, hide) => {
    hideCard.current = hide;
    addGuest(guestData);
  };

  return (
    <>
      {!hideCard.current && (
        <ComponentCard title="Add Guest">
          <CustomStepper parentCallback={handleCallback} />
        </ComponentCard>
      )}
    </>
  );
};

export default AddGuest;
