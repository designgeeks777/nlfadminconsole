import { Card, CardBody, CardTitle, Table } from "reactstrap";
import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

const NestedTable = ({
  children,
  id,
  tableData,
  title,
  fromLifeGroupDetailsPage,
  fromPrayerRequestPage,
}) => {
  // console.log(tableData, "from lgd");
  const tableColumnsCount = useRef(0);

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // get table tableColumns
  const tableColumns = Object.keys(tableData[0]);
  const obj = tableColumns.reduce(
    (o, key) => ({ ...o, [key]: capitalize(key) }),
    {}
  );
  // console.log("OBJECT >>>", obj);

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

  const textElementRef = useRef();
  const [isHovering, setIsHovering] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    if (fromPrayerRequestPage) {
      const compare =
        textElementRef.current.scrollWidth > textElementRef.current.clientWidth;
      setIsHovering(compare);
    }
  }, [selectedId, fromPrayerRequestPage]);

  // get table row data
  const tdData = () => {
    return tableData.map((data, index) => {
      return (
        <tr key={index} className={`rowSpan=${tableColumnsCount}`}>
          {tableColumns.map((item) => {
            return fromLifeGroupDetailsPage && item === "phoneNumber" ? (
              <td key={item}>
                {capitalize(data[item])}
                <span className="text-info">Remove</span>
              </td>
            ) : (
              <td key={item}>
                {item === "response" ? (
                  <>
                    <div
                      className="tooltip-container"
                      ref={textElementRef}
                      onMouseOver={() => {
                        setSelectedId(index);
                      }}
                      onMouseOut={() => {
                        setSelectedId(null);
                      }}
                    >
                      {capitalize(data[item])}
                      <span
                        className="custom-tooltip"
                        style={{
                          display:
                            selectedId === index && isHovering
                              ? "inline-block"
                              : "none",
                          visibility:
                            selectedId === index && isHovering
                              ? "visible"
                              : "hidden",
                        }}
                      >
                        <span className="tooltiptext p-2">
                          {capitalize(data[item])}
                        </span>
                      </span>
                    </div>
                  </>
                ) : (
                  <>{capitalize(data[item])}</>
                )}
              </td>
            );
          })}
        </tr>
      );
    });
  };

  return (
    // <Card className="shadow-none custom-table-card">
    //   <CardBody className="p-0">
    <Table
      className={`no-wrap my-0 align-middle custom-table ${
        fromLifeGroupDetailsPage ? "w-50" : ""
      }`}
      responsive
      borderless
    >
      <thead>
        <tr>{thData()}</tr>
      </thead>
      <tbody>{tdData()}</tbody>
    </Table>
    //   </CardBody>
    // </Card>
  );
};

NestedTable.propTypes = {
  tableData: PropTypes.any,
};

export default NestedTable;
