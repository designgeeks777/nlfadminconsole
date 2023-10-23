import {
  Card,
  CardBody,
  CardTitle,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  Spinner,
} from "reactstrap";
import { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import NestedTable from "../NestedTable";
import { LoaderContext } from "../../LoaderContext";

const ProjectTables = ({
  children,
  parentCallback,
  tableData,
  tableColumns,
  title,
  fromPrayerRequestPage,
  fromUsers,
}) => {
  const { isLoading, setIsLoading } = useContext(LoaderContext);
  const [selectedId, setSelectedId] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 5;
  const pagesCount = Math.ceil(tableData.length / pageSize);
  const tableColumnsCount = useRef(0);
  const handleClick = (e, index) => {
    e.preventDefault();
    setCurrentPage(index);
  };
  const capitalize = (str) => {
    return str[0].toUpperCase() + str.slice(1);
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
    let paginatedTableData = tableData.slice(
      currentPage * pageSize,
      (currentPage + 1) * pageSize
    );
    return paginatedTableData.map((data, index) => {
      return (
        <tr key={index} className="border-top">
          {tableColumns.map(({ path }) => {
            return (
              <td className="py-3" key={path}>
                {path === "user" ? (
                  <div className="d-flex align-items-center py-2">
                    {data[path].length !== 0 && (
                      <img
                        src={data[path][0]?.profilePic}
                        className="rounded-circle"
                        alt="avatar"
                        width="45"
                        height="45"
                      />
                    )}
                    {data[path].length !== 0 && (
                      <div className="ms-2">
                        <h6 className="mb-0">
                          {capitalize(data[path][0]?.name)}
                        </h6>
                      </div>
                    )}
                  </div>
                ) : path === "action" ? (
                  <div
                    className="table-actions-button d-flex justify-content-center"
                    size="sm"
                    onClick={() => {
                      setIsLoading(true);
                      parentCallback(true, paginatedTableData[index]);
                      // console.log("clicked", paginatedTableData[index]);
                    }}
                  >
                    {data[path].toUpperCase()}
                  </div>
                ) : path === "responses" || path === "members" ? (
                  <span className="ps-4">
                    {data[path].length === 0 ? null : (
                      <i
                        className={`bi ${
                          selectedId === index
                            ? "bi-chevron-down"
                            : "bi-chevron-right"
                        } text-primary`}
                        style={{ paddingRight: 6, cursor: "pointer" }}
                        onClick={() => {
                          onSelectItem(index);
                        }}
                      />
                    )}
                    {data[path].length}
                    {selectedId === index ? (
                      <NestedTable
                        tableData={data[path]}
                        // fromPrayerRequestPage={fromPrayerRequestPage}
                      />
                    ) : null}
                  </span>
                ) : (
                  <>{capitalize(data[path])}</>
                )}
              </td>
            );
          })}
        </tr>
      );
    });
  };

  // if (isLoading) {
  //   return (
  //     <Card>
  //       <CardBody>
  //         <CardTitle tag="h5">{title}</CardTitle>
  //         <div style={{ height: 250 }}>
  //           <Spinner color="primary" className="table-spinner" />
  //         </div>
  //       </CardBody>
  //     </Card>
  //   );
  // }

  return (
    <>
      <Card>
        <CardBody>
          <CardTitle tag="h5">{title}</CardTitle>
          <>
            {isLoading ? (
              <div style={{ height: 250 }}>
                <Spinner color="primary" className="table-spinner" />
              </div>
            ) : tableData.length === 0 ? (
              <div style={{ height: 250 }}>No {title}</div>
            ) : (
              <Table
                className="no-wrap mt-3 align-middle"
                responsive
                borderless
              >
                <thead>
                  <tr>
                    {tableColumns.map(({ path, name }) =>
                      path === "action" ? null : thData(path, name)
                    )}
                  </tr>
                </thead>
                <tbody>{tdData()}</tbody>
              </Table>
            )}
            {tableData.length !== 0 && (
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
            )}
          </>
        </CardBody>
      </Card>
    </>
  );
};

ProjectTables.propTypes = {
  tableData: PropTypes.any,
};

export default ProjectTables;
