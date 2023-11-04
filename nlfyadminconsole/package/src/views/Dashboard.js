import { Col, Row } from "reactstrap";
import TopCards from "../components/dashboard/TopCards";
import Users from "./ui/Users";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { BASEURL } from "../APIKey";
import { AuthenticationContext } from "../services/AuthService";
// import { Redirect } from 'react-router-dom';
import { redirect, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [joiningRequests, setJoininingRequests] = useState(0);
  const [users, setUsers] = useState(0);
  const [announcements, setAnnouncements] = useState(0);
  const lifeGroupsUrl = `${BASEURL}getLifeGroupsCount/`;
  const usersUrl = `${BASEURL}getUsersCount/`;
  const announcementsUrl = `${BASEURL}getAnnouncementsCount/`;
  const user = useContext(AuthenticationContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate("/");
    }
  }, [user]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const lifeGroupsResponse = await axios.get(lifeGroupsUrl);
        setJoininingRequests(lifeGroupsResponse.data);
        const announcementsResponse = await axios.get(announcementsUrl);
        setAnnouncements(announcementsResponse.data);
        const usersResponse = await axios.get(usersUrl);
        setUsers(usersResponse.data);
      } catch (error) {
        console.error(error);
      }
    };
    loadData();
  }, [usersUrl, lifeGroupsUrl, announcementsUrl]);

  return (
    <div>
      <Row>
        <Col sm="6" lg="4">
          <TopCards
            bg="bg-light-success text-success"
            title="New Life Group Requests"
            subtitle="New Life Group Requests"
            count={joiningRequests}
            routeName="/lifeGroups"
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
            bg="bg-light-warning text-warning"
            title="Announcements"
            subtitle="Announcements"
            count={announcements}
            routeName="/announcements"
          />
        </Col>
      </Row>

      <Users />
    </div>
  );
};

export default Dashboard;
