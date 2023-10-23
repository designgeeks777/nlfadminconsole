import { Col, Row } from "reactstrap";
import ProjectTables from "../../components/dashboard/ProjectTable";
import axios from "axios";
import { BASEURL } from "../../APIKey";
import { useContext, useEffect, useState } from "react";
import { LoaderContext } from "../../LoaderContext";

const tableColumns = [
  { path: "user", name: "Request By" },
  { path: "requestMessage", name: "Request Message" },
  { path: "responses", name: "Responses" },
  { path: "dateOfPosting", name: "Raised On" },
];

const PrayerRequests = () => {
  const { isLoading, setIsLoading } = useContext(LoaderContext);
  const prayerRequestsUrl = `${BASEURL}prayerRequests/`;
  const usersUrl = `${BASEURL}users/`;
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    var modifiedData = [];
    var resultData = [];
    const source = axios.CancelToken.source();
    setIsLoading(true);
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
          setIsLoading(false);
          console.log(resultData);
        });
        // setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        if (axios.isCancel(error)) {
          console.log("Request canceled");
        } else {
          console.error(error);
        }
      }
      // finally {
      //   setIsLoading(false);
      // }
    };
    loadData();

    const intervalId = setInterval(loadData, 6000);

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
              />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default PrayerRequests;
