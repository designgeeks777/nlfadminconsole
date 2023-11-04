import React, {
  useState,
  createContext,
  useEffect,
  useRef,
  useContext,
} from "react";
import { auth, googleProvider } from "../firebase";
import {
  GoogleAuthProvider,
  getRedirectResult,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import { LoaderContext } from "../LoaderContext";

export const AuthenticationContext = createContext({ user: null });

export const AuthenticationContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { isLoading, setIsLoading } = useContext(LoaderContext);

  useEffect(() => {
    onAuthStateChanged(auth, async (usr) => {
      if (usr) {
        setIsLoading(false);
        // const { displayName, email } = usr;
        setUser(usr);
      } else {
        setIsLoading(false);
        setUser(null);
      }
    });
  }, []);

  const signInWithGoogle = async () => {
    setIsLoading(true);
    try {
      const res = await signInWithPopup(auth, googleProvider);

      let user = res.user;
      setUser(user);
      setIsLoading(false);
      // console.log(user);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      alert(error.message);
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // const email = error.customData.email;
      // const credential = GoogleAuthProvider.credentialFromError(error);
    }
  };
  const logOut = async () => {
    setIsLoading(true);
    signOut(auth)
      .then(() => {
        setIsLoading(false);
        // console.log("LOGOUT", user);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });
  };

  return (
    <AuthenticationContext.Provider value={{ user, signInWithGoogle, logOut }}>
      {children}
    </AuthenticationContext.Provider>
  );
};
