import { Card, CardBody, CardTitle, Table } from "reactstrap";
import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

const NestedTable = ({ children, id, tableData, title }) => {
  const tableColumnsCount = useRef(0);

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // get table tableColumns
  const tableColumns = Object.keys(tableData[0]);

  useEffect(() => {
    tableColumnsCount.current = tableColumns.length;
  }, [tableColumns.length]);

  // get table heading data
  const thData = () => {
    return tableColumns.map((data) => {
      return (
        <th key={data} className="text-primary nowrap">
          {capitalize(data)}
        </th>
      );
    });
  };

  // get table row data
  const tdData = () => {
    return tableData.map((data, index) => {
      return (
        <tr key={index} className="border-top">
          {tableColumns.map((item) => {
            return <td key={item}>{capitalize(data[item])}</td>;
          })}
        </tr>
      );
    });
  };
  return (
    <Card style={{ borderWidth: 1 }}>
      <CardBody className="p-0">
        <Table className="no-wrap mt-3 align-middle" responsive borderless>
          <thead>
            <tr>{thData()}</tr>
          </thead>
          <tbody>{tdData()}</tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

NestedTable.propTypes = {
  tableData: PropTypes.any,
};

export default NestedTable;
