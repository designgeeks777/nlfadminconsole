import { Col, Row } from "reactstrap";
import ProjectTables from "../../components/dashboard/ProjectTable";
import user1 from "../../assets/images/users/user1.jpg";
import user2 from "../../assets/images/users/user2.jpg";
import user4 from "../../assets/images/users/user4.jpg";
import axios from "axios";
import { BASEURL } from "../../APIKey";
import { useEffect, useState } from "react";

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
    const source = axios.CancelToken.source();
    const loadData = async () => {
      try {
        const response = await axios.get(url, {
          cancelToken: source.token,
        });
        var data = [];
        data = response.data;
        setTableData(data.reverse());
        // console.log("PR Response", data);
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
  }, [url]);

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
