import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Form,
  FormGroup,
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

  return (
    <div className="d-flex flex-column mb-4">
      <div className="align-self-end mb-3">
        <Button
          className="btn buttons"
          color="primary"
          onClick={() => {
            setState(true);
          }}
        >
          Add New Event
        </Button>
        {state ? (
          <ComponentModal
            show={state}
            toggle={toggle}
            title="Add Event"
            submitButtonTitle="Save"
            cancelButtonTitle="Cancel"
          >
            <Form>
              <div className="mb-3">
                <label for="eventName" className="form-label modal-body-label">
                  Event name
                </label>
                <input
                  id="eventName"
                  name="eventName"
                  type="text"
                  className="form-control modal-body-input shadow-none"
                  placeholder=""
                />
              </div>
              <div className="mb-3">
                <Row>
                  <Col md="4" lg="4">
                    <label for="date" className="form-label modal-body-label">
                      Date
                    </label>
                    <input
                      id="date"
                      name="date"
                      type="date"
                      className="form-control shadow-none modal-body-input"
                      placeholder=""
                    />
                  </Col>
                  <Col md="4" lg="4">
                    <label for="time" className="form-label modal-body-label">
                      Time
                    </label>
                    <input
                      id="time"
                      name="time"
                      type="time"
                      className="form-control shadow-none modal-body-input"
                      placeholder=""
                    />
                  </Col>
                  <Col md="4" lg="4">
                    <label for="place" className="form-label modal-body-label">
                      Place
                    </label>
                    <input
                      id="place"
                      name="place"
                      type="text"
                      className="form-control shadow-none modal-body-input"
                      placeholder=""
                    />
                  </Col>
                </Row>
              </div>
              <div className="mb-3" check>
                <input
                  type="checkbox"
                  className="form-check-input text-primary shadow-none"
                />{" "}
                <label className="form-check-label">
                  Is this recurring event?
                </label>
              </div>
              <div className="mb-3">
                <select
                  id="exampleSelect"
                  name="exampleSelect"
                  className="form-select shadow-none w-50"
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
                    <option append-to="body" value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              {selectedValue === "custom" ? (
                <div className="custom-event-container rounded p-3">
                  <h5 className="modal-body-label py-2">Custom Reccurance</h5>
                  <div className="d-flex align-items-center mb-3">
                    <label className="form-label me-2 mb-0">Repeat every</label>
                    <p className="shadow-none me-2 mb-0">{count}</p>
                    <div className="d-flex flex-column align-self-start me-2 mt-1">
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
                    <div className="mb-0">
                      <select
                        id="customRepeatSelect"
                        name="customRepeatSelect"
                        className="form-select shadow-none "
                        value={selectedRepeatValue}
                        onChange={handleCustomRepeatChange}
                        styles={customStyles}
                      >
                        {repeatOptions.map((option) => (
                          <option append-to="body" value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <label className="form-label">Repeat On</label>
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
                  <div className="my-3">
                    <label className="form-label">Ends</label>
                    <div className="form-check">
                      <input
                        className="form-check-input shadow-none"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                        checked
                      />
                      <label
                        className="form-check-label"
                        for="flexRadioDefault1"
                      >
                        Never
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input shadow-none"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault2"
                      />
                      <label
                        className="form-check-label"
                        for="flexRadioDefault2"
                      >
                        On
                      </label>
                    </div>
                  </div>
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
                  <div className="d-flex event-card flex-column px-2 justify-content-center align-items-center">
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
                  <div className="d-flex event-card flex-column px-2 justify-content-center align-items-center">
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
                  <div className="d-flex event-card flex-column px-2 justify-content-center align-items-center">
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
                  <div className="d-flex event-card flex-column px-2 justify-content-center align-items-center">
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
                  <div className="d-flex event-card flex-column px-2 justify-content-center align-items-center">
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
                  <div className="d-flex event-card flex-column px-2 justify-content-center align-items-center">
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
                  <div className="d-flex event-card flex-column px-2 justify-content-center align-items-center">
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
