import React, { useEffect, useRef, useState } from "react";
import { Col, Input, Label, Row, Button, FormFeedback } from "reactstrap";

const FollowUpNotes = () => {
  const [followup, setFollowup] = useState({
    followUpDate: "",
    followedBy: "",
    followUpMsg: "",
  });
  const maxWords = useRef(0);
  const handleFollowupMsgChange = (event) => {
    setFollowup({ ...followup, followUpMsg: event.target.value });
    maxWords.current = followup?.followUpMsg?.trim().split(/\s+/).length;
  };
  const resetModalData = () => {
    maxWords.current = 0;
    setFollowup({ followUpDate: "", followedBy: "", followUpMsg: "" });
  };
  const onSubmitNote = () => {
    console.log(followup);
  };
  return (
    <Row className="p-3">
      <Col sm="4">
        <div className="d-flex flex-column">
          <Label for="followUpDate" className="form-label modal-body-label">
            Follow-up date{" "}
            <Label for="followUpDate" className="text-danger">
              *
            </Label>
            <Input
              type="date"
              className="form-control modal-body-input shadow-none"
              id="followUpDate"
              name="followUpDate"
              value={followup.followUpDate}
              onChange={(event) =>
                setFollowup({ ...followup, followUpDate: event.target.value })
              }
            />
          </Label>
          <Label for="followedBy" className="form-label modal-body-label mt-4">
            Who followed up?{" "}
            <Label for="followedBy" className="text-danger">
              *
            </Label>
            <Input
              type="text"
              className="form-control modal-body-input shadow-none mb-3"
              id="followedBy"
              name="followedBy"
              placeholder="Ria"
              value={followup.followedBy}
              onChange={(event) =>
                setFollowup({ ...followup, followedBy: event.target.value })
              }
            />
          </Label>
        </div>
      </Col>
      <Col sm="8">
        <div className="d-flex flex-column">
          <Label for="followUpMsg" className="form-label modal-body-label">
            Write Follow-up Note{" "}
            <Label for="followUpMsg" className="text-danger">
              *
            </Label>
            <Input
              type="textarea"
              name="followUpMsg"
              className="form-control modal-body-textarea shadow-none p-3"
              id="followUpMsg"
              rows={4}
              placeholder="Provide a brief summary about your interaction with the guest in about 30-40 words"
              value={followup.followUpMsg}
              invalid={maxWords.current > 40}
              onChange={handleFollowupMsgChange}
            />
            <FormFeedback>
              Follow-up note can be of maximum 40 words
            </FormFeedback>
          </Label>

          <Button
            color="primary"
            className="align-self-end buttons mt-4"
            onClick={onSubmitNote}
            disabled={
              followup.followUpDate === "" ||
              followup.followedBy === "" ||
              followup.followUpMsg === "" ||
              maxWords.current > 40
            }
          >
            Submit Note
          </Button>
        </div>
      </Col>
    </Row>
  );
};
export default FollowUpNotes;
