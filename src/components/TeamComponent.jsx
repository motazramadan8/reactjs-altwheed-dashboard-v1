import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Avatar, Button, Card, useTheme } from "@mui/material";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  AdminPanelSettingsOutlined,
  LockOpenOutlined,
  SecurityOutlined,
} from "@mui/icons-material";
import Header from "./Header";
import { getAllProfiles } from "../redux/APIs/profileApicall";

const TeamComponent = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { profiles } = useSelector((state) => state.profiles);
  // const { user } = useSelector((state) => state.auth);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    dispatch(getAllProfiles(user.token));
  }, []);

  const rows = profiles;

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
  ];

  return (
    <Card sx={{ width: "49.5%" }}>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid rows={rows} getRowId={(row) => row._id} columns={columns} />{" "}
      </Box>
    </Card>
  );
};

export default TeamComponent;
