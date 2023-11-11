import { useRoutes } from "react-router-dom";
import ThemeRoutes from "./routes/Router";
import { useContext, useEffect } from "react";
import { AuthenticationContext } from "./services/AuthService";
import Loader from "./layouts/loader/Loader";

const App = () => {
  const { user, isLoading } = useContext(AuthenticationContext);
  console.log("Userrr", user);
  console.log("isLoading in Appjs", isLoading);

  const routes = ThemeRoutes(user);
  const routing = useRoutes(routes);

  return isLoading === "undefined" || isLoading === true ? (
    <Loader />
  ) : (
    <div className="dark">{routing}</div>
  );
};

export default App;
