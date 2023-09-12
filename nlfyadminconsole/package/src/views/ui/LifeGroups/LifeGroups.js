import { Button, Col, Row } from "reactstrap";
import ProjectTables from "../../../components/dashboard/ProjectTable";
import { useEffect, useState } from "react";
import JoiningRequests from "./JoiningRequests";
import axios from "axios";
import { BASEURL } from "../../../APIKey";
import { useNavigate } from "react-router-dom";

const tableColumns = [
  { path: "place", name: "Location" },
  { path: "leaders", name: "Leaders" },
  { path: "members", name: "Members" },
  { path: "action", name: "Edit/Delete" },
];

const LifeGroups = () => {
  const [tableData, setTableData] = useState([]);
  const url = `${BASEURL}lifeGroups/`;
  let navigate = useNavigate();
  const [joiningRequestsData, setJoiningRequestsData] = useState([]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const loadData = async () => {
      try {
        const response = await axios.get(url, {
          cancelToken: source.token,
        });
        var data = [];
        data = JSON.parse(JSON.stringify(response.data));
        data.forEach((object) => {
          object["action"] = "edit/delete";
        });
        setTableData(data.reverse());

        //for Joining Requests
        var joiningRequestData = [];
        var joiningRequests = [];
        joiningRequestData = JSON.parse(JSON.stringify(response.data));
        joiningRequestData.forEach((object) =>
          object.joiningRequests.forEach((JRobject) => {
            if (JRobject.accepted === "false") {
              JRobject["_id"] = object._id;
              JRobject["leaders"] = object.leaders;
              JRobject["place"] = object.place;
              joiningRequests.push(JRobject);
            }
          })
        );
        setJoiningRequestsData(joiningRequests.reverse());
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

  const handleCallback = (showChild, selectedLifeGroupData) => {
    // Update the data and show LifeGroupDetails component.
    navigate(`/lifeGroupsDetails/${selectedLifeGroupData.place}`, {
      state: { selectedLifeGroupData },
    });
  };
  return (
    <>
      <div className="d-flex flex-column mb-3">
        <>
          <JoiningRequests
            joiningRequestsArray={joiningRequestsData}
            lifeGroup={tableData}
          />
          <div className="p-2 mb-3 align-self-end">
            <Button
              className="btn buttons"
              color="primary"
              onClick={() => {
                // setAddLifeGroup(true);
                navigate("/addLifeGroup");
              }}
            >
              <i className="bi bi-plus fa-lg"></i> Add Life Group
            </Button>
          </div>
        </>
        <Row>
          <Col lg="12">
            <ProjectTables
              parentCallback={handleCallback}
              title="LifeGroup List"
              tableData={tableData}
              tableColumns={tableColumns}
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default LifeGroups;
