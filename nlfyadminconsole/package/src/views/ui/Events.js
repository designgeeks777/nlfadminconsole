import React, { useEffect, useRef, useState } from "react";
import { Button, Card, CardBody, CardTitle, Col, Form, Row } from "reactstrap";
import ComponentModal from "../../components/ComponentModal";
import { BASEURL } from "../../APIKey";
import axios from "axios";

const Events = () => {
  const url = `${BASEURL}events/`;
  const [state, setState] = useState(false);
  const toggle = () => {
    setState(!state);
  };
  var dayOfTheWeek = useRef(0);
  var dayOfTheMonth = useRef(0);
  var weekNameOfMonth = useRef("");
  var weekOfMonth = useRef("");
  const [recurringEvent, setRecurringEvent] = useState(false);
  const [dateOfEvent, setDateOfEvent] = useState("");
  const [placeOfEvent, setPlaceOfEvent] = useState("");
  const [timeOfEvent, setTimeOfEvent] = useState("");
  const [nameOfEvent, setNameOfEvent] = useState("");
  useEffect(() => {
    var date = new Date();
    var day = date.getDate().toString().padStart(2, "0"),
      month = (date.getMonth() + 1).toString().padStart(2, "0"),
      year = date.getFullYear(),
      hour = date.getHours().toString().padStart(2, "0"),
      min = date.getMinutes().toString().padStart(2, "0");
    var today = year + "-" + month + "-" + day,
      displayTime = hour + ":" + min;
    // console.log(today, displayTime);
    setDateOfEvent(today);
    setTimeOfEvent(displayTime);
    // console.log(dateOfEvent);
  }, []);
  useEffect(() => {
    const dayNumbers = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const weekName = {
      1: "first",
      2: "second",
      3: "third",
      4: "fourth",
      5: "fifth",
    };
    const todayDate = new Date(dateOfEvent);
    dayOfTheWeek.current = dayNumbers[todayDate.getDay()];
    dayOfTheMonth.current = todayDate.getDate();
    //get week of the month
    weekOfMonth.current = Math.ceil(
      (todayDate.getDate() + 6 - todayDate.getDay()) / 7
    );
    weekNameOfMonth.current = weekName[weekOfMonth.current];
    // console.log(
    //   dateOfEvent,
    //   weekNameOfMonth.current,
    //   weekOfMonth.current ,
    //   dayOfTheWeek.current
    // );
  }, [dateOfEvent]);
  const updateWeekNumberOfMonth = useRef(null);
  const updateDayOfTheWeek = useRef(null);
  const [selectOptions, setSelectOptions] = useState([]);
  //to update recurring events weekly monthly option based on date selected.
  useEffect(() => {
    if (
      updateDayOfTheWeek.current !== dayOfTheWeek.current ||
      updateWeekNumberOfMonth.current !== weekNameOfMonth.current
    ) {
      setSelectOptions([
        { label: "Select recurrance type", value: "default" },
        { label: "Daily", value: "daily" },
        {
          label: `Weekly on ${dayOfTheWeek.current}`,
          // value: `weekly${dayOfTheWeek.current}`,
          value: "weekly",
        },
        {
          label: `Monthly on the ${weekNameOfMonth.current} ${dayOfTheWeek.current}`,
          // value: `monthlyOnThe${weekNameOfMonth.current}${dayOfTheWeek.current}`,
          value: "monthly",
        },
        {
          label: "Every Weekday(Monday to Friday)",
          value: "everyWeekdayMondayToFriday",
        },
        { label: "Custom", value: "custom" },
      ]);
    }
  }, [
    updateDayOfTheWeek.current,
    updateWeekNumberOfMonth.current,
    dayOfTheWeek.current,
    weekNameOfMonth.current,
  ]);

  const repeatOptions = [
    { label: ["day", "days"], value: "day" },
    { label: ["week", "weeks"], value: "week" },
    { label: ["month", "months"], value: "month" },
    // { label: ["year", "years"], value: "year" },
  ];
  const repeatMontlyOptions = [
    {
      label: `Monthly on the ${weekNameOfMonth.current} ${dayOfTheWeek.current}`,
      value: `monthlyOnthe${weekNameOfMonth.current}${dayOfTheWeek.current}`,
    },
    {
      label: `Monthly on day ${dayOfTheMonth.current}`,
      value: `monthlyOnDay${dayOfTheMonth.current}`,
    },
  ];
  const [selectedRepeatMonthlyValue, setSelectedRepeatMonthlyValue] =
    useState();
  const [selectedValue, setSelectedValue] = useState("");
  var updateSelectedValue = "";
  const [selectedRepeatValue, setSelectedRepeatValue] = useState("day");

  useEffect(() => {
    if (updateSelectedValue !== selectedValue) {
      setSelectedValue(selectedValue);
    }
    // console.log("effect selectedValue", selectedValue);
  }, [updateSelectedValue, selectedValue]);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    // console.log("selectedValue", selectedValue);
  };

  useEffect(() => {
    if (updateSelectedValue !== selectedRepeatValue) {
      setSelectedRepeatValue(selectedRepeatValue);
    }
    // console.log("effect selectedRepeatValue", selectedRepeatValue);
  }, [updateSelectedValue, selectedRepeatValue]);

  const handleCustomRepeatChange = (e) => {
    setSelectedRepeatValue(e.target.value);
    // console.log("selectedRepeatValue", selectedRepeatValue);
  };

  useEffect(() => {
    if (updateSelectedValue !== selectedRepeatMonthlyValue) {
      setSelectedRepeatMonthlyValue(selectedRepeatMonthlyValue);
    }
    // console.log(
    //   "effect selectedRepeatMonthlyValue",
    //   selectedRepeatMonthlyValue
    // );
  }, [updateSelectedValue, selectedRepeatMonthlyValue]);

  const handleRepeatMonthlyValueChange = (event) => {
    setSelectedRepeatMonthlyValue(event.target.value);
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
  let daysOptions = [
    { label: "S", value: "sunday", selected: false },
    { label: "M", value: "monday", selected: false },
    { label: "T", value: "tuesday", selected: false },
    { label: "W", value: "wednesday", selected: false },
    { label: "T", value: "thursday", selected: false },
    { label: "F", value: "friday", selected: false },
    { label: "S", value: "saturday", selected: false },
  ];
  const [options, setOptions] = useState([]);
  useEffect(() => {
    var dayName = "";
    if (selectedRepeatValue === "week") {
      dayName = dayOfTheWeek.current;
      var daysOptionswithCurrentDate = daysOptions.map((day) => {
        if (day.value === dayName.toLowerCase())
          return { ...day, selected: true };
        return day;
      });
      setOptions(daysOptionswithCurrentDate);
    }
  }, [selectedRepeatValue, dayOfTheWeek.current]);
  const onSelectItem = (id, daySelected) => {
    var arr = options.map((day) => {
      if (day.value === daySelected && !day.selected) {
        return { ...day, selected: true };
      }
      if (day.value === daySelected && day.selected) {
        return { ...day, selected: false };
      }
      return day;
    });
    setOptions(arr);
    // console.log(">>>>", arr);
  };

  const [count, setCount] = useState(1);
  const handleCountChange = (event) => {
    setCount(Number(event.currentTarget.value));
  };

  const [selectedRadioOption, setSelectedRadioOption] = useState("never");
  const handleRadioChange = (event) => {
    setSelectedRadioOption(event.target.value);
  };

  const handleDateOfEvent = (event) => {
    if (dateOfEvent !== event.target.value) {
      updateDayOfTheWeek.current = dayOfTheWeek.current;
      updateWeekNumberOfMonth.current = weekNameOfMonth.current;
    }
    // console.log(
    //   "DATE",
    //   dateOfEvent,
    //   event.target.value,
    //   dateOfEvent !== event.target.value,
    //   updateDayOfTheWeek.current
    // );
    setDateOfEvent(event.target.value);
  };
  const handlePlaceOfEvent = (event) => {
    setPlaceOfEvent(event.target.value);
  };
  const handleTimeOfEvent = (event) => {
    setTimeOfEvent(event.target.value);
  };
  const handleNameOfEvent = (event) => {
    setNameOfEvent(event.target.value);
  };

  const [endDate, setEndDate] = useState("");
  const handleEndDate = (event) => {
    setEndDate(event.target.value);
  };
  const onSubmit = () => {
    console.log("onSubmit", selectedRepeatMonthlyValue);
    let weeklyOptions = options
      .filter((day) => day.selected === true)
      .map((dayData) => {
        return dayData.value[0].toUpperCase() + dayData.value.slice(1);
      });
    console.log(weeklyOptions);
    let recurranceBody = {
      isRecurring: recurringEvent,
      recurrenceType: selectedValue,
      endDate: selectedRadioOption === "endsOn" ? endDate : "",
      recurrenceDays:
        selectedValue === "custom" && selectedRepeatValue === "week"
          ? weeklyOptions
          : selectedValue === "custom" &&
            selectedRepeatValue === "month" &&
            !/\d/.test(selectedRepeatMonthlyValue)
          ? [weekOfMonth.current, dayOfTheWeek.current]
          : selectedValue === "custom" &&
            selectedRepeatValue === "month" &&
            /\d/.test(selectedRepeatMonthlyValue)
          ? dayOfTheMonth.current
          : selectedValue === "custom" && selectedRepeatValue === "day"
          ? selectedRepeatValue
          : selectedValue === "weekly"
          ? dayOfTheWeek.current
          : selectedValue === "monthly"
          ? [weekOfMonth.current, dayOfTheWeek.current]
          : "",
      customEventRepeatType: selectedRepeatValue,
      recurrenceCount: selectedValue === "custom" ? count : 1,
    };
    let postbody = {
      dateOfEvent: dateOfEvent,
      placeOfEvent: placeOfEvent,
      timeOfEvent: timeOfEvent,
      recurringEvent: recurranceBody,
      nameOfEvent: nameOfEvent,
      typeOfEvent:
        selectedValue === "daily"
          ? "Daily"
          : selectedValue === "weekly"
          ? `Weekly on ${dayOfTheWeek.current}`
          : selectedValue === "monthly"
          ? `Monthly on the ${weekNameOfMonth.current} ${dayOfTheWeek.current}`
          : selectedValue === "everyWeekdayMondayToFriday"
          ? "Weekly on weekdays"
          : selectedValue === "custom" && selectedRepeatValue === "day"
          ? count === 1
            ? "Daily"
            : `Every ${count} days`
          : selectedValue === "custom" && selectedRepeatValue === "week"
          ? count === 1
            ? `Weekly on ${weeklyOptions.toString()}`
            : `Every ${count} weeks on ${weeklyOptions.toString()}`
          : selectedValue === "custom" &&
            selectedRepeatValue === "month" &&
            !/\d/.test(selectedRepeatMonthlyValue)
          ? count === 1
            ? `Monthly on the ${weekNameOfMonth.current} ${dayOfTheWeek.current}`
            : `Every ${count} months on the ${weekNameOfMonth.current} ${dayOfTheWeek.current} `
          : selectedValue === "custom" &&
            selectedRepeatValue === "month" &&
            /\d/.test(selectedRepeatMonthlyValue)
          ? count === 1
            ? `Monthly on day ${dayOfTheMonth.current}`
            : `Every ${count} on day ${dayOfTheMonth.current}`
          : "",
    };
    console.log("postbody", postbody);
    axios
      .post(url, postbody)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error("POST Error:", err);
      });
  };

  function leapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }
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
            cancelButtonClick={toggle}
            submitButtonClick={onSubmit}
          >
            <Form>
              <div className="mb-3">
                <label
                  htmlFor="eventName"
                  className="form-label modal-body-label"
                >
                  Event name
                </label>
                <input
                  id="eventName"
                  name="eventName"
                  type="text"
                  className="form-control modal-body-input shadow-none"
                  value={nameOfEvent}
                  onChange={handleNameOfEvent}
                />
              </div>
              <div className="mb-3">
                <Row>
                  <Col md="4" lg="4">
                    <label
                      htmlFor="date"
                      className="form-label modal-body-label"
                    >
                      Date
                    </label>
                    <input
                      id="dateOfEvent"
                      name="dateOfEvent"
                      type="date"
                      className="form-control shadow-none modal-body-input"
                      value={dateOfEvent}
                      onChange={handleDateOfEvent}
                    />
                  </Col>
                  <Col md="4" lg="4">
                    <label
                      htmlFor="time"
                      className="form-label modal-body-label"
                    >
                      Time
                    </label>
                    <input
                      id="timeOfEvent"
                      name="time"
                      type="time"
                      className="form-control shadow-none modal-body-input"
                      value={timeOfEvent}
                      onChange={handleTimeOfEvent}
                    />
                  </Col>
                  <Col md="4" lg="4">
                    <label
                      htmlFor="place"
                      className="form-label modal-body-label"
                    >
                      Place
                    </label>
                    <input
                      id="place"
                      name="place"
                      type="text"
                      className="form-control shadow-none modal-body-input"
                      value={placeOfEvent}
                      onChange={handlePlaceOfEvent}
                    />
                  </Col>
                </Row>
              </div>
              <div className="mb-3">
                <input
                  type="checkbox"
                  className="form-check-input text-primary shadow-none"
                  checked={recurringEvent}
                  onChange={() => {
                    setRecurringEvent(!recurringEvent);
                  }}
                />{" "}
                <label className="form-check-label">
                  Is this recurring event?
                </label>
              </div>
              {recurringEvent && (
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
              )}
              {selectedValue === "custom" ? (
                <div className="custom-event-container p-3">
                  <h5 className="modal-body-label py-2">Custom Reccurance</h5>
                  <div className="d-flex align-items-center mb-3">
                    <label className="form-label me-2 mb-0">Repeat every</label>
                    <input
                      className="count shadow-none me-2 mb-0"
                      type="number"
                      name="count"
                      id="count"
                      min="1"
                      max={
                        selectedRepeatValue === "day"
                          ? leapYear(new Date(dateOfEvent).getFullYear())
                            ? 366
                            : 365
                          : selectedRepeatValue === "week"
                          ? 52
                          : 12
                      }
                      value={count}
                      onChange={handleCountChange}
                    />
                    <div className="d-flex flex-column align-self-start me-2 mt-1">
                      <i
                        className="bi bi-chevron-up fa-xs text-primary mb-1"
                        onClick={() => {
                          setCount(count + 1);
                        }}
                      ></i>
                      <i
                        disabled={count === 1}
                        className={`${
                          count === 1 ? "disabled" : null
                        } bi bi-chevron-down fa-xs text-primary`}
                        onClick={() => {
                          if (count > 1) {
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
                            {count === 1 ||
                            count === null ||
                            count === undefined ||
                            count === ""
                              ? option.label[0]
                              : option.label[1]}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {selectedRepeatValue === "week" && (
                    <>
                      <label className="form-label">Repeat On</label>
                      <div className="d-flex justify-content-evenly">
                        {options.map((day, index) => (
                          <span
                            style={{
                              height: 20,
                              width: 20,
                              backgroundColor:
                                day.selected.toString() === "true"
                                  ? "#F26E24"
                                  : "#dee2e6",
                              color:
                                day.selected.toString() === "true"
                                  ? "#ffffff"
                                  : "inherit",
                            }}
                            className="text-center rounded-circle d-flex align-items-center 
                        justify-content-center text-black p-3"
                            onClick={() => {
                              // setChangeBgColor(true);
                              onSelectItem(index, day.value);
                            }}
                          >
                            <span
                              style={{
                                backgroundColor:
                                  day.selected.toString() === "true"
                                    ? "#F26E24"
                                    : "#dee2e6",
                                color:
                                  day.selected.toString() === "true"
                                    ? "#ffffff"
                                    : "inherit",
                              }}
                            >
                              {day.label}
                            </span>
                          </span>
                        ))}
                      </div>
                    </>
                  )}
                  {selectedRepeatValue === "month" && (
                    <div className="mb-3">
                      <select
                        id="exampleSelect"
                        name="exampleSelect"
                        className="form-select shadow-none w-50"
                        value={selectedRepeatMonthlyValue}
                        onChange={handleRepeatMonthlyValueChange}
                      >
                        {repeatMontlyOptions.map((option) => (
                          <option append-to="body" value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  <div className="my-3">
                    <label className="form-label">Ends</label>
                    <div className="form-check">
                      <input
                        className="form-check-input shadow-none"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                        value="never"
                        checked={selectedRadioOption === "never"}
                        onChange={handleRadioChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault1"
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
                        value="endsOn"
                        checked={selectedRadioOption === "endsOn"}
                        onChange={handleRadioChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault2"
                      >
                        On
                      </label>
                      <input
                        id="endDate"
                        name="endDate"
                        type="date"
                        disabled={selectedRadioOption === "never"}
                        className="form-control shadow-none modal-body-input w-50"
                        style={{ position: "absolute", right: 100, bottom: 42 }}
                        value={endDate}
                        onChange={handleEndDate}
                      />
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
