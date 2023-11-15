import { Button, Card, CardTitle } from "reactstrap";
import { useContext } from "react";
import { AuthenticationContext } from "../services/AuthService";

const Login = () => {
  const { signInWithGoogle } = useContext(AuthenticationContext);

  return (
    <div className="loginBg d-flex flex-column align-items-center justify-content-center">
      <Card className="loginCard d-flex flex-column align-items-center justify-content-evenly mb-2">
        <CardTitle tag="h3" className="text-primary">
          Admin Console
        </CardTitle>
        <img
          alt="logo"
          src={require("../assets/images/logos/logoIcon.png")}
          width={104}
          height={104}
        />
        <Button className="fw-bold loginButton" onClick={signInWithGoogle}>
          <img
            alt="logo"
            src={require("../assets/images/logos/googleIcon.png")}
            width={40}
            height={40}
          />
          Sign In with Google
        </Button>
      </Card>
      <div className="text-white fw-bold">
        <i className="bi bi-c-circle"></i> Powered by DezignGeeks
      </div>
    </div>
  );
};
export default Login;
