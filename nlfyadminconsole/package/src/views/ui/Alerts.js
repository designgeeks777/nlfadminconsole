import React, { useState } from "react";
import { Alert } from "reactstrap";

const Alerts = ({ props }) => {
  // For Dismiss Button with Alert
  const [visible, setVisible] = useState(true);

  const onDismiss = () => {
    setVisible(false);
  };

  return (
    <div>
      <Alert color={props.type} className={`text-${props.type}`}>
        <i className={`bi ${props.icon} fa-lg`}></i> {props.message}
      </Alert>
    </div>
  );
};

export default Alerts;
