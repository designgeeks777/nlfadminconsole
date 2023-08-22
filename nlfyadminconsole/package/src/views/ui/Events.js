import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import ComponentModal from "../../components/ComponentModal";

const tableData = [
  {
    dateOfEvent: "Oct 02",
    placeOfEvent: "Zoom",
    timeOfEvent: "7:30 - 9:30 PM",
    recurringEvent: "yes",
    nameOfEvent: "Bible Study",
  },
];
const Events = () => {
  const [state, setState] = useState(false);
  const [changeBgColor, setChangeBgColor] = useState(false);
  const toggle = () => {
    setState(!state);
  };
  const selectOptions = [
    { label: "Select recurrance type", value: "default" },
    { label: "Daily", value: "daily" },
    { label: "Weekly on Wednesdays", value: "weeklyOnWednesdays" },
    {
      label: "Monthly on the third Wednesday",
      value: "monthlyOnheThirdWednesday",
    },
    {
      label: "Every Weekday(Monday to Friday)",
      value: "everyWeekdayMondayToFriday",
    },
    { label: "Custom", value: "custom" },
  ];

  const repeatOptions = [
    { label: "Week", value: "week" },
    { label: "Month", value: "month" },
    { label: "Year", value: "year" },
  ];
  const daysOptions = [
    { label: "S", value: "sunday" },
    { label: "M", value: "monday" },
    { label: "T", value: "tuesday" },
    { label: "W", value: "wednesday" },
    { label: "T", value: "thursday" },
    { label: "F", value: "friday" },
    { label: "S", value: "saturday" },
  ];
  const [selectedValue, setSelectedValue] = useState("");
  var updateSelectedValue = "";
  const [selectedRepeatValue, setSelectedRepeatValue] = useState("");
  const selectedDayValue = useRef(null);

  useEffect(() => {
    if (updateSelectedValue !== selectedValue) {
      setSelectedValue(selectedValue);
    }
    console.log("effect selectedValue", selectedValue);
  }, [updateSelectedValue, selectedValue]);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    console.log("selectedValue", selectedValue);
  };

  useEffect(() => {
    if (updateSelectedValue !== selectedRepeatValue) {
      setSelectedRepeatValue(selectedRepeatValue);
    }
    console.log("effect selectedRepeatValue", selectedRepeatValue);
  }, [updateSelectedValue, selectedRepeatValue]);

  const handleCustomRepeatChange = (e) => {
    setSelectedRepeatValue(e.target.value);
    console.log("selectedRepeatValue", selectedRepeatValue);
  };

  const customStyles = {
    option: (defaultStyles, states) => ({
      ...defaultStyles,
      color: states.isSelected ? "#212529" : "#fff",
      backgroundColor: states.isSelected ? "#a0a0a0" : "#212529",
    }),

    control: (defaultStyles, states) => ({
      ...defaultStyles,
      backgroundColor: "#212529",
      borderColor: states.isFocused ? "grey" : "red",
      padding: "10px",
      border: "none",
      boxShadow: "none",
    }),
    singleValue: (defaultStyles) => ({ ...defaultStyles, color: "#fff" }),
  };

  const [count, setCount] = useState(1);
  const [selectedId, setSelectedId] = useState(null);
  const onSelectItem = (id, daySelected) => {
    if (id === selectedId) return setSelectedId(null);
    setSelectedId(id);
    selectedDayValue.current = daySelected;
    console.log(selectedDayValue.current);
  };

  //   useEffect(() => {
  //     console.log(count, "useeffetc");
  //   }, [count]);

  return (
    <div className="d-flex flex-column mb-4">
      <div className="p-2 align-self-end mb-3">
        <Button
          className="btn"
          color="primary"
          size="lg"
          onClick={() => {
            setState(true);
          }}
        >
          Add New Event
        </Button>
        {state ? (
          <ComponentModal
            state={state}
            toggle={toggle}
            title="Add Event"
            submitButtonTitle="Save"
            cancelButtonTitle="Cancel"
          >
            <Form>
              <FormGroup>
                <Label for="eventName" className="modal-body-label">
                  Event name
                </Label>
                <Input
                  id="eventName"
                  name="event"
                  type="text"
                  bsSize="sm"
                  className="modal-body-input shadow-none"
                  placeholder=""
                />
              </FormGroup>
              <FormGroup>
                <Row className="mb-4">
                  <Col md="4" lg="4">
                    <Label for="date" className="modal-body-label">
                      Date
                    </Label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      className="shadow-none modal-body-input"
                      bsSize="sm"
                      placeholder=""
                    />
                  </Col>
                  <Col md="4" lg="4">
                    <Label for="time" className="modal-body-label">
                      Time
                    </Label>
                    <Input
                      id="time"
                      name="time"
                      type="time"
                      bsSize="sm"
                      className="shadow-none modal-body-input"
                      placeholder=""
                    />
                  </Col>
                  <Col md="4" lg="4">
                    <Label for="place" className="modal-body-label">
                      Place
                    </Label>
                    <Input
                      id="place"
                      name="place"
                      type="text"
                      bsSize="sm"
                      className="shadow-none modal-body-input"
                      placeholder=""
                    />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup check className="mb-4">
                <Input type="checkbox" className="text-primary shadow-none" />{" "}
                <Label check>Is this recurring event?</Label>
              </FormGroup>
              <FormGroup className="mb-4">
                <Input
                  id="exampleSelect"
                  name="exampleSelect"
                  type="select"
                  className="shadow-none w-50 form-select-sm"
                  value={selectedValue}
                  onChange={handleChange}
                  //   styles={customStyles}
                  style={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      borderColor: state.isFocused ? "grey" : "red",
                      color: state.isFocused ? "grey" : "red",
                    }),
                  }}
                >
                  {selectOptions.map((option) => (
                    <option value={option.value}>{option.label}</option>
                  ))}
                </Input>
              </FormGroup>
              {selectedValue === "custom" ? (
                <div className="custom-event-container rounded p-2">
                  <h5 className="modal-body-label py-2">Custom Reccurance</h5>
                  <div className="d-flex align-items-center">
                    <Label className="me-2">Repeat every</Label>
                    <p className="shadow-none me-2">{count}</p>
                    <div className="d-flex flex-column align-self-start me-2">
                      <i
                        className="bi bi-chevron-up fa-xs text-primary pb-1"
                        onClick={() => {
                          if (count < 7) {
                            setCount(count + 1);
                          }
                        }}
                      ></i>
                      <i
                        className="bi bi-chevron-down fa-xs text-primary pt-1"
                        onClick={() => {
                          if (count > 0) {
                            setCount(count - 1);
                          }
                        }}
                      ></i>
                    </div>
                    <FormGroup className="mb-0">
                      <Input
                        id="customRepeatSelect"
                        name="customRepeatSelect"
                        type="select"
                        className="shadow-none form-select-sm"
                        value={selectedRepeatValue}
                        onChange={handleCustomRepeatChange}
                        styles={customStyles}
                      >
                        {repeatOptions.map((option) => (
                          <option value={option.value}>{option.label}</option>
                        ))}
                      </Input>
                    </FormGroup>
                  </div>
                  <Label>Repeat On</Label>
                  <div className="d-flex justify-content-evenly">
                    {daysOptions.map((day, index) => (
                      <span
                        style={{
                          height: 20,
                          width: 20,
                          backgroundColor:
                            changeBgColor && selectedId === index
                              ? "#F26E24"
                              : "#dee2e6",
                          color:
                            changeBgColor && selectedId === index
                              ? "#ffffff"
                              : "inherit",
                        }}
                        className="text-center rounded-circle d-flex align-items-center 
                        justify-content-center text-black p-3"
                        onClick={() => {
                          setChangeBgColor(true);
                          onSelectItem(index, day.value);
                        }}
                      >
                        <span
                          style={{
                            backgroundColor:
                              changeBgColor && selectedId === index
                                ? "#F26E24"
                                : "#dee2e6",
                            color:
                              changeBgColor && selectedId === index
                                ? "#ffffff"
                                : "inherit",
                          }}
                        >
                          {day.label}
                        </span>
                      </span>
                    ))}
                  </div>
                  <FormGroup tag="fieldset" className="my-2">
                    <Label>Ends</Label>
                    <FormGroup check>
                      <Input name="radio1" type="radio" />{" "}
                      <Label check className="form-Label">
                        Never
                      </Label>
                    </FormGroup>
                    <FormGroup check>
                      <Input name="radio1" type="radio" />{" "}
                      <Label check className="form-Label">
                        On
                      </Label>
                    </FormGroup>
                  </FormGroup>
                </div>
              ) : null}
            </Form>
          </ComponentModal>
        ) : null}
      </div>
      <Card>
        <CardBody className="p-4">
          <CardTitle tag="h5">Upcoming Events</CardTitle>
          <div className="event-container">
            <Row
            //   className="p-2"
            // style={{ overflowX: "auto", whiteSpace: "nowrap" }}
            >
              <Col md="4" lg="5" className="p-4">
                <div className="d-flex">
                  <div
                    //   style={{
                    //     borderRadius: 12,
                    //     width: 80,
                    //     height: 80,
                    //     background:
                    //       "linear-gradient(180deg, #F26924 0%, rgba(242, 105, 36, 0.7) 100%)",
                    //   }}
                    className="d-flex event-card flex-column px-2 justify-content-center align-items-center"
                  >
                    <span className="text-white">OCT</span>
                    <span className="text-white">02</span>
                  </div>
                  <div className="mx-3 d-flex flex-column">
                    <legend className="mb-0 fw-bold">Bible Study</legend>
                    <small className="text-muted text-black fw-bold">
                      Every Wednesday, 7:30 - 9:30 PM
                    </small>
                    <small className="text-muted text-black fw-bold">
                      Zoom
                    </small>
                  </div>
                </div>
              </Col>
              <Col md="4" lg="5" className="p-4">
                <div className="d-flex">
                  <div
                    style={{
                      borderRadius: 12,
                      width: 80,
                      height: 80,
                      background:
                        "linear-gradient(180deg, #F26924 0%, rgba(242, 105, 36, 0.7) 100%)",
                    }}
                    className="d-flex flex-column px-2 justify-content-center align-items-center"
                  >
                    <span className="text-white">OCT</span>
                    <span className="text-white">02</span>
                  </div>
                  <div className="mx-3 d-flex flex-column">
                    <legend className="mb-0 fw-bold">Friday Prayers</legend>
                    <small className="text-muted text-black fw-bold">
                      Every Wednesday, 7:30 - 9:30 PM
                    </small>
                    <small className="text-muted text-black fw-bold">
                      Zoom
                    </small>
                  </div>
                </div>
              </Col>
              <Col md="4" lg="5" className="p-4">
                <div className="d-flex">
                  <div
                    style={{
                      borderRadius: 12,
                      width: 80,
                      height: 80,
                      background:
                        "linear-gradient(180deg, #F26924 0%, rgba(242, 105, 36, 0.7) 100%)",
                    }}
                    className="d-flex flex-column px-2 justify-content-center align-items-center"
                  >
                    <span className="text-white">OCT</span>
                    <span className="text-white">02</span>
                  </div>
                  <div className="mx-3 d-flex flex-column">
                    <legend className="mb-0 fw-bold">Bible Study</legend>
                    <small className="text-muted text-black fw-bold">
                      Every Wednesday, 7:30 - 9:30 PM
                    </small>
                    <small className="text-muted text-black fw-bold">
                      Zoom
                    </small>
                  </div>
                </div>
              </Col>
              <Col md="4" lg="5" className="p-4">
                <div className="d-flex">
                  <div
                    style={{
                      borderRadius: 12,
                      width: 80,
                      height: 80,
                      background:
                        "linear-gradient(180deg, #F26924 0%, rgba(242, 105, 36, 0.7) 100%)",
                    }}
                    className="d-flex flex-column px-2 justify-content-center align-items-center"
                  >
                    <span className="text-white">OCT</span>
                    <span className="text-white">02</span>
                  </div>
                  <div className="mx-3 d-flex flex-column">
                    <legend className="mb-0 fw-bold">Bible Study</legend>
                    <small className="text-muted text-black fw-bold">
                      Every Wednesday, 7:30 - 9:30 PM
                    </small>
                    <small className="text-muted text-black fw-bold">
                      Zoom
                    </small>
                  </div>
                </div>
              </Col>
              <Col md="4" lg="5" className="p-4">
                <div className="d-flex">
                  <div
                    style={{
                      borderRadius: 12,
                      width: 80,
                      height: 80,
                      background:
                        "linear-gradient(180deg, #F26924 0%, rgba(242, 105, 36, 0.7) 100%)",
                    }}
                    className="d-flex flex-column px-2 justify-content-center align-items-center"
                  >
                    <span className="text-white">OCT</span>
                    <span className="text-white">02</span>
                  </div>
                  <div className="mx-3 d-flex flex-column">
                    <legend className="mb-0 fw-bold">Bible Study</legend>
                    <small className="text-muted text-black fw-bold">
                      Every Wednesday, 7:30 - 9:30 PM
                    </small>
                    <small className="text-muted text-black fw-bold">
                      Zoom
                    </small>
                  </div>
                </div>
              </Col>

              <Col md="4" lg="5" className="p-4">
                <div className="d-flex">
                  <div
                    style={{
                      borderRadius: 12,
                      width: 80,
                      height: 80,
                      background:
                        "linear-gradient(180deg, #F26924 0%, rgba(242, 105, 36, 0.7) 100%)",
                    }}
                    className="d-flex flex-column px-2 justify-content-center align-items-center"
                  >
                    <span className="text-white">OCT</span>
                    <span className="text-white">02</span>
                  </div>
                  <div className="mx-3 d-flex flex-column">
                    <legend className="mb-0 fw-bold">Bible Study</legend>
                    <small className="text-muted text-black fw-bold">
                      Every Wednesday, 7:30 - 9:30 PM
                    </small>
                    <small className="text-muted text-black fw-bold">
                      Zoom
                    </small>
                  </div>
                </div>
              </Col>
              <Col md="4" lg="5" className="p-4">
                <div className="d-flex">
                  <div
                    style={{
                      borderRadius: 12,
                      width: 80,
                      height: 80,
                      background:
                        "linear-gradient(180deg, #F26924 0%, rgba(242, 105, 36, 0.7) 100%)",
                    }}
                    className="d-flex flex-column px-2 justify-content-center align-items-center"
                  >
                    <span className="text-white">OCT</span>
                    <span className="text-white">02</span>
                  </div>
                  <div className="mx-3 d-flex flex-column">
                    <legend className="mb-0 fw-bold">Bible Study</legend>
                    <small className="text-muted text-black fw-bold">
                      Every Wednesday, 7:30 - 9:30 PM
                    </small>
                    <small className="text-muted text-black fw-bold">
                      Zoom
                    </small>
                  </div>
                </div>
              </Col>
              <Col md="4" lg="5" className="p-4">
                <div className="d-flex">
                  <div
                    style={{
                      borderRadius: 12,
                      width: 80,
                      height: 80,
                      background:
                        "linear-gradient(180deg, #F26924 0%, rgba(242, 105, 36, 0.7) 100%)",
                    }}
                    className="d-flex flex-column px-2 justify-content-center align-items-center"
                  >
                    <span className="text-white">OCT</span>
                    <span className="text-white">02</span>
                  </div>
                  <div className="mx-3 d-flex flex-column">
                    <legend className="mb-0 fw-bold">Bible Study</legend>
                    <small className="text-muted text-black fw-bold">
                      Every Wednesday, 7:30 - 9:30 PM
                    </small>
                    <small className="text-muted text-black fw-bold">
                      Zoom
                    </small>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
export default Events;
