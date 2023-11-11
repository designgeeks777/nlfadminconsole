import { Card, CardTitle, Button, Col, Row, Label, CardText } from "reactstrap";
import ProjectTables from "../../../components/dashboard/ProjectTable";
import { useState } from "react";

const tableColumns = [
  { path: "firstname", name: "First Name" },
  { path: "lastname", name: "Last Name" },
  { path: "enteredon", name: "Entered on" },
  { path: "contactnumber", name: "Contact Number" },
  { path: "gender", name: "Gender" },
];

const GuestCounter = () => {
  const initialData = [
    // Sample data for the table
    {
      firstname: "John",
      lastname: "Doe",
      enteredon: "2023-10-20",
      contactnumber: "1234567890",
      gender: "Male",
    },
    {
      firstname: "Jane",
      lastname: "Smith",
      enteredon: "2023-10-18",
      contactnumber: "9876543210",
      gender: "Female",
    },
    {
      firstname: "John",
      lastname: "Doe",
      enteredon: "2023-10-20",
      contactnumber: "1234567890",
      gender: "Male",
    },
    {
      firstname: "sam",
      lastname: "Smith",
      enteredon: "2023-10-18",
      contactnumber: "9876543210",
      gender: "Female",
    },
    {
      firstname: "John",
      lastname: "Doe",
      enteredon: "2023-10-20",
      contactnumber: "1234567890",
      gender: "Male",
    },
    {
      firstname: "paul",
      lastname: "Smith",
      enteredon: "2023-10-18",
      contactnumber: "9876543210",
      gender: "Female",
    },
    {
      firstname: "John",
      lastname: "Doe",
      enteredon: "2023-10-20",
      contactnumber: "1234567890",
      gender: "Male",
    },
    {
      firstname: "Jane",
      lastname: "Smith",
      enteredon: "2023-10-18",
      contactnumber: "9876543210",
      gender: "Female",
    },
  ];

  const [tableData, setTableData] = useState(initialData);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState("all");

  const handleAddGuest = () => {
    console.log("Add Guest clicked");
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter data 
    const filteredData = initialData.filter(
      (item) =>
        item.firstname.toLowerCase().includes(query) ||
        item.lastname.toLowerCase().includes(query) ||
        item.contactnumber.includes(query)
    );

    setTableData(filteredData);
  };
  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <CardTitle tag="h4" className="text-primary mb-0">
          Guest Counter
        </CardTitle>
        <Button
          className="btn buttons"
          color="primary"
          onClick={handleAddGuest}
        >
          + Add Guest
        </Button>
      </div>

      
        
          <Card style={{ padding: "10px" }}>
            <Row>
              <Col lg="6">
                <div className="d-flex justify-content-between align-items-center mb-0">
                  <Label lg="12" className="text-primary mb-0">
                    Look for a specific guest
                  </Label>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <input
                    type="text"
                    placeholder="Search guest by phone number, first name, or last name"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    style={{
                      border: "1px solid #C4C4C4",
                      borderRadius: "8px",
                      width: "100%",
                      height: "35px",
                      outline: "none",
                    }}
                    className="mt-0"
                  />
                </div>
              </Col>
              <Col lg="6">
                <div className="d-flex justify-content-between align-items-center mb-0">
                  <Label lg="12" className=" mb-0">
                    Willingness to join church
                  </Label>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <select
                    className="form-select mt-0"
                    onChange={handleSelectChange}
                    value={selectedOption}
                    style={{
                      border: "1px solid #C4C4C4",
                      borderRadius: "8px",
                      height: "35px",
                      width: "60%",
                      marginLeft: "0",
                    }}
                  >
                    <option value="all">All</option>
                    <option value="hot">Hot</option>
                    <option value="warm">Warm</option>
                    <option value="cold">Cold</option>
                  </select>
                </div>
              </Col>
            </Row>
          </Card>
        
      
      <Row>
        <Col lg="12">
          <ProjectTables
            title="Current Guest Lists"
            tableData={tableData}
            tableColumns={tableColumns}
            parentCallback={handleAddGuest}
          />
        </Col>
      </Row>
    </>
  );
};

export default GuestCounter;
