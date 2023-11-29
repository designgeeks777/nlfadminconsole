import { Link } from "react-router-dom";
import { Card, CardBody } from "reactstrap";

const TopCards = (props) => {
  return (
    <Link
      className="topcards-link"
      to={`${props.routeName}`}
      style={{
        pointerEvents: `${props.routeName}` === "/" ? "none" : "visible",
      }}
    >
      <Card>
        <CardBody>
          <div className="ms-3 p-4 text-center">
            <h1 className="mb-0 font-weight-bold ">{props.count}</h1>
            <small className="text-muted">{props.title}</small>
          </div>
        </CardBody>
      </Card>
    </Link>
  );
};

export default TopCards;
