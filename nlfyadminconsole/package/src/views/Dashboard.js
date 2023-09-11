import { Col, Row } from "reactstrap";
import TopCards from "../components/dashboard/TopCards";
import Users from "./ui/Users";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASEURL } from "../APIKey";

const Dashboard = () => {
  const [joiningRequests, setJoininingRequests] = useState(0);
  const [users, setUsers] = useState(0);
  const [announcements, setAnnouncements] = useState(0);
  const lifeGroupsUrl = `${BASEURL}getLifeGroupsCount/`;
  const usersUrl = `${BASEURL}getUsersCount/`;
  const announcementsUrl = `${BASEURL}getAnnouncementsCount/`;

  useEffect(() => {
    const source = axios.CancelToken.source();
    const loadData = async () => {
      try {
        axios
          .get(lifeGroupsUrl, {
            cancelToken: source.token,
          })
          .then((response) => {
            setJoininingRequests(response.data);
          })
          .catch((error) => console.log(error));
        axios
          .get(announcementsUrl, {
            cancelToken: source.token,
          })
          .then((response) => {
            setAnnouncements(response.data);
          })
          .catch((error) => console.log(error));
        axios
          .get(usersUrl, {
            cancelToken: source.token,
          })
          .then((response) => {
            setUsers(response.data);
          })
          .catch((error) => console.log(error));
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled");
        } else {
          console.error(error);
        }
      }
    };
    loadData();

    const intervalId = setInterval(loadData, 60000);

    return () => {
      clearInterval(intervalId);
      source.cancel("Component unmounted");
    };
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
