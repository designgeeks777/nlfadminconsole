import {
  Button,
  Col,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Modal,
  Row,
} from "reactstrap";
import ProjectTables from "../../components/dashboard/ProjectTable";
import ComponentModal from "../../components/ComponentModal";
import { useContext, useEffect, useRef, useState } from "react";
import { BASEURL } from "../../APIKey";
import axios from "axios";
import Alerts from "./Alerts";
import { LoaderContext } from "../../LoaderContext";

const tableColumns = [
  { path: "datePosted", name: "Posted On" },
  { path: "prayerPoint", name: "Prayer Point" },
  { path: "action", name: "Delete" },
];

const ChurchPrayers = () => {
  const url = `${BASEURL}churchprayers/`;
  const [tableData, setTableData] = useState([]);
  const maxWords = useRef(0);
  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState({
    isOpen: false,
    type: "",
    message: "",
  });
  const [newPrayer, setNewPrayer] = useState({
    datePosted: "",
    prayerPoint: "",
  });
  const { isLoading, setIsLoading } = useContext(LoaderContext);

  useEffect(() => {
    const source = axios.CancelToken.source();
    setIsLoading(true);
    const loadData = async () => {
      try {
        const response = await axios.get(url, {
          cancelToken: source.token,
        });
        var data = [];
        data = response.data;
        data.forEach((object) => {
          object["action"] = "delete";
        });
        setTableData(data.reverse());
        setIsLoading(false);
        // console.log("Response", data);
      } catch (error) {
        setIsLoading(false);
        if (axios.isCancel(error)) {
          console.log("Request canceled");
        } else {
          console.error(error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadData();

    const intervalId = setInterval(loadData, 6000);

    return () => {
      clearInterval(intervalId);
      source.cancel("Component unmounted");
    };
  }, [url]);

  const toggle = () => {
    setShow(!show);
    maxWords.current = 0;
    setNewPrayer({ prayerPoint: "" });
  };

  const handleCallback = (showChild, childData, isLoading, setIssLoading) => {
    setIsLoading(true);
    // Delete the record.
    axios
      .delete(url + childData._id)
      .then((res) => {
        // setTimeout(() => {
        // setIsLoading(false);
        setShowAlert({
          ...showAlert,
          isOpen: true,
          type: "success",
          message: "Deleted successfully",
        });
        // }, 3000);

        setTimeout(() => {
          setShowAlert({ isOpen: false, type: "", message: "" });
        }, 3000);
      })
      .catch((error) => {
        setIsLoading(false);
        setShowAlert({
          ...showAlert,
          isOpen: true,
          type: "danger",
          message: error.message,
        });
        setTimeout(() => {
          setShowAlert({ isOpen: false, type: "", message: "" });
        }, 3000);
        console.error(error);
      });
    // console.log("handleCallback", showChild, childData);
  };

  //get current date and add
  const currentDate = new Date();
  const day = currentDate.getDate().toString().padStart(2, "0");
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // add 1 to get the correct month since January is 0
  const year = currentDate.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;

  const onAddPrayer = () => {
    setIsLoading(true);
    setShow(false);
    const postbody = {
      prayerPoint: newPrayer.prayerPoint.trim(),
      datePosted: formattedDate,
    };
    // console.log("Post body:", postbody);
    axios
      .post(url, postbody)
      .then(() => {
        // setShow(false);
        // setIsLoading(false);
        setNewPrayer({ prayerPoint: "" });
        maxWords.current = 0;
        setShowAlert({
          ...showAlert,
          isOpen: true,
          type: "success",
          message: "Added prayer successfully",
        });

        setTimeout(() => {
          setShowAlert({ isOpen: false, type: "", message: "" });
        }, 3000);
      })
      .catch((err) => {
        setIsLoading(false);
        setShowAlert({
          ...showAlert,
          isOpen: true,
          type: "danger",
          message: err.message,
        });
        setTimeout(() => {
          setShowAlert({ isOpen: false, type: "", message: "" });
        }, 3000);
        console.error("POST Error:", err);
      });
  };

  const handleChange = (event) => {
    setNewPrayer({ ...newPrayer, prayerPoint: event.target.value });
    const arr = newPrayer.prayerPoint.split(" ");
    // const filtered = arr.filter((element) => element !== "");
    // maxWords.current = arr.filter((element) => element !== "").length;
    maxWords.current = newPrayer.prayerPoint.trim().split(/\s+/).length;
    console.log("handleChange", maxWords.current);
  };

  return (
    <div>
      <div className="d-flex flex-column mb-3">
        {showAlert.isOpen && (
          <Alerts
            props={{
              isOpen: showAlert.isOpen,
              type: showAlert.type,
              message: showAlert.message,
            }}
          />
        )}
        <div className="p-2 align-self-end">
          <Button
            className="btn buttons"
            color="primary"
            onClick={() => {
              setShow(true);
            }}
          >
            Add Prayer
          </Button>
          {show ? (
            <ComponentModal
              show={show}
              toggle={toggle}
              title="Add Prayer"
              submitButtonTitle="Add"
              cancelButtonTitle="Cancel"
              submitButtonClick={() => onAddPrayer()}
              cancelButtonClick={toggle}
              disabled={newPrayer.prayerPoint === "" || maxWords.current > 12}
            >
              <FormGroup>
                <Label for="prayerPoint" size="md" className="modal-body-label">
                  Prayer Point{" "}
                  <Label
                    for="prayerPoint"
                    size="sm"
                    className="modal-body-info-label"
                  >
                    (Maximum 12 words.Please keep it short and simple)
                  </Label>
                </Label>
                <Input
                  id="prayerPoint"
                  name="prayerPoint"
                  type="textarea"
                  rows={5}
                  invalid={maxWords.current > 12}
                  className="modal-body-textarea shadow-none"
                  value={newPrayer.prayerPoint}
                  onChange={handleChange}
                />
                <FormFeedback>Prayer can be of maximum 12 words</FormFeedback>
              </FormGroup>
            </ComponentModal>
          ) : null}
        </div>
        <div className="p-2">
          <Row>
            <Col lg="12">
              <ProjectTables
                title="Church Prayers"
                tableData={tableData}
                tableColumns={tableColumns}
                parentCallback={handleCallback}
              />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default ChurchPrayers;
