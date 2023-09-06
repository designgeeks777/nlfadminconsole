import {
  Button,
  Col,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import ProjectTables from "../../components/dashboard/ProjectTable";
import ComponentModal from "../../components/ComponentModal";
import { useEffect, useRef, useState } from "react";
import { BASEURL } from "../../APIKey";
import axios from "axios";
import Alerts from "./Alerts";

const tableColumns = [
  { path: "datePosted", name: "Announced On" },
  { path: "title", name: "Title" },
  { path: "announcement", name: "Announcement" },
];

const Announcements = () => {
  const [show, setShow] = useState(false);
  const [tableData, setTableData] = useState([]);
  const maxWords = useRef(0);
  const toggle = () => {
    setShow(!show);
    maxWords.current = 0;
    setNewAnnouncement({ announcement: "" });
  };
  const url = `${BASEURL}announcements/`;
  const [newAnnouncement, setNewAnnouncement] = useState({
    datePosted: "",
    announcement: "",
    title: "",
  });

  const [showAlert, setShowAlert] = useState({
    isOpen: false,
    type: "",
    message: "",
  });

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
        // console.log("Response", data);
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

  //get current date and add
  const currentDate = new Date();
  const day = currentDate.getDate().toString().padStart(2, "0");
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // add 1 to get the correct month since January is 0
  const year = currentDate.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;

  const addAnnounce = () => {
    const postbody = {
      title: newAnnouncement.title.trim(),
      announcement: newAnnouncement.announcement.trim(),
      datePosted: formattedDate,
    };

    axios
      .post(url, postbody, { timeout: 5000 })
      .then(() => {
        setShow(false);
        maxWords.current = 0;
        setNewAnnouncement({ announcement: "", title: "" });
      })
      .catch((err) => {
        console.error("POST Error:", err);
      });
  };

  const handleTitleChange = (event) => {
    setNewAnnouncement({
      ...newAnnouncement,
      title: event.target.value,
    });
    maxWords.current = newAnnouncement.title.trim().split(/\s+/).length;
    console.log("handleChange", maxWords.current);
  };

  const handleMessageChange = (event) => {
    setNewAnnouncement({
      ...newAnnouncement,
      announcement: event.target.value,
    });
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
            Announce Now
          </Button>
          {show ? (
            <ComponentModal
              show={show}
              toggle={toggle}
              title="Announce"
              submitButtonTitle="Announce"
              cancelButtonTitle="Cancel"
              submitButtonClick={() => addAnnounce()}
              cancelButtonClick={toggle}
              disabled={
                newAnnouncement.announcement === "" ||
                newAnnouncement.title === "" ||
                maxWords.current > 10
              }
            >
              <FormGroup>
                <Label
                  for="Title"
                  size="md"
                  className="form-label modal-body-label"
                >
                  Title
                  <Label size="sm" className="form-label modal-body-info-label">
                    (Maximum 10 words)
                  </Label>
                </Label>
                <Input
                  type="text"
                  className="form-control modal-body-input shadow-none"
                  id="Title"
                  placeholder=""
                  invalid={maxWords.current > 10}
                  value={newAnnouncement.title}
                  onChange={handleTitleChange}
                />
                <FormFeedback>Title can be of maximum 10 words</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="textarea" className="form-label modal-body-label">
                  Announcement Message
                </Label>
                <Input
                  type="textarea"
                  name="text"
                  className="form-control modal-body-textarea shadow-none"
                  id="textarea"
                  rows={5}
                  value={newAnnouncement.announcement}
                  onChange={handleMessageChange}
                />
              </FormGroup>
            </ComponentModal>
          ) : null}
        </div>
        <div className="p-2">
          <Row>
            <Col lg="12">
              <ProjectTables
                title="Announcements"
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

export default Announcements;
