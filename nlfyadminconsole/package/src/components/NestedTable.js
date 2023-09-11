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
  parentCallback,
}) => {
  // console.log("NESTED TABLE", tableData);
  var filteredTableColumns = [];

  const tableColumnsCount = useRef(0);

  const capitalize = (str) => {
    return str[0].toUpperCase() + str.slice(1);
  };

  const camelToFlat = (c) => {
    c = c.replace(/[A-Z]/g, " $&");
    c = c[0].toUpperCase() + c.slice(1);
    return c;
  };

  // get table tableColumns
  const tableColumns = Object.keys(tableData[0]);
  filteredTableColumns = tableColumns.filter((key) => key !== "uid");
  // console.log("tableColumns", filteredTableColumns);

  useEffect(() => {
    tableColumnsCount.current = filteredTableColumns.length;
  }, [filteredTableColumns.length]);

  // get table heading data
  const thData = () => {
    return filteredTableColumns.map((data) => {
      return (
        <th key={data} className="text-primary nowrap">
          {camelToFlat(data)}
        </th>
      );
    });
  };

  const textElementRef = useRef();
  // const [isHovering, setIsHovering] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // useEffect(() => {
  //   if (fromPrayerRequestPage) {
  //     const compare =
  //       textElementRef.current.scrollWidth > textElementRef.current.clientWidth;
  //     setIsHovering(compare);
  //   }
  // }, [selectedId, fromPrayerRequestPage]);

  // get table row data
  const tdData = () => {
    return tableData.map((data, index) => {
      return (
        <tr key={index} className={`rowSpan=${tableColumnsCount}`}>
          {filteredTableColumns.map((item) => {
            return fromLifeGroupDetailsPage && item === "mobileNumber" ? (
              <td key={item}>
                {data[item]}
                <span
                  className="text-info"
                  onClick={() => {
                    parentCallback(tableData[index]);
                  }}
                >
                  Remove
                </span>
              </td>
            ) : (
              <td key={item}>
                {item === "responseMessage" ? (
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
                            selectedId === index ? "inline-block" : "none",
                          visibility:
                            selectedId === index ? "visible" : "hidden",
                        }}
                      >
                        <span className="tooltiptext p-2">
                          {capitalize(data[item])}
                        </span>
                      </span>
                    </div>
                  </>
                ) : item === "responseBy" ? (
                  capitalize(data[item]["name"])
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
  );
};

NestedTable.propTypes = {
  // tableData: PropTypes.any,
};

export default NestedTable;
