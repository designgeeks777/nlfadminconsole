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
    setIsLoading(true);
    const loadData = async () => {
      try {
        const usersResponse = await axios.get(usersUrl);
        var modifiedUserData = [];
        var resultData = [];
        modifiedUserData = usersResponse.data.map((user) => {
          const { name, profilePic, uid } = user;
          return { name, profilePic, uid };
        });
        // console.log("modifiedUserData", modifiedUserData);
        const prayerRequestsResponse = await axios.get(prayerRequestsUrl);
        resultData = prayerRequestsResponse.data.map((d) => {
          return {
            ...d,
            user: modifiedUserData.filter(({ uid }) => d.raisedByUid === uid),
          };
        });
        setTableData(resultData.reverse());
        setIsLoading(false);
        console.log(resultData);
      } catch (error) {
        setIsLoading(false);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [usersUrl, prayerRequestsUrl]);

  return (
    <div>
      <ProjectTables
        title="Prayer Requests"
        tableData={tableData}
        tableColumns={tableColumns}
        fromPrayerRequestPage={true}
      />
    </div>
  );
};

export default PrayerRequests;
