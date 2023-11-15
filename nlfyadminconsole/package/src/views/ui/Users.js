import { Col, Row } from "reactstrap";
import ProjectTables from "../../components/dashboard/ProjectTable";
import { useContext, useEffect, useState } from "react";
import { BASEURL } from "../../APIKey";
import axios from "axios";
import { LoaderContext } from "../../LoaderContext";

const tableColumns = [
  { path: "user", name: "User" },
  { path: "mobileNumber", name: "Phone number" },
  { path: "gender", name: "Gender" },
];

const Users = () => {
  const url = `${BASEURL}users/`;
  const [tableData, setTableData] = useState([]);
  const { isLoading, setIsLoading } = useContext(LoaderContext);

  useEffect(() => {
    setIsLoading(true);
    const loadData = async () => {
      try {
        const response = await axios.get(url);
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
        setTableData(resultData.reverse());
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [url]);

  return (
    <ProjectTables
      title="Users"
      tableData={tableData}
      tableColumns={tableColumns}
      fromUsers={true}
    />
  );
};

export default Users;
