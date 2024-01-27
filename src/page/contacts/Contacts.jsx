import React, { useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { rows } from "./data";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteService,
  getAllServices,
} from "../../redux/APIs/servicesApiCall";
import { useState } from "react";
import EditModel from "./EditModel";

const Contacts = () => {
  const [updateService, setUpdateService] = useState(false);
  const [serviceUpdated, setServiceUpdated] = useState({});

  const dispatch = useDispatch();

  const { services } = useSelector((state) => state.services);
  // const { user } = useSelector((state) => state.auth);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    dispatch(getAllServices());
  }, []);

  // Update service function
  const updateServiceFunc = (updatedService) => {
    setUpdateService(true);
    setServiceUpdated(updatedService);
  };

  // Delete User Handler
  const deleteUserHandler = (serviceId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this service",
      icon: "warning",
      buttons: true,
      dangerMode: true,
      closeOnClickOutside: true,
      closeOnEsc: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deleteService(serviceId, user.token));
        swal("Service Has Been Deleted Successfully", {
          icon: "success",
        });
      }
    });
  };

  const updatedRows = services.map((element) => {
    return {
      ...element,
      delete: (
        <Button
          color="error"
          variant="contained"
          onClick={() => deleteUserHandler(element._id)}
        >
          Delete
        </Button>
      ),
      update: (
        <Button
          color="warning"
          variant="contained"
          onClick={() => updateServiceFunc(element)}
        >
          Update
        </Button>
      ),
    };
  });

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
    {
      field: "delete",
      headerName: "Delete Service",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: ({ row }) => row.delete,
    },
    {
      field: "update",
      headerName: "Update Service",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: ({ row }) => row.update,
    },
  ];

  return (
    <Box>
      <Header title="SERVICES" subTitle="What services are available" />
      {!updateService && (
        <Box sx={{ height: 650, width: "99%", mx: "auto" }}>
          <DataGrid
            slots={{
              toolbar: GridToolbar,
            }}
            rows={updatedRows}
            columns={columns}
          />
        </Box>
      )}
      {updateService && (
        <EditModel
          serviceUpdated={serviceUpdated}
          setUpdateService={setUpdateService}
        />
      )}
    </Box>
  );
};
export default Contacts;
