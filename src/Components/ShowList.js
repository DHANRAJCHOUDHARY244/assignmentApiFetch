import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { CSVLink } from "react-csv";
import {
  Box,
  Button,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
} from "@chakra-ui/react";
import {  SearchIcon } from "@chakra-ui/icons";

const ShowList = () => {
  const [ApiData, setApiData] = useState([]);
  const [search, setSearch] = useState("");
  const [searchBaseUnit, setsearchBaseUnit] = useState("");
  const [filteredApiData, setfilteredApiData] = useState([]);

  const getApiData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api-data");
      console.log(response.data);
      setApiData(response.data);
      setfilteredApiData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getApiData();
  }, []);

  useEffect(() => {
    const result = ApiData.filter((name) => {
      return name.name.toLowerCase().includes(search.toLowerCase());
    });
    setfilteredApiData(result);
  }, [search]);

  useEffect(() => {
    const result = ApiData.filter((base_unit) => {
      return (
        base_unit.base_unit &&
        base_unit.base_unit.toLowerCase().includes(searchBaseUnit.toLowerCase())
      );
    });
    setfilteredApiData(result);
  }, [searchBaseUnit]);
  
 
  const dataTableStyles = {
    table: {
      style: {
        backgroundColor: "transparent",
      },
    },
    header: {
      style: {
        backgroundColor: "transparent",
      },
    },
    subHeader: {
      style: {
        backgroundColor: "transparent",
      },
    },
  };
  const columns = [
    {
      name: "Name",
      style: { backgroundColor: "rgb(16, 200, 53)" },
      selector: (row) => row.name,
    },
    {
      name: "Last",
      style: { backgroundColor: "rgb(16, 200, 53)" },
      selector: (row) => row.last,
    },
    {
      name: "Buy",
      style: { backgroundColor: "rgb(16, 200, 53)" },
      selector: (row) => row.buy,
    },
    {
      name: "Sell",
      style: { backgroundColor: "rgb(16, 200, 53)" },
      selector: (row) => row.sell
    },
    {
      name: "Base Unit",
      style: { backgroundColor: "rgb(16, 200, 53)" },
      selector: (row) => row.base_unit,
    },
    
  ];
  return (
    <div style={{ marginTop: "60px" ,paddingLeft:'100px',paddingRight:'100px',paddingBottom:'200px'}}>
      <DataTable
        columns={columns}
        data={filteredApiData}
        pagination
        fixedHeader
        customStyles={dataTableStyles}
        fixedHeaderScrollHeight="600px"
        selectableRowsHighlight
        highlightOnHover
        actions={
          <>
            <CSVLink
              type="button"
              data={ApiData}
              style={{
                border: "1px solid rgba(0,0,0,0.2)",
                fontSize: "15px",
                fontWeight: "bold",
                borderRadius: "30px",
                padding: "10px",
                marginTop: "10px",
                backgroundColor:"#F16E07 ",
                color:"#fff"
              }}
            >
              CSV Without Filtered
            </CSVLink>
            <CSVLink
              type="button"
              data={filteredApiData}
              style={{
                border: "1px solid rgba(0,0,0,0.2)",
                fontSize: "15px",
                fontWeight: "bold",
                borderRadius: "30px",
                padding: "10px",
                marginTop: "10px",
                backgroundColor:"#EA9706 ",
                color:"#fff"
              }}
            >
              CSV WITH FILTER
            </CSVLink>
          </>
        }
        subHeader
        subHeaderComponent={
          <HStack spacing="24px">
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.300" />
              </InputLeftElement>
              <Input
                type="text"
                placeholder="Search by Name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{border:"1px solid rgba(0,0,0,0.04"}}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.300" />
              </InputLeftElement>
              <Input
                type="text"
                placeholder="Search by Base Unit"
                value={searchBaseUnit}
                onChange={(e) => setsearchBaseUnit(e.target.value)}
                style={{border:"1px solid rgba(0,0,0,0.04"}}
              />
            </InputGroup>
          </HStack>
        }
        subHeaderAlign="left"
      />
    </div>
  );
};

export default ShowList;