import { Button, Card, CardBody, CardTitle, Col, Row } from "reactstrap";
import Tabs from "../../../components/Tabs";
import { useContext, useEffect, useState } from "react";
import ProjectTables from "../../../components/dashboard/ProjectTable";
import { LoaderContext } from "../../../LoaderContext";
import axios from "axios";
import { BASEURL } from "../../../APIKey";
import Alerts from "../Alerts";

const tableColumns = [
  { path: "date", name: "Follow-up Date" },
  { path: "followedupby", name: "Followed-up By" },
  { path: "note", name: "Follow-up Message" },
];

const GuestCounterDetails = () => {
  const [show, setShow] = useState(false);
  const { isLoading, setIsLoading } = useContext(LoaderContext);
  const [guestData, setGuestData] = useState([]);
  const [tableData, setTableData] = useState([]);

  const url = `${BASEURL}guests/65433e146392cbd2128dba31`;

  const loadData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(url);
      var data = [];
      var followupnotes = [];
      data = response.data;
      setGuestData(data);
      followupnotes = data.followupnotes;
      setTableData(followupnotes.reverse());
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const [showAlert, setShowAlert] = useState({
    isOpen: false,
    type: "",
    message: "",
  });
  useEffect(() => {
    loadData();
  }, [url]);

  const handleCallback = (tabSelected) => {
    if (tabSelected === "tab3") {
      setShow(true);
    } else {
      setShow(false);
    }
  };
  const handleTabsCallback = (isLoaddata, alertMsg) => {
    if (isLoaddata) {
      loadData();
    }
    setShowAlert({
      isOpen: alertMsg.isOpen,
      type: alertMsg.type,
      message: alertMsg.message,
    });
    console.log(showAlert);
    setTimeout(() => {
      setShowAlert({ isOpen: false, type: "", message: "" });
    }, 2000);
  };
  return (
    <>
      {showAlert.isOpen && (
        <Alerts
          props={{
            isOpen: showAlert.isOpen,
            type: showAlert.type,
            message: showAlert.message,
          }}
        />
      )}
      <div className="d-flex mb-3 align-items-center justify-content-between">
        <h4 className="text-primary mb-0">Guest Counter </h4>
        {!show && <Button className="btn buttons">Remove Guest</Button>}
      </div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">
            {guestData?.firstname} {guestData?.lastname}
          </CardTitle>
          <Tabs
            // tabs={tabHeadings}
            guestData={guestData}
            parentCallback={handleCallback}
            parentTabsCallback={handleTabsCallback}
          />
        </CardBody>
      </Card>
      {show ? (
        <div className="p-2">
          <Row>
            <Col lg="12">
              <ProjectTables
                title="Previous follow-ups"
                tableData={tableData}
                tableColumns={tableColumns}
              />
            </Col>
          </Row>
        </div>
      ) : null}
    </>
  );
};
export default GuestCounterDetails;
