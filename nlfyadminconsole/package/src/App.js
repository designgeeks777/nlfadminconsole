import { useRoutes } from "react-router-dom";
import ThemeRoutes from "./routes/Router";
import { useContext, useEffect } from "react";
import { AuthenticationContext } from "./services/AuthService";

const App = () => {
  const { user } = useContext(AuthenticationContext);
  const routing = useRoutes(ThemeRoutes(user));
  return <div className="dark">{routing}</div>;
};

export default App;
