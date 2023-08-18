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

// const tableData = [
//   {
//     avatar: user1,
//     name: "Hanna Gover",
//     phoneNumber: "+919986169736",
//     gender: "female",
//   },
//   {
//     avatar: user2,
//     name: "Shaun",
//     phoneNumber: "+919986169736",
//     gender: "male",
//   },
//   {
//     avatar: user3,
//     name: "Anna Sam",
//     phoneNumber: "+919986169736",
//     gender: "female",
//   },
//   {
//     avatar: user4,
//     name: "Mark ",
//     phoneNumber: "+919986169736",
//     gender: "male",
//   },
//   {
//     avatar: user5,
//     name: "Jimmy",
//     phoneNumber: "+919986169736",
//     gender: "male",
//   },
//   {
//     avatar: user1,
//     name: "Hanna Gover",
//     phoneNumber: "+919986169736",
//     gender: "male",
//   },
//   {
//     avatar: user2,
//     name: "Gover",
//     phoneNumber: "+919986169736",
//     gender: "male",
//   },
//   {
//     avatar: user3,
//     name: "Hanna",
//     phoneNumber: "+919986169736",
//     gender: "male",
//   },
//   {
//     avatar: user4,
//     name: "Hanna Gover",
//     phoneNumber: "+919986169736",
//     gender: "male",
//   },
//   {
//     avatar: user5,
//     name: "Hanna Gover",
//     phoneNumber: "+919986169736",
//     gender: "male",
//   },
//   {
//     avatar: user3,
//     name: "Hanna Gover Mark",
//     phoneNumber: "+919986169736",
//     gender: "female",
//   },
//   {
//     avatar: user5,
//     name: "Han Gover",
//     phoneNumber: "+919986169736",
//     gender: "male",
//   },
//   {
//     avatar: user1,
//     name: "Hanna",
//     phoneNumber: "+919986169736",
//     gender: "female",
//   },
// ];

const ProjectTables = ({ children, id, tableColumns, tableData, title }) => {
  console.log(tableData, title);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 5;
  const pagesCount = Math.ceil(tableData.length / pageSize);
  var tableColumnsCount = useRef(0);

  const handleClick = (e, index) => {
    e.preventDefault();
    setCurrentPage(index);
  };
  // const filePath = user1;
  // const fileUrl = require(filePath);
  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    tableColumnsCount.current = tableColumns.length;
  }, [tableColumns.length]);

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">{title}</CardTitle>
          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                {tableColumns.map(({ path, name }) =>
                  path === "action" ? null : (
                    <th
                      key={path}
                      style={
                        ({ whiteSpace: "nowrap" },
                        tableColumnsCount.current === 4
                          ? { width: "25%" }
                          : { width: "33.3%" })
                      }
                    >
                      {name}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {tableData
                .slice(currentPage * pageSize, (currentPage + 1) * pageSize)
                .map((rowData, index) => (
                  <tr key={rowData[index]} className="border-top">
                    {tableColumns.map(({ path }) => (
                      <td
                        key={path}
                        style={
                          (path === "user" || path === "requestBy"
                            ? { padding: 0, paddingLeft: 8 }
                            : { padding: 20, paddingLeft: 8 },
                          tableColumnsCount.current === 4
                            ? { width: "25%" }
                            : { width: "33.3%" })
                        }
                      >
                        {path === "user" || path === "requestBy" ? (
                          <div className="d-flex align-items-center p-2">
                            <img
                              // src={require(rowData.user[0])}
                              // src={fileUrl}
                              src={avatar}
                              className="rounded-circle"
                              alt="avatar"
                              width="45"
                              height="45"
                            />
                            <div className="ms-3">
                              <h6 className="mb-0">
                                {path === "user"
                                  ? rowData.user[1]
                                  : rowData.requestBy[1]}
                              </h6>
                            </div>
                          </div>
                        ) : path === "action" ? (
                          <div
                            className="table-actions-button d-flex justify-content-center"
                            size="sm"
                          >
                            {rowData[path].toUpperCase()}
                          </div>
                        ) : (
                          capitalize(rowData[path])
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
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
    </div>
  );
};

ProjectTables.propTypes = {
  children: PropTypes.node,
  tableData: PropTypes.any,
};

export default ProjectTables;
