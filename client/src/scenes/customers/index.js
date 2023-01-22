import React from 'react';
import { useGetCustomersQuery, useGetProductsQuery } from '../../state/api';
import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { DataGrid } from "@mui/x-data-grid";

const Customers = () => {
    const theme = useTheme();
    //Careful not to use square brackets wrongly when destructuring objects. No relevant error will be thrown. It just says
    //Object iterator.
    const {data, isLoading} = useGetCustomersQuery();
    console.log("This is customer data", data);

    //renderCell will take values from the column and return a regex
    const columns = [
      {
        field: "_id",
        headerName: "ID",
        flex: 1,
      },
      {
        field: "name",
        headerName: "Name",
        flex: 0.5
      },
      {
        field: "email",
        headerName: "Email",
        flex: 0.5
      },
      {
        field: "phoneNumber",
        headerName: "Phone Number",
        flex: 0.5,
        renderCell: (params) => {
          return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
        }
      },
      {
        field: "country",
        headerName: "Country",
        flex: 0.4
      },
      {
        field: "occupation",
        headerName: "Occupation",
        flex: 1
      },
      {
        field: "role",
        headerName: "Role",
        flex: 0.5
      }
    ]
  return (
    <Box m = "1.5rem 2.5rem">
      <Header title = "CUSTOMERS" subtitle = "All your clients in one place"/>
      <Box
      mt = "40px"
      height = "75vh"
      >
        <DataGrid
        rows = {data || []}
        columns = {columns}
        loading = {isLoading || !data}
        getRowId = {(row) => row._id}
        />  
      </Box>
    </Box>
  )
}

export default Customers;

