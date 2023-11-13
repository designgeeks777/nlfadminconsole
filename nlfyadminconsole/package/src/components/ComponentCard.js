import { Card, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import PropTypes from 'prop-types';

const ComponentCard = ({ children, title, subtitle }) => {
  return (
    <Card className='shadow-none border-radius mb-3'>
      <CardTitle tag="h3" className="px-4 py-3 mb-1 border-bottom">
        {title}
      </CardTitle>
      <CardBody className="p-4 pt-2">
        <CardSubtitle className="mb-3">{subtitle || ''}</CardSubtitle>
        <div>{children}</div>
      </CardBody>
    </Card>
  );
};

ComponentCard.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  subtitle: PropTypes.string
};

export default ComponentCard;
