import { Col, Row } from "reactstrap";
import TopCards from "../components/dashboard/TopCards";
import Users from "./ui/Users";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { BASEURL } from "../APIKey";
import { AuthenticationContext } from "../services/AuthService";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [joiningRequests, setJoininingRequests] = useState(0);
  const [users, setUsers] = useState(0);
  const [guests, setGuests] = useState(0);
  const lifeGroupsUrl = `${BASEURL}getLifeGroupsCount/`;
  const usersUrl = `${BASEURL}getUsersCount/`;
  const guestsUrl = `${BASEURL}guests/`;
  const { user } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const lifeGroupsResponse = await axios.get(lifeGroupsUrl);
        setJoininingRequests(lifeGroupsResponse.data);
        const usersResponse = await axios.get(usersUrl);
        setUsers(usersResponse.data);
        const guestsResponse = await axios.get(guestsUrl);
        if (guestsResponse.data.length > 0) {
          setGuests(guestsResponse.data.length);
        } else {
          setGuests(0);
        }
      } catch (error) {
        console.error(error);
      }
    };
    loadData();
  }, [usersUrl, lifeGroupsUrl, guestsUrl]);

  return (
    <div>
      <Row>
        <Col sm="6" lg="4">
          <TopCards
            bg="bg-light-warning text-warning"
            title="Guests"
            subtitle="Guests"
            count={guests}
            routeName="/guestCounter"
          />
        </Col>
        <Col sm="6" lg="4">
          <TopCards
            bg="bg-light-danger text-danger"
            title="Users"
            subtitle="Users"
            count={users}
            routeName="/"
          />
        </Col>
        <Col sm="6" lg="4">
          <TopCards
            bg="bg-light-success text-success"
            title="New Life Group Requests"
            subtitle="New Life Group Requests"
            count={joiningRequests}
            routeName="/lifeGroups"
          />
        </Col>
      </Row>

      <Users />
    </div>
  );
};

export default Dashboard;
