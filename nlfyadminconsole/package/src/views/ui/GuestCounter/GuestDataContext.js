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
import { BASEURL } from "../../../APIKey";

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
  const [assignNow, setAssignNow] = useState(false);
  const [lifeGroupOptions, setLifeGroupOptions] = useState([
    { place: "Select a LifeGroup", lifegroupid: "" },
  ]);
  const lifeGroupsUrl = `${BASEURL}lifeGroups/`;
  const [lifeGroupPlace, setLifeGroupPlace] = useState("");
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
      setGuestData({
        ...guestData,
        [name]: typeof value === "string" ? value : value,
      });
    }
    // console.log(inputType, updatedValue, guestData);
  };

  let lg = "";
  useEffect(() => {
    if (lg !== lifeGroupOptions.length) {
      setLifeGroupOptions(lifeGroupOptions);
    }
    // console.log("GUEST CONTEXT lifeGroupOptionsEFFECT", lifeGroupOptions);
  }, [lifeGroupOptions]);

  //get all lifeGroup places list
  const getLifeGroupOptions = async () => {
    const LGResponse = await axios.get(lifeGroupsUrl);
    let options = LGResponse.data.map((lifeGroup) => {
      const { place, _id } = lifeGroup;
      return { place: place, lifegroupid: _id };
    });
    setLifeGroupOptions((prevState) => [...prevState, ...options]);
    // console.log("GUESTCONTEXT>>>>>>>>>", lifeGroupOptions);
  };

  //get lifegroup place name
  const fetchLifeGroupPlace = (lifeGroupOptions, id) => {
    const response = lifeGroupOptions.filter(
      (lifeGroup) => lifeGroup.lifegroupid === id
    );
    var place = response[0].place;
    setLifeGroupPlace(place);
    // console.log("fetchLifeGroupPlace", lifeGroupPlace);
  };

  return (
    <GuestContext.Provider
      value={{
        guestData,
        lifeGroupPlace,
        lifeGroupOptions,
        assignNow,
        getLifeGroupOptions,
        fetchLifeGroupPlace,
        setGuestDetails,
        setGuestData,
        setAssignNow,
      }}
    >
      {children}
    </GuestContext.Provider>
  );
};
