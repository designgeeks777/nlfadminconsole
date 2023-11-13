import { Button, Card, CardBody, CardTitle, Col, Row } from "reactstrap";
import Tabs from "../../../../components/Tabs";
import { useContext, useEffect, useRef, useState } from "react";
import ProjectTables from "../../../../components/dashboard/ProjectTable";
import { LoaderContext } from "../../../../LoaderContext";
import axios from "axios";
import { BASEURL } from "../../../../APIKey";
import Alerts from "../../Alerts";
import { useLocation, useNavigate } from "react-router-dom";
import { AlertContext } from "../../../../services/AlertService";
import { errorMsgs, successMsgs } from "../../../../constants";

const tableColumns = [
  { path: "date", name: "Follow-up Date" },
  { path: "followedupby", name: "Followed-up By" },
  { path: "note", name: "Follow-up Message" },
];

const GuestCounterDetails = () => {
  const path = useLocation();
  const url = `${BASEURL}guests/${path.state}`;
  const { setIsLoading } = useContext(LoaderContext);
  const [selectedGuestData, setSelectedGuestData] = useState({});
  const { showAlert, setAlert } = useContext(AlertContext);
  const [tableData, setTableData] = useState([]);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  let fname = useRef("");
  let lname = useRef("");

  const loadData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(url);
      var data = [];
      var followupnotes = [];
      data = response.data;
      setSelectedGuestData(data);
      followupnotes = data.followupnotes;
      setTableData(followupnotes.reverse());
      fname.current =
        data.firstname.charAt(0).toUpperCase() + data.firstname.slice(1);
      lname.current =
        data.lastname.charAt(0).toUpperCase() + data.lastname.slice(1);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

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
    setAlert(alertMsg);
  };

  const removeGuest = () => {
    axios
      .delete(url)
      .then(() => {
        navigate("/guestCounter");
        setAlert({
          ...showAlert,
          isOpen: true,
          type: "success",
          message: `Guest ${successMsgs.deleted}`,
        });
      })
      .catch((error) => {
        setAlert({
          ...showAlert,
          isOpen: true,
          type: "danger",
          message: errorMsgs.deleted,
        });
        console.error(error);
      });
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
        {!show && (
          <Button
            className="btn buttons"
            onClick={() => {
              removeGuest();
            }}
          >
            Remove Guest
          </Button>
        )}
      </div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">
            {fname.current} {lname.current}
          </CardTitle>
          <Tabs
            guestData={selectedGuestData}
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
