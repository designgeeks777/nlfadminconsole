import React, { useContext, useEffect, useRef, useState } from "react";
import BasicDetails from "../views/ui/GuestCounter/Guest/basicDetails";
import Contact from "../views/ui/GuestCounter/Guest/contact";
import OtherDetails from "../views/ui/GuestCounter/Guest/otherDetails";
import AssignLifeGroup from "../views/ui/GuestCounter/Guest/assignLifeGroup";
import { useNavigate } from "react-router-dom";
import { GuestContext } from "../views/ui/GuestCounter/GuestDataContext";

function Stepper({ steps, activeStep }) {
  function getStepClass(step) {
    let cls = "step";
    if (activeStep === step) {
      cls += " step-active";
    } else if (activeStep > step) {
      cls += " step-done";
    } else {
      cls += " step-inactive";
    }
    return cls;
  }

  return (
    <div className="steps-container">
      {steps.map((label, index) => (
        <div className={getStepClass(index)} key={index}>
          <div>
            <div className="circle"></div>
          </div>
          {index < steps.length - 1 && <div className="line"></div>}
          <div className="label">{label}</div>
        </div>
      ))}
    </div>
  );
}

const CustomStepper = ({ parentCallback }) => {
  const [activeStep, setActiveStep] = useState(0);
  const { guestData, setGuestData } = useContext(GuestContext);
  const steps = ["Basic Details", "Contact", "Others", "Assign LifeGroup"];
  function getSectionComponent() {
    switch (activeStep) {
      case 0:
        return <BasicDetails />;
      case 1:
        return <Contact />;
      case 2:
        return <OtherDetails />;
      case 3:
        return <AssignLifeGroup />;
      default:
        return null;
    }
  }
  return (
    <>
      <Stepper steps={steps} activeStep={activeStep} />
      <div className="pt-4">
        <div className="pb-4 border-bottom">{getSectionComponent()}</div>
        <div
          className="pt-4"
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          {activeStep !== 0 && (
            <button
              className="btn px-4 py-2 me-3 buttons btn-secondary"
              onClick={() => setActiveStep(activeStep - 1)}
            >
              Back
            </button>
          )}
          {activeStep !== steps.length - 1 && (
            <button
              className="btn px-4 py-2 buttons btn-primary"
              onClick={() => {
                setActiveStep(activeStep + 1);
              }}
            >
              Next
            </button>
          )}
          {activeStep === steps.length - 1 && (
            <button
              className="btn px-4 py-2 buttons btn-primary"
              onClick={() => {
                parentCallback(guestData);
              }}
            >
              Save
            </button>
          )}
        </div>
      </div>
    </>
  );
};
export default CustomStepper;
