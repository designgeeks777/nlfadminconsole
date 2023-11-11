import React, {
  useState,
  createContext,
  useEffect,
  useRef,
  useContext,
  useCallback,
} from "react";
import axios from "axios";
import { LoaderContext } from "../../../LoaderContext";

export const GuestContext = createContext();

export const GuestContextProvider = ({ children }) => {
  const [guestData, setGuestData] = useState({
    firstname: "",
    lastname: "",
    address: "",
    contactnumber: "",
    email: "",
    dob: "",
    enteredon: "",
    gender: "male",
    maritalstatus: "single",
    hearaboutus: "others",
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
  const { isLoading, setIsLoading } = useContext(LoaderContext);

  let updatedValue = "";
  var inputType = "";

  useEffect(() => {
    if (updatedValue !== inputType) {
      console.log("hi");
    }
    console.log("hi out");
  }, [updatedValue, inputType]);

  const setGuestDetails = (name, value) => {
    inputType = name;
    updatedValue = value;
    if (inputType === "enteredon") {
      updatedValue = new Date(value).toLocaleDateString("en-GB");
      setGuestData({
        ...guestData,
        enteredon: updatedValue,
      });
    } else if (inputType === "dob") {
      updatedValue = new Date(value).toLocaleDateString("en-GB");
      setGuestData({
        ...guestData,
        dob: updatedValue,
      });
    } else {
      setGuestData({ ...guestData, [name]: value });
    }
    console.log(updatedValue, guestData);
  };

  return (
    <GuestContext.Provider value={{ guestData, setGuestDetails }}>
      {children}
    </GuestContext.Provider>
  );
};
