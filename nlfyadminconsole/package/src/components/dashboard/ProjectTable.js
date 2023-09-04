import {
  Card,
  CardBody,
  CardTitle,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import avatar from "../../assets/images/users/user1.jpg";
import NestedTable from "../NestedTable";
import { useNavigate } from "react-router-dom";

const ProjectTables = ({
  children,
  id,
  parentCallback,
  tableData,
  tableColumns,
  title,
  fromPrayerRequestPage,
}) => {
  const [selectedId, setSelectedId] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 5;
  const pagesCount = Math.ceil(tableData.length / pageSize);
  const tableColumnsCount = useRef(0);
  const handleClick = (e, index) => {
    e.preventDefault();
    setCurrentPage(index);
  };

  // const filePath = user1;
  // const fileUrl = require(filePath);

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // get table tableColumns
  // const tableColumns = Object.keys(tableData[0]);

  useEffect(() => {
    tableColumnsCount.current = tableColumns.length;
  }, [tableColumns.length]);

  // get table heading data
  const thData = (path, name) => {
    return (
      <th
        key={path}
        className="nowrap"
        style={
          tableColumnsCount.current === 4
            ? { width: "25%" }
            : { width: "33.3%" }
        }
      >
        {capitalize(name)}
      </th>
    );
  };

  const onSelectItem = (id) => {
    if (id === selectedId) return setSelectedId(null);
    setSelectedId(id);
  };

  // get table row data
  const tdData = () => {
    return tableData
      .slice(currentPage * pageSize, (currentPage + 1) * pageSize)
      .map((data, index) => {
        return (
          <tr key={index} className="border-top">
            {tableColumns.map(({ path }) => {
              return (
                // <td className="p-2" key={path}>
                <td className="py-3" key={path}>
                  {path === "user" || path === "requestBy" ? (
                    <div className="d-flex align-items-center p-2">
                      <img
                        // src={require(data[path][0])}
                        // src={fileUrl}
                        src={avatar}
                        className="rounded-circle"
                        alt="avatar"
                        width="45"
                        height="45"
                      />
                      <div className="ms-3">
                        <h6 className="mb-0">{capitalize(data[path][1])}</h6>
                      </div>
                    </div>
                  ) : path === "action" ? (
                    <div
                      className="table-actions-button d-flex justify-content-center"
                      size="sm"
                      onClick={() => {
                        parentCallback(true, tableData[index]);
                        console.log("clicked", tableData[index]);
                      }}
                    >
                      {data[path].toUpperCase()}
                    </div>
                  ) : path === "responses" || path === "members" ? (
                    <span className="ps-3">
                      {data[path][0] === "0" ? null : (
                        <i
                          className={`bi ${
                            selectedId === index
                              ? "bi-chevron-down"
                              : "bi-chevron-right"
                          } text-primary`}
                          style={{ paddingRight: 6 }}
                          onClick={() => {
                            onSelectItem(index);
                          }}
                        />
                      )}
                      {data[path][0]}
                      {selectedId === index ? (
                        <NestedTable
                          tableData={data[path][1]}
                          fromPrayerRequestPage={fromPrayerRequestPage}
                        />
                      ) : null}
                    </span>
                  ) : (
                    capitalize(data[path])
                  )}
                </td>
              );
            })}
          </tr>
        );
      });
  };

  return (
    <>
      <Card>
        <CardBody>
          <CardTitle tag="h5">{title}</CardTitle>
          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                {tableColumns.map(({ path, name }) =>
                  path === "action" ? null : thData(path, name)
                )}
              </tr>
            </thead>
            <tbody>{tdData()}</tbody>
          </Table>
          <Pagination className="d-flex justify-content-end">
            <PaginationItem disabled={currentPage <= 0}>
              <PaginationLink
                onClick={(e) => handleClick(e, currentPage - 1)}
                previous
                href="#"
              />
            </PaginationItem>

            {[...Array(pagesCount)].map((page, i) => (
              <PaginationItem active={i === currentPage} key={i}>
                <PaginationLink onClick={(e) => handleClick(e, i)} href="#">
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem disabled={currentPage >= pagesCount - 1}>
              <PaginationLink
                onClick={(e) => handleClick(e, currentPage + 1)}
                next
                href="#"
              />
            </PaginationItem>
          </Pagination>
        </CardBody>
      </Card>
    </>
  );
};

ProjectTables.propTypes = {
  tableData: PropTypes.any,
};

export default ProjectTables;
