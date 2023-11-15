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
  const [lifeGroupOptions, setLifeGroupOptions] = useState([
    { place: "Select a LifeGroup", lifegroupid: "" },
  ]);
  const lifeGroupsUrl = `${BASEURL}lifeGroups/`;
  const [lifeGroupPlace, setLifeGroupPlace] = useState("");
  const [getLGOptions, fetchLifeGroupOptions] = useState(false);
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
    // console.log(inputType, updatedValue, guestData);
  };

  //called onfirst load of GC, and load options only on selecting guestCounter page
  useEffect(() => {
    if (getLGOptions) {
      getLifeGroupOptions();
    }
  }, [getLGOptions]);

  let lg = "";
  useEffect(() => {
    if (lg !== guestData.lifegroupid) {
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
  };

  return (
    <GuestContext.Provider
      value={{
        guestData,
        lifeGroupPlace,
        lifeGroupOptions,
        fetchLifeGroupOptions,
        fetchLifeGroupPlace,
        setGuestDetails,
      }}
    >
      {children}
    </GuestContext.Provider>
  );
};
