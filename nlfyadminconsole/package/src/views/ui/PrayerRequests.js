import { Col, Row } from "reactstrap";
import ProjectTables from "../../components/dashboard/ProjectTable";
import axios from "axios";
import { BASEURL } from "../../APIKey";
import { useEffect, useState } from "react";

const tableColumns = [
  { path: "user", name: "Request By" },
  { path: "requestMessage", name: "Request Message" },
  { path: "responses", name: "Responses" },
  { path: "dateOfPosting", name: "Raised On" },
];

const PrayerRequests = () => {
  const prayerRequestsUrl = `${BASEURL}prayerRequests/`;
  const usersUrl = `${BASEURL}users/`;
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    var modifiedData = [];
    var resultData = [];
    const source = axios.CancelToken.source();
    const loadData = async () => {
      try {
        axios.get(usersUrl).then((response) => {
          modifiedData = response.data.map((user) => {
            const { name, profilePic, uid } = user;
            return { name, profilePic, uid };
          });
          console.log("modifiedData", modifiedData);
        });
        axios.get(prayerRequestsUrl).then((response) => {
          resultData = response.data.map((d) => {
            return {
              ...d,
              user: modifiedData.filter(({ uid }) => d.raisedByUid === uid),
            };
          });
          setTableData(resultData.reverse());
          console.log(resultData);
        });
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
  }, [usersUrl, prayerRequestsUrl]);

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
