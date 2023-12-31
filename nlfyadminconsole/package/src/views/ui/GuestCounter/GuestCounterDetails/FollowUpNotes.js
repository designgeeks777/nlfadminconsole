import React, { useContext, useRef, useState } from "react";
import { Col, Input, Label, Row, Button, FormFeedback } from "reactstrap";
import { BASEURL } from "../../../../APIKey";
import { LoaderContext } from "../../../../LoaderContext";
import axios from "axios";
import { errorMsgs, successMsgs } from "../../../../constants";
import { AuthenticationContext } from "../../../../services/AuthService";

const FollowUpNotes = ({ guestData, handleTabsCallback }) => {
  const { user } = useContext(AuthenticationContext);
  const url = `${BASEURL}guests/${guestData._id}`;
  const [followup, setFollowup] = useState({
    followUpDate: "",
    followedBy: user?.firstName,
    followUpMsg: "",
  });
  const { isLoading, setIsLoading } = useContext(LoaderContext);
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
    let showAlert = {};
    setIsLoading(true);
    let follownotes = guestData.followupnotes.map((obj) => {
      const [day, month, year] = obj.date.split("/");
      let followupNoteDate = new Date(year, month - 1, day);
      obj.date = obj.date.split("/").join("-");
      return { ...obj, date: followupNoteDate };
    });

    //get time when uploaded to show in descending order
    const currentDate = new Date();
    var timeString =
      currentDate.getHours() +
      ":" +
      currentDate.getMinutes() +
      ":" +
      currentDate.getSeconds();
    let formattedDate = new Date(followup.followUpDate + " " + timeString);

    let newFollowupNote = {
      note: followup.followUpMsg.trim(),
      date: formattedDate,
      followedupby: followup.followedBy.trim(), // by default logged in value, editable
      eneterdby: user?.firstName.trim(), // logged in person value,
    };
    follownotes.push(newFollowupNote);

    //sort in descending order wrt to time uploaded
    follownotes = follownotes.sort((a, b) => {
      if (a.date === b.date) {
        return b.date.getTime() - a.date.getTime();
      }
      return b.date - a.date;
    });

    //format date value in followupnotes array
    let followupnotes = follownotes.map((n) => {
      const { note, followedupby, eneterdby } = n;
      return {
        note,
        date: new Date(n.date).toLocaleDateString("en-GB"),
        followedupby,
        eneterdby,
      };
    });

    let updateBody = { followupnotes };
    axios
      .patch(url, updateBody)
      .then(() => {
        setIsLoading(false);
        resetModalData();
        showAlert = {
          isOpen: true,
          type: "success",
          message: `Follow-up note ${successMsgs.add}`,
        };
        handleTabsCallback(true, showAlert);
      })
      .catch((err) => {
        resetModalData();
        showAlert = {
          isOpen: true,
          type: "danger",
          message: errorMsgs.add,
        };
        setIsLoading(false);
        handleTabsCallback(false, showAlert);
        console.error("POST Error:", err, showAlert);
      });
  };
  return (
    <>
      <Row className="p-3">
        <Col sm="4">
          <div className="d-flex flex-column">
            <Label for="followUpDate" className="form-label modal-body-label">
              Follow-up date
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
            <Label
              for="followedBy"
              className="form-label modal-body-label mt-4"
            >
              Who followed up?
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
              Write Follow-up Note
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
    </>
  );
};
export default FollowUpNotes;
