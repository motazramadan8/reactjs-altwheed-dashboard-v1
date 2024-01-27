import React, { useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Avatar, Button, useTheme } from "@mui/material";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  AdminPanelSettingsOutlined,
  LockOpenOutlined,
  SecurityOutlined,
} from "@mui/icons-material";
import Header from "../../components/Header";
import { deleteUser, getAllProfiles } from "../../redux/APIs/profileApicall";

const Team = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { profiles } = useSelector((state) => state.profiles);
  // const { user } = useSelector((state) => state.auth);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    dispatch(getAllProfiles(user.token));
  }, []);

  const rows = profiles;

  // Delete User Handler
  const deleteUserHandler = (profileId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this user",
      icon: "warning",
      buttons: true,
      dangerMode: true,
      closeOnClickOutside: true,
      closeOnEsc: true,
    }).then((isOk) => {
      if (isOk) {
        // dispatch(deleteWhatsapp(user.token, whatsappId));
        dispatch(deleteUser(profileId, user.token));
        swal("Account Has Been Deleted Successfully", {
          icon: "success",
        });
      }
    });
  };

  const updatedRows = profiles.map((element) => {
    return {
      ...element,
      delete: (
        <Button
          color="error"
          variant="contained"
          disabled={
            !(user.role === "Manager") ||
            element.role === "Manager" ||
            element._id === user._id
          }
          onClick={() => deleteUserHandler(element._id)}
        >
          Delete
        </Button>
      ),
    };
  });

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 33,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "image",
      headerName: "Image",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: ({ value }) => (
        <Avatar
          src={value.url}
          alt="Profile Image"
          sx={{ width: 40, height: 40 }}
        />
      ),
    },
    {
      field: "firstName",
      headerName: "FirstName",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "lastName",
      headerName: "LastName",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "phone",
      headerName: "Phone",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "Access",
      headerName: "Access",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: ({ row: { role } }) => {
        return (
          <Box
            sx={{
              p: "5px",
              width: "99px",
              borderRadius: "3px",
              textAlign: "center",
              display: "flex",
              justifyContent: "space-evenly",

              backgroundColor:
                role === "Admin"
                  ? theme.palette.primary.dark
                  : role === "Manager"
                  ? theme.palette.secondary.dark
                  : "#3da58a",
            }}
          >
            {role === "Admin" && (
              <AdminPanelSettingsOutlined
                sx={{ color: "#fff" }}
                fontSize="small"
              />
            )}

            {role === "Manager" && (
              <SecurityOutlined sx={{ color: "#fff" }} fontSize="small" />
            )}

            {role === "User" && (
              <LockOpenOutlined sx={{ color: "#fff" }} fontSize="small" />
            )}

            <Typography sx={{ fontSize: "13px", color: "#fff" }}>
              {role}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "delete",
      headerName: "Delete User",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: ({ row }) => row.delete,
    },
  ];

  return (
    <Box>
      <Header title={"TEAM"} subTitle={"Managing the Team Members"} />

      <Box sx={{ height: 500, mx: "auto" }}>
        <DataGrid
          slots={{
            toolbar: GridToolbar,
          }}
          rows={updatedRows}
          getRowId={(row) => row._id}
          columns={columns}
        />{" "}
      </Box>
    </Box>
  );
};

export default Team;
