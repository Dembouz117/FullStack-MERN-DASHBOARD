import { formHelperTextClasses } from '@mui/material';
import React, { useState }from 'react';
import { Box, useMediaQuery } from "@mui/material";
//Outlet allows you to have template layouts.
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar"
import Sidebar from "../../components/Sidebar"
import { useGetUserQuery } from '../../state/api';

//Box lets you pass in properties as if they are CSS Properties
const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  //This is what you need to modify if you are building an application with a login page.
  const userId = useSelector(state => state.global.userId);
  const { data } = useGetUserQuery(userId);
  console.log("🚀 ~ file: index.jsx:17 ~ Layout ~ data", data)
  
  return (
    // flex will put it side by side, block will place it on a stack and in this case, overlap bottom elements
    <Box display = {isNonMobile ? "flex" : "block"} width = "100%" height = "100%">
      <Sidebar 
        user = {data || {}}
        isNonMobile = {isNonMobile}
        drawerWidth = "250px"
        isSidebarOpen = {isSidebarOpen}
        setIsSidebarOpen = {setIsSidebarOpen}/>
      <Box flexGrow = {1}>
        <Navbar
            user = {data || {}}
            isSidebarOpen = {isSidebarOpen}
            setIsSidebarOpen = {setIsSidebarOpen}/>
        <Outlet/>
      </Box>
    </Box>
  )
}

export default Layout;