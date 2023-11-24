import React from "react";

const LogoutConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  const modalStyle = {
    position: "fixed",
    top: "15%",
    left: "80%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    zIndex: 999, 
    width: "300px", 
  };

  const contentStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const buttonContainerStyle = {
    marginTop: "20px",
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  };

  const buttonStyle = {
    padding: "10px",
    borderRadius: "4px",
    cursor: "pointer",
    border: "none",
    color: "#fff",
    width: "100px", 
  };

  const yesButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#D03925",
  };

  const noButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#D03925",
  };

  return (
    <div style={modalStyle}>
      <div className="modal-content" style={contentStyle}>
        <p>Are you sure you want to logout ?</p>
        <div style={buttonContainerStyle}>
          <button style={yesButtonStyle} onClick={onConfirm}>
            Yes
          </button>
          <button style={noButtonStyle} onClick={onClose}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmationModal;

