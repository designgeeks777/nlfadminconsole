import { Button, Col, Input, Modal, Row } from "reactstrap";
import ProjectTables from "../../components/dashboard/ProjectTable";
import ComponentModal from "../../components/ComponentModal";
import { useState } from "react";

const tableData = [
  {
    date: "12/07/2022",
    prayerPoint:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis n",
    action: "delete",
  },
  {
    date: "23/04/2022",
    prayerPoint:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis n",

    action: "delete",
  },
  {
    date: "21/02/2022",
    prayerPoint:
      "ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis n",
    action: "delete",
  },
  {
    date: "13/08/2022",
    prayerPoint:
      "orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis n",
    action: "delete",
  },
  {
    date: "20/06/2022",
    prayerPoint:
      "Lrem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis n",
    action: "delete",
  },
  {
    date: "02/11/2022",
    prayerPoint:
      "em ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis n",
    action: "delete",
  },
];

const tableColumns = [
  { path: "date", name: "Posted On" },
  { path: "prayerPoint", name: "Prayer Point" },
  { path: "action", name: "Delete" },
];

const ChurchPrayers = () => {
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
            Add Prayer
          </Button>
          {state ? (
            <ComponentModal
              state={state}
              toggle={toggle}
              title="Add Prayer"
              submitButtonTitle="Add"
              cancelButtonTitle="Cancel"
            >
              <div className="mb-3">
                <label
                  for="Title"
                  className="form-label modal-body-label"
                  style={{ fontSize: 14 }}
                >
                  Prayer Point
                  <label className="form-label modal-body-info-label">
                    ( Maximum 12 words.Please keep it short and simple)
                  </label>
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
                title="Church Prayers"
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

export default ChurchPrayers;
