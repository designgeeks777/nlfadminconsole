import axios from "axios";
import React from "react";
import Slider from "react-slick";
import { Card, CardTitle, CardText, Button } from "reactstrap";
import { BASEURL } from "../../../APIKey";

const JoiningRequests = ({ joiningRequestsArray, lifeGroup }) => {
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
  const acceptJoiningRequest = (item, i) => {
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
    // console.log("joiningRequests", joiningRequests);

    let members = selectedLifeGroup.members;
    members.push(membersData);

    let updateBody;
    updateBody = { joiningRequests, members };
    // console.log(updateBody, i);
    axios
      .patch(lifeGroupUrl, updateBody)
      .then((apiresponse) => {
        console.log(apiresponse);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div
      className="px-2 mb-3"
      style={{
        maxWidth: 956 + "px",
        display: "inline-block",
      }}
    >
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
                }}
              >
                Accept
              </Button>
              <Button className="btn jrlg-buttons" color="secondary">
                Decline
              </Button>
            </div>
          </Card>
        ))}
      </Slider>
    </div>
  );
};

export default JoiningRequests;
