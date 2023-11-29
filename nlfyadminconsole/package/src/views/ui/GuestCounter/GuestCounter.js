import { Card, CardTitle, Button, Col, Row } from "reactstrap";
import ProjectTables from "../../../components/dashboard/ProjectTable";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LoaderContext } from "../../../LoaderContext";
import { BASEURL } from "../../../APIKey";
import Alerts from "../Alerts";
import { AlertContext } from "../../../services/AlertService";
import { GuestContext } from "./GuestDataContext";

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
        <Card>
          <div className="searchFilterContainer">
            <div className="mb-0">
              <label className="text-primary mb-0" htmlFor="searchbox">
                Look for a specific guest
              </label>
              <div>
                <input
                  type="text"
                  placeholder="Search guest by phone number, first name, or last name"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="mt-0 searchbox"
                  id="searchbox"
                  name="searchbox"
                />
                <i className="bi bi-search" />
              </div>
            </div>

            <div className="mb-0">
              <label className=" mb-0" htmlFor="filter">
                Willing to join church/lifeGroup
              </label>
              <select
                className="form-select mt-0 searchbox"
                onChange={handleFilterChange}
                value={selectedOption}
                id="filter"
                name="filter"
              >
                <option value="all">All</option>
                <option value="hot">Hot</option>
                <option value="warm">Warm</option>
                <option value="cold">Cold</option>
              </select>
            </div>
          </div>
        </Card>
        <ProjectTables
          title="Current Guest Lists"
          tableData={filteredData}
          tableColumns={tableColumns}
        />
      </>
    </>
  );
};

export default GuestCounter;
