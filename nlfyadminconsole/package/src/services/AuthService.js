import React, { useState, createContext, useEffect } from "react";
import { auth, googleProvider } from "../firebase";
import {
  getRedirectResult,
  onAuthStateChanged,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import axios from "axios";
import { BASEURL } from "../APIKey";
import ComponentModal from "../components/ComponentModal";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticating, setISAuthenticating] = useState(false);
  const url = `${BASEURL}leaders/`;
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, async (usr) => {
      if (usr) {
        setIsLoading(true);
        let leadersGmailId = await checkLeaderAlreadySaved(usr.email);
        console.log("onAuthStateChanged", usr.email, leadersGmailId);
        if (usr.email === leadersGmailId) {
          const { displayName, email, photoURL, metadata } = usr;
          let lastSignInTime = metadata.lastSignInTime;
          let splitName = displayName.split(/\s+/);
          let firstName = splitName[0];
          let lastName = splitName[1];
          let modifiedUser = {
            firstName,
            lastName,
            email,
            photoURL,
            lastSignInTime,
          };
          setUser(modifiedUser);
          setIsLoading(false);
          setISAuthenticating(false);
          // console.log("SAVED >>>", user);
        } else {
          const { displayName, email, photoURL, metadata } = usr;
          let lastSignInTime = metadata.lastSignInTime;
          let splitName = displayName.split(/\s+/);
          let firstName = splitName[0];
          let lastName = splitName[1];
          let modifiedUser = {
            firstName,
            lastName,
            email,
            photoURL,
            lastSignInTime,
          };
          setUser(modifiedUser);
          saveData(modifiedUser);
          setIsLoading(false);
          setISAuthenticating(false);
          // console.log("NOT SAVED >>>", user);
        }
      }
    });
  }, []);

  const signInWithGoogle = async () => {
    setIsLoading(true);
    setISAuthenticating(true);
    try {
      await signInWithRedirect(auth, googleProvider);
      const result = await getRedirectResult(auth);
      // setIsLoading(false);
      // setUser(result.user);
      setIsLoading(true);
      console.log("Result:", result);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const checkLeaderAlreadySaved = async (gmailid) => {
    try {
      let response = await axios.get(url + gmailid);
      if (response.data.length > 0) {
        let email = response.data[0].gmailid;
        console.log("found", email);
        return email;
      } else {
        return null;
      }
    } catch (err) {
      console.log(err, "checkLeaderAlreadySaved");
      console.log("not found");
      return null;
    }
  };

  const saveData = async (user) => {
    let postbody = {
      firstname: user.firstName,
      lastname: user.lastName,
      gmailid: user.email,
      lastlogintime: user.lastSignInTime,
    };
    console.log("postbody", postbody);
    await axios
      .post(url, postbody)
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  };

  // const logOut = async () => {
  //   setIsLoading(true);
  //   try {
  //     await signOut(auth);
  //     setIsLoading(false);
  //     setUser(null);
  //   } catch (error) {
  //     setIsLoading(false);
  //     console.error(error);
  //   }
  // };

  const logOut = () => {
    setIsLogoutModalOpen(true);
  };

  const handleLogoutConfirmed = async () => {
    setIsLoading(true);
    try {
      await signOut(auth);
      setIsLoading(false);
      setUser(null);
      setIsLogoutModalOpen(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  const handleLogoutCancelled = () => {
    setIsLogoutModalOpen(false);
  };

  return (
    <AuthenticationContext.Provider
      value={{ user, isLoading, isAuthenticating, signInWithGoogle, logOut }}
    >
      <ComponentModal
        show={isLogoutModalOpen}
        toggle={handleLogoutCancelled}
        title=""
        submitButtonTitle="Yes"
        submitButtonClick={handleLogoutConfirmed}
        cancelButtonTitle="No"
        cancelButtonClick={handleLogoutCancelled}
      >
        <h5 className="text-center">Are you sure you want to logout?</h5>
      </ComponentModal>
      {children}
    </AuthenticationContext.Provider>
  );
};
