import { Card, CardTitle, Button, Col, Row, Label } from "reactstrap";
import ProjectTables from "../../../components/dashboard/ProjectTable";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LoaderContext } from "../../../LoaderContext";
import { BASEURL } from "../../../APIKey";
import Alerts from "../Alerts";
import { AlertContext } from "../../../services/AlertService";

const tableColumns = [
  { path: "firstname", name: "First Name" },
  { path: "lastname", name: "Last Name" },
  { path: "enteredon", name: "Entered on" },
  { path: "contactnumber", name: "Contact Number" },
  { path: "gender", name: "Gender" },
];

const GuestCounter = () => {
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState("all");
  const navigate = useNavigate();
  const { setIsLoading } = useContext(LoaderContext);
  const { showAlert } = useContext(AlertContext);
  const url = `${BASEURL}guests/`;

  const loadData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(url);
      var data = [];
      data = response.data;
      setTableData(data.reverse());
      setFilteredData(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [url]);

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    if (query === "") {
      setFilteredData(tableData);
      return;
    }
    // Filter data
    const filteredData = tableData.filter(
      (item) =>
        item.firstname.toLowerCase().includes(query) ||
        item.lastname.toLowerCase().includes(query) ||
        item.contactnumber.includes(query)
    );
    setFilteredData(filteredData);
  };

  const handleFilterChange = (e) => {
    setSelectedOption(e.target.value);
    const option = e.target.value.toLowerCase();
    if (option.includes("all")) {
      setFilteredData(tableData);
      return;
    }
    // Filter data
    const filteredData = tableData.filter(
      (item) => item.willingnesstojoin === option
    );
    setFilteredData(filteredData);
    console.log("filter", filteredData, option);
  };

  return (
    <>
      {showAlert.isOpen && (
        <Alerts
          props={{
            isOpen: showAlert.isOpen,
            type: showAlert.type,
            message: showAlert.message,
          }}
        />
      )}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <CardTitle tag="h4" className="text-primary mb-0">
          Guest Counter
        </CardTitle>
        <Button
          className="btn buttons"
          color="primary"
          onClick={() => {
            navigate("/addGuest");
          }}
        >
          + Add Guest
        </Button>
      </div>
      <>
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
                  onChange={handleFilterChange}
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
              tableData={filteredData}
              tableColumns={tableColumns}
            />
          </Col>
        </Row>
      </>
    </>
  );
};

export default GuestCounter;
