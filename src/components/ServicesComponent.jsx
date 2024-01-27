import React, { useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Button, Card } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllServices } from "../redux/APIs/servicesApiCall";
import { useState } from "react";

const ServicesComponent = () => {
  const dispatch = useDispatch();

  const { services } = useSelector((state) => state.services);
  // const { user } = useSelector((state) => state.auth);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    dispatch(getAllServices());
  }, []);

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    {
      field: "title",
      headerName: "Title",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "description",
      headerName: "Description",
      flex: 5,
      headerAlign: "center",
    },
  ];

  return (
    <Card sx={{ width: "49.5%" }}>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={services}
          columns={columns}
        />
      </Box>
    </Card>
  );
};
export default ServicesComponent;
