import axios from "axios";
import React, { useContext, useRef, useState } from "react";
import Slider from "react-slick";
import { Card, CardTitle, CardText, Button, Spinner } from "reactstrap";
import { BASEURL } from "../../../APIKey";
import { LoaderContext } from "../../../LoaderContext";
import { errorMsgs, successMsgs } from "../../../constants";
import Alerts from "../Alerts";

const JoiningRequests = ({ joiningRequestsArray, lifeGroup, loadData }) => {
  const { isLoading, setIsLoading } = useContext(LoaderContext);
  const [load, setLoad] = useState(false);
  const [showAlert, setShowAlert] = useState({
    isOpen: false,
    type: "",
    message: "",
  });
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  //accept joining request
  const acceptJoiningRequest = (item, i) => {
    setIsLoading(true);
    setLoad(true);
    joiningRequestsArray = joiningRequestsArray.filter((obj) => {
      return obj.uid !== item.uid;
    });
    let selectedLifeGroup = lifeGroup.find((lg) => lg._id === item._id);
    const lifeGroupUrl = `${BASEURL}lifeGroups/${item._id}`;

    let membersData = {
      uid: item.uid,
      name: item.name,
      mobileNumber: item.mobileNumber,
    };

    let joiningRequests = selectedLifeGroup.joiningRequests;
    joiningRequests = selectedLifeGroup.joiningRequests.map((obj) => {
      if (obj.uid === item.uid) {
        obj["accepted"] = "true";
      }
      return obj;
    });

    let members = selectedLifeGroup.members;
    members.push(membersData);

    let updateBody;
    updateBody = { joiningRequests, members };
    axios
      .patch(lifeGroupUrl, updateBody)
      .then(() => {
        loadData();
        // setIsLoading(true);
        if (isLoading.toString() === "false") {
          setLoad(false);
          item.show = false;
        }
        setShowAlert({
          ...showAlert,
          isOpen: true,
          type: "success",
          message: successMsgs.accept,
        });
        setTimeout(() => {
          setShowAlert({ isOpen: false, type: "", message: "" });
        }, 2000);
      })
      .catch((err) => {
        setIsLoading(false);
        setLoad(false);
        item.show = false;
        console.error(err);
        setShowAlert({
          ...showAlert,
          isOpen: true,
          type: "danger",
          message: errorMsgs.accept,
        });
        setTimeout(() => {
          setShowAlert({ isOpen: false, type: "", message: "" });
        }, 2000);
      });
  };

  //decline joining request
  const declineJoiningRequest = (item, i) => {
    setLoad(true);
    joiningRequestsArray = joiningRequestsArray.filter((obj) => {
      return obj.uid !== item.uid;
    });
    let selectedLifeGroup = lifeGroup.find((lg) => lg._id === item._id);
    const lifeGroupUrl = `${BASEURL}lifeGroups/${item._id}`;

    let joiningRequests = selectedLifeGroup.joiningRequests.filter((obj) => {
      return obj.uid !== item.uid;
    });
    let updateBody;
    updateBody = { joiningRequests };
    axios
      .patch(lifeGroupUrl, updateBody)
      .then(() => {
        loadData();
        setTimeout(() => {
          setLoad(false);
          item.show = false;
        }, 2000);
        setShowAlert({
          ...showAlert,
          isOpen: true,
          type: "success",
          message: successMsgs.decline,
        });
        setTimeout(() => {
          setShowAlert({ isOpen: false, type: "", message: "" });
        }, 2000);
      })
      .catch((err) => {
        setLoad(false);
        item.show = false;
        console.error(err);
        setShowAlert({
          ...showAlert,
          isOpen: true,
          type: "danger",
          message: errorMsgs.decline,
        });
        setTimeout(() => {
          setShowAlert({ isOpen: false, type: "", message: "" });
        }, 2000);
      });
  };

  return (
    <div
      className="px-2 mb-3"
      style={{
        maxWidth: 956 + "px",
        display: "inline-block",
      }}
    >
      {showAlert.isOpen && (
        <Alerts
          props={{
            isOpen: showAlert.isOpen,
            type: showAlert.type,
            message: showAlert.message,
          }}
        />
      )}
      <CardTitle tag="h4" className="text-primary mb-3">
        Joining Requests
      </CardTitle>
      <Slider {...settings}>
        {joiningRequestsArray.map((item, i) => (
          <Card
            key={i}
            body
            color="white"
            className="p-4 slick-card d-flex justify-content-around"
            style={{ height: 313 + "px" }}
          >
            {load ? (
              <div style={{ position: "relative", left: "8%", bottom: "8%" }}>
                <Spinner color="primary" className="table-spinner" />
              </div>
            ) : (
              <>
                <CardTitle tag="h5">{item.place}</CardTitle>
                <CardText className="text-dark fs-6 mb-0">
                  Lead by: {item.leaders}
                </CardText>
                <div>
                  <CardText className="text-primary fw-bold fs-6 mb-0">
                    {item.name}
                  </CardText>
                  <CardText className="text-primary fs-6 mb-0">
                    ({item.mobileNumber})
                  </CardText>
                </div>
                <div className="button-group d-flex justify-content-between">
                  <Button
                    className="btn jrlg-buttons"
                    color="primary"
                    onClick={() => {
                      acceptJoiningRequest(item, i);
                      item.show = true;
                    }}
                  >
                    Accept
                  </Button>
                  <Button
                    className="btn jrlg-buttons"
                    color="secondary"
                    onClick={() => {
                      declineJoiningRequest(item, i);
                      item.show = true;
                    }}
                  >
                    Decline
                  </Button>
                </div>
              </>
            )}
          </Card>
        ))}
      </Slider>
    </div>
  );
};

export default JoiningRequests;
