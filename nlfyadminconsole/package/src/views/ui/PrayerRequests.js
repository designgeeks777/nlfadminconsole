import { Col, Row } from "reactstrap";
import ProjectTables from "../../components/dashboard/ProjectTable";
import user1 from "../../assets/images/users/user1.jpg";
import user2 from "../../assets/images/users/user2.jpg";
import user4 from "../../assets/images/users/user4.jpg";
import axios from "axios";
import { BASEURL } from "../../APIKey";
import { useEffect, useState } from "react";

const tableDatas = [
  {
    raisedBy: [user2, "Hanna"],
    requestMessage:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis n",
    responses: "0",
    raisedOn: "23/11/2022",
  },
  {
    raisedBy: [user1, "Hanna"],
    requestMessage:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis n",
    responses: [
      "2",
      [
        {
          name: "Ria",
          phoneNumber: "+919986169736",
          response: "Praying",
          date: "23/11/2022",
        },
        // {
        //   name: "Ria",
        //   phoneNumber: "+919986169736",
        //   response: "Praying for you daily, dont worry",
        //   date: "23/11/2022",
        // },
      ],
    ],
    raisedOn: "21/01/2022",
  },
  {
    raisedBy: [user4, "Hanna"],
    requestMessage:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis n",
    responses: [
      "1",
      [
        {
          name: "Ria",
          phoneNumber: "+919986169736",
          response:
            "Praying Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis n",
          date: "23/11/2022",
        },
        {
          name: "Robin",
          phoneNumber: "+919986169736",
          response:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis n",
          date: "23/11/2022",
        },
      ],
    ],
    raisedOn: "02/02/2022",
  },
];

const tableColumns = [
  { path: "raisedBy", name: "Request By" },
  { path: "requestMessage", name: "Request Message" },
  { path: "responses", name: "Responses" },
  { path: "dateOfPosting", name: "Raised On" },
];

const PrayerRequests = () => {
  const url = `${BASEURL}prayerRequests/`;
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        var data = [];
        data = res.data;
        setTableData(data);
        console.log(tableData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div>
      <div className="d-flex flex-column mb-3">
        <div className="p-2">
          <Row>
            <Col lg="12">
              <ProjectTables
                title="Prayer Requests"
                tableData={tableData}
                tableColumns={tableColumns}
                fromPrayerRequestPage={true}
              />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default PrayerRequests;
