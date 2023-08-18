import { Button, Col, Input, Modal, Row } from "reactstrap";
import ProjectTables from "../../components/dashboard/ProjectTable";
import ComponentModal from "../../components/ComponentModal";
import { useState } from "react";

const tableData = [
  {
    date: "03/09/2022",
    title:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis n",
    announcement:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis n",
  },
  {
    date: "21/10/2022",
    title:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis n",
    announcement:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis n”",
  },
  {
    date: "23/11/2022",
    title:
      "orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis n",
    announcement:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis n",
  },
  {
    date: "23/11/2022",
    title:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis n",
    announcement:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis n”",
  },
  {
    date: "23/11/2022",
    title:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis n",
    announcement:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis n",
  },
  {
    date: "20/12/2022",
    title:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis n",
    announcement:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis n”",
  },
];

const tableColumns = [
  { path: "date", name: "Announced On" },
  { path: "title", name: "Title" },
  { path: "announcement", name: "Announcement" },
];

const Announcements = () => {
  const [state, setState] = useState(false);
  const toggle = () => {
    setState(!state);
  };
  return (
    <div>
      <div className="d-flex flex-column mb-3">
        <div className="p-2 align-self-end">
          <Button
            className="btn"
            color="primary"
            size="lg"
            onClick={() => {
              setState(true);
            }}
          >
            Announce Now
          </Button>
          {state ? (
            <ComponentModal
              state={state}
              toggle={toggle}
              title="Announce"
              submitButtonTitle="Announce"
              cancelButtonTitle="Cancel"
            >
              <div className="mb-3">
                <label for="Title" className="form-label modal-body-label">
                  Title
                  <label className="form-label modal-body-info-label">
                    (Maximum 10 words)
                  </label>
                </label>
                <input
                  type="text"
                  className="form-control modal-body-input shadow-none"
                  id="Title"
                  placeholder=""
                />
              </div>
              <div className="mb-3">
                <label for="textarea" className="form-label modal-body-label">
                  Announcement Message
                </label>
                <textarea
                  className="form-control modal-body-textarea shadow-none"
                  id="textarea"
                  rows="5"
                ></textarea>
              </div>
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
