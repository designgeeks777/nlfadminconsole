import { Col, Row } from "reactstrap";
import ProjectTables from "../../components/dashboard/ProjectTable";
import { useEffect, useState } from "react";
import { BASEURL } from "../../APIKey";
import axios from "axios";

const tableColumns = [
  { path: "user", name: "User" },
  { path: "mobileNumber", name: "Phone number" },
  { path: "gender", name: "Gender" },
];

const Users = () => {
  const url = `${BASEURL}users/`;
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const loadData = async () => {
      try {
        const response = await axios.get(url, {
          cancelToken: source.token,
        });
        var data = [];
        var modifiedData = [];
        var resultData = [];
        data = response.data;
        modifiedData = data.map((user) => {
          const { name, profilePic, uid } = user;
          return { name, profilePic, uid };
        });
        resultData = data.map((d) => {
          return {
            ...d,
            user: modifiedData.filter(({ uid }) => d.uid === uid),
          };
        });
        // console.log("Mod Data", modifiedData);
        // console.log("final", resultData);
        setTableData(resultData.reverse());
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
                title="Users List"
                tableData={tableData}
                tableColumns={tableColumns}
                fromUsers={true}
              />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Users;
