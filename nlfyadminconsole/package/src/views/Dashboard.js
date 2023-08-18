import { Col, Row } from "reactstrap";
import SalesChart from "../components/dashboard/SalesChart";
import Feeds from "../components/dashboard/Feeds";
import ProjectTables from "../components/dashboard/ProjectTable";
import TopCards from "../components/dashboard/TopCards";
import Blog from "../components/dashboard/Blog";
import bg1 from "../assets/images/bg/bg1.jpg";
import bg2 from "../assets/images/bg/bg2.jpg";
import bg3 from "../assets/images/bg/bg3.jpg";
import bg4 from "../assets/images/bg/bg4.jpg";
import user1 from "../assets/images/users/user1.jpg";
import user2 from "../assets/images/users/user2.jpg";
import user3 from "../assets/images/users/user3.jpg";
import user4 from "../assets/images/users/user4.jpg";
import user5 from "../assets/images/users/user5.jpg";

const BlogData = [
  {
    image: bg1,
    title: "This is simple blog",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
  {
    image: bg2,
    title: "Lets be simple blog",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
  {
    image: bg3,
    title: "Don't Lamp blog",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
  {
    image: bg4,
    title: "Simple is beautiful",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
];
const tableData = [
  {
    user: [user4, "Han Gover"],
    phoneNumber: "+919986169736",
    gender: "male",
  },
  {
    user: [user1, "Hanna"],
    phoneNumber: "+919986169736",
    gender: "female",
  },
  {
    user: [user5, "Han Gover"],
    phoneNumber: "+919986169736",
    gender: "male",
  },
  {
    user: [user3, "Hanna"],
    phoneNumber: "+919986169736",
    gender: "female",
  },
  {
    user: [user4, "Han Gover"],
    phoneNumber: "+919986169736",
    gender: "male",
  },
  {
    user: [user3, "Hanna"],
    phoneNumber: "+919986169736",
    gender: "female",
  },
  {
    user: [user2, "Han Gover"],
    phoneNumber: "+919986169736",
    gender: "male",
  },
  {
    user: [user3, "Hanna"],
    phoneNumber: "+919986169736",
    gender: "female",
  },
  {
    user: [user5, "Han Gover"],
    phoneNumber: "+919986169736",
    gender: "male",
  },
  {
    user: [user1, "Hanna"],
    phoneNumber: "+919986169736",
    gender: "female",
  },
  {
    user: [user5, "Han Gover"],
    phoneNumber: "+919986169736",
    gender: "male",
  },
  {
    user: [user1, "Hanna"],
    phoneNumber: "+919986169736",
    gender: "female",
  },
];
const tableColumns = [
  { path: "user", name: "User" },
  { path: "phoneNumber", name: "Phone number" },
  { path: "gender", name: "Gender" },
];
const Dashboard = () => {
  return (
    <div>
      {/***Top Cards***/}
      <Row>
        <Col sm="6" lg="4">
          <TopCards
            bg="bg-light-success text-success"
            title="New Life Group Requests"
            subtitle="New Life Group Requests"
            count="3"
          />
        </Col>
        <Col sm="6" lg="4">
          <TopCards
            bg="bg-light-danger text-danger"
            title="Users"
            subtitle="Users"
            count="60"
          />
        </Col>
        <Col sm="6" lg="4">
          <TopCards
            bg="bg-light-warning text-warning"
            title="Announcements"
            subtitle="Announcements"
            count="30"
          />
        </Col>
      </Row>

      {/***Table ***/}
      <Row>
        <Col lg="12">
          <ProjectTables
            id="id"
            title="Users List"
            tableData={tableData}
            tableColumns={tableColumns}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
