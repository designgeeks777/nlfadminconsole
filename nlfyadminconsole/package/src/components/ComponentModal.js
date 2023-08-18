import PropTypes from "prop-types";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const ComponentModal = ({
  state,
  toggle,
  children,
  title,
  submitButtonTitle,
  cancelButtonTitle,
}) => {
  return (
    <>
      <div>
        <Modal isOpen={state} toggle={toggle}>
          <ModalHeader toggle={toggle}>{title}</ModalHeader>
          <ModalBody>
            <div>{children}</div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="secondary"
              className="modal-btn-secondary"
              onClick={toggle}
            >
              {cancelButtonTitle}
            </Button>
            <Button
              color="primary"
              className="modal-btn-primary"
              onClick={toggle}
            >
              {submitButtonTitle}
            </Button>{" "}
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
};

ComponentModal.propTypes = {
  state: PropTypes.string,
  toggle: PropTypes.func,
  children: PropTypes.node,
  title: PropTypes.string,
};

export default ComponentModal;
