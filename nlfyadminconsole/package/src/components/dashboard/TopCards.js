import { Card, CardBody } from "reactstrap";

const TopCards = (props) => {
  return (
    <Card>
      <CardBody>
        <div className="ms-3 p-4 text-center">
          <h1 className="mb-0 font-weight-bold ">{props.count}</h1>
          <small className="text-muted">{props.subtitle}</small>
        </div>
      </CardBody>
    </Card>
  );
};

export default TopCards;
