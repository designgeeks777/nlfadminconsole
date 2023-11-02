import { Card } from "reactstrap";
import PropTypes from "prop-types";

const InfoCard = ({ children, cardLabel, editLabel, openModal }) => {
  return (
    <Card className="shadow-none infoCard">
      <div className="d-flex justify-content-between infoCardLabel">
        <label className="fw-bold bg-white">{cardLabel}</label>
        <label
          className="fw-bold bg-white text-info"
          onClick={() => {
            openModal(cardLabel);
          }}
        >
          {editLabel}
        </label>
      </div>
      <div className="infoCardChildren">{children}</div>
    </Card>
  );
};

InfoCard.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

export default InfoCard;
