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
    enteredon: new Date().toLocaleDateString("en-GB"),
    gender: "male",
    maritalstatus: "single",
    hearaboutus: "website",
    invitedby: "",
    hearaboutusothers: "",
    willingnesstojoin: "",
    lifegroupid: "",
    followupmember: "",
    followupnotes: [],
    startedlifegroup: "",
    startedlifegroupdate: "",
    lifegroupassigndate: "",
    followupmemberassigneddate: "",
  });
  const { isLoading, setIsLoading } = useContext(LoaderContext);

  let updatedValue = "";
  var inputType = "";

  const setGuestDetails = (name, value) => {
    inputType = name;
    updatedValue = value;
    if (inputType === "dob") {
      updatedValue = new Date(value).toLocaleDateString("en-GB");
      setGuestData({
        ...guestData,
        dob: updatedValue,
      });
    } else {
      setGuestData({ ...guestData, [name]: value });
    }
    console.log(inputType, updatedValue, guestData);
  };

  return (
    <GuestContext.Provider value={{ guestData, setGuestDetails, setGuestData }}>
      {children}
    </GuestContext.Provider>
  );
};
