import {
  Card,
  CardBody,
  CardTitle,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import user1 from "../../assets/images/users/user1.jpg";
import user2 from "../../assets/images/users/user2.jpg";
import user3 from "../../assets/images/users/user3.jpg";
import user4 from "../../assets/images/users/user4.jpg";
import user5 from "../../assets/images/users/user5.jpg";
import { useState } from "react";

const tableData = [
  {
    avatar: user1,
    name: "Hanna Gover",
    phoneNumber: "+919986169736",
    gender: "female",
  },
  {
    avatar: user2,
    name: "Shaun",
    phoneNumber: "+919986169736",
    gender: "male",
  },
  {
    avatar: user3,
    name: "Anna Sam",
    phoneNumber: "+919986169736",
    gender: "female",
  },
  {
    avatar: user4,
    name: "Mark ",
    phoneNumber: "+919986169736",
    gender: "male",
  },
  {
    avatar: user5,
    name: "Jimmy",
    phoneNumber: "+919986169736",
    gender: "male",
  },
  {
    avatar: user1,
    name: "Hanna Gover",
    phoneNumber: "+919986169736",
    gender: "male",
  },
  {
    avatar: user2,
    name: "Gover",
    phoneNumber: "+919986169736",
    gender: "male",
  },
  {
    avatar: user3,
    name: "Hanna",
    phoneNumber: "+919986169736",
    gender: "male",
  },
  {
    avatar: user4,
    name: "Hanna Gover",
    phoneNumber: "+919986169736",
    gender: "male",
  },
  {
    avatar: user5,
    name: "Hanna Gover",
    phoneNumber: "+919986169736",
    gender: "male",
  },
  {
    avatar: user3,
    name: "Hanna Gover Mark",
    phoneNumber: "+919986169736",
    gender: "female",
  },
  {
    avatar: user5,
    name: "Han Gover",
    phoneNumber: "+919986169736",
    gender: "male",
  },
  {
    avatar: user1,
    name: "Hanna",
    phoneNumber: "+919986169736",
    gender: "female",
  },
];

const ProjectTables = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 5;
  const pagesCount = Math.ceil(tableData.length / pageSize);
  const handleClick = (e, index) => {
    e.preventDefault();
    setCurrentPage(index);
  };
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Users List</CardTitle>

          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>User</th>
                <th>Phone number</th>
                <th>Gender</th>
              </tr>
            </thead>
            <tbody>
              {tableData
                .slice(currentPage * pageSize, (currentPage + 1) * pageSize)
                .map((tdata, index) => (
                  <tr key={index} className="border-top">
                    <td>
                      <div className="d-flex align-items-center p-2">
                        <img
                          src={tdata.avatar}
                          className="rounded-circle"
                          alt="avatar"
                          width="45"
                          height="45"
                        />
                        <div className="ms-3">
                          <h6 className="mb-0">{tdata.name}</h6>
                        </div>
                      </div>
                    </td>
                    <td>{tdata.phoneNumber}</td>
                    <td className="text-capitalize">{tdata.gender}</td>
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

export default ProjectTables;
