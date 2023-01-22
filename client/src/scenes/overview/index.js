import React, { useState } from 'react'
import { useGetSalesQuery } from '../../state/api';
import { FormControl, MenuItem, InputLabel, Box, Select } from "@mui/material";
import Header from "../../components/Header";
import OverviewChart from "../../components/OverviewChart";

const Overview = () => {
    const [view, setView] = useState("units");
  return (
    <Box m = "1.5rem 2.5rem">
        <Header title = "Overview of sales" subtitle = "The breakdown in one place"/>
        <Box height = "75vh">
            <FormControl sx = {{mt: "1rem"}}>
                <InputLabel>View</InputLabel>
                {/* Select component is for dropdown select */}
                <Select value = {view} label = "View" onChange = {e => setView(e.target.value)}>
                    <MenuItem value = "sales">Sales</MenuItem>
                    <MenuItem value = "units">Units</MenuItem>
                </Select>
            </FormControl>
            <OverviewChart view = {view}/>
        </Box>
    </Box>
  )
}

export default Overview;