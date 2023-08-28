import React from "react";
import Slider from "react-slick";
import { Card, CardTitle, CardText, Button } from "reactstrap";
const joiningRequestsArray = [
  {
    id: 1,
    location: "Amruthahalli",
    leaders: "Anzi & Vegin",
    name: "Ridan",
    phoneNumber: "+91919986169736",
  },
  {
    id: 2,
    location: "Kannur",
    leaders: "Suraj & Rose",
    name: "Ridan",
    phoneNumber: "+91919986169736",
  },
  {
    id: 3,
    location: "Yelahanka",
    leaders: "Anna & Sandeep",
    name: "Ridan",
    phoneNumber: "+91919986169736",
  },
  {
    id: 4,
    location: "Vidyaranyapura",
    leaders: "Anna & Sandeep",
    name: "Ridan",
    phoneNumber: "+91919986169736",
  },
  {
    id: 5,
    location: "Sanjaynagar",
    leaders: "Anna & Sandeep",
    name: "Ridan",
    phoneNumber: "+91919986169736",
  },
];

const JoiningRequests = () => {
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
            <CardTitle tag="h5">{item.location}</CardTitle>
            <CardText className="text-dark fs-6 mb-0">
              Lead by: {item.leaders}
            </CardText>
            <div>
              <CardText className="text-primary fw-bold fs-6 mb-0">
                {item.name}
              </CardText>
              <CardText className="text-primary fs-6 mb-0">
                ({item.phoneNumber})
              </CardText>
            </div>
            <div className="button-group d-flex justify-content-between">
              <Button className="btn jrlg-buttons" color="primary">
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
