import { Card, CardBody, CardTitle, Col, Row } from "reactstrap";
import Tabs from "../../../components/Tabs";
import { useContext, useEffect, useRef, useState } from "react";
import GuestJourney from "./GuestJourney";
import ViewDetails from "./ViewDetails";
import FollowUpNotes from "./FollowUpNotes";
import ProjectTables from "../../../components/dashboard/ProjectTable";
import { LoaderContext } from "../../../LoaderContext";

const tabHeadings = [
  { label: "Journey", value: "tab1", component: <GuestJourney /> },
  { label: "View Details", value: "tab2", component: <ViewDetails /> },
  { label: "Follow-up Notes", value: "tab3", component: <FollowUpNotes /> },
];
const tableColumns = [
  { path: "followUpDate", name: "Follow-up Date" },
  { path: "followedBy", name: "Followed-up By" },
  { path: "followUpMsg", name: "Follow-up Message" },
];

const tableData = [
  {
    followUpDate: "26/11/2023",
    followedBy: "Praveen",
    followUpMsg: "Interesting discussion.",
  },
  {
    followUpDate: "26/11/2023",
    followedBy: "Praveen",
    followUpMsg: "Interesting discussion.",
  },
  {
    followUpDate: "26/11/2023",
    followedBy: "Praveen",
    followUpMsg: "Interesting discussion.",
  },
];

const GuestCounterDetails = () => {
  const guestFirstName = "Anand";
  const guestLastName = "Rao";
  const [show, setShow] = useState(false);
  const { isLoading, setIsLoading } = useContext(LoaderContext);

  useEffect(() => {
    setIsLoading(false);
  });
  const handleCallback = (tabSelected) => {
    if (tabSelected === tabHeadings[2].value) {
      setShow(true);
    } else {
      setShow(false);
    }
  };
  return (
    <>
      <Card>
        <CardBody>
          <CardTitle tag="h5">
            {guestFirstName} {guestLastName}
          </CardTitle>
          <Tabs
            tabs={tabHeadings}
            guestFirstName={guestFirstName}
            parentCallback={handleCallback}
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
