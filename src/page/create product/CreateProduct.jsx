import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Alert, Button, MenuItem, Snackbar, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import Header from "../../components/Header";
import { toast } from "react-toastify";
import toastOptions from "../../toastOpt";
import { registerUser } from "../../redux/APIs/authApiCall";
import { useDispatch } from "react-redux";

const CreateProduct = () => {
  // const { user } = useSelector((state) => state.auth);
  const user = JSON.parse(localStorage.getItem("user"));

  const { handleSubmit } = useForm();
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [role, setRole] = React.useState("Admin");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleClick = () => {
    setOpen(true);
  };

  const onSubmit = () => {
    if (firstName.trim() === "" || firstName.trim().length <= 2) {
      return toast.error(
        `Invalid Firstname. It must be at least 3 characters and must be less than 100 characters`,
        toastOptions
      );
    }
    if (
      lastName.trim() === "" ||
      lastName.trim().length <= 2 ||
      lastName.trim().length >= 100
    ) {
      return toast.error(
        `Invalid Lastname. It must be at least 3 characters and must be less than 100 characters`,
        toastOptions
      );
    }
    if (
      !email
        .trim()
        .match(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      return toast.error(`Invalid Email`, toastOptions);
    }
    if (
      !phone
        .trim()
        .match(
          /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/
        )
    ) {
      return toast.error(`Invalid Phone Number`, toastOptions);
    }
    if (password.trim() === "" || password.trim().length <= 7) {
      return toast.error(`Password must be at least 8 character`, toastOptions);
    }
    dispatch(
      registerUser({
        firstName,
        lastName,
        email,
        phone,
        password,
        role,
      })
    );
    handleClick();
  };

  return (
    <Box>
      <Header title="CREATE USER" subTitle="Create a New User Profile" />
      <Box
        onSubmit={handleSubmit(onSubmit)}
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
        noValidate
        autoComplete="off"
      >
        <Stack sx={{ gap: 2 }} direction={"row"}>
          <TextField
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            // error
            helperText="Must be at least 3 characters and must be less than 100 characters"
            sx={{ flex: 1 }}
            label="First Name"
            variant="filled"
          />

          <TextField
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            // error
            helperText="Must be at least 3 characters and must be less than 100 characters"
            sx={{ flex: 1 }}
            label="Last Name"
            variant="filled"
          />
        </Stack>

        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          // error
          helperText="Must be valid email address"
          label="Email"
          variant="filled"
        />

        <TextField
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          // error
          helperText="Must be valid phone number"
          label="Contact Number"
          variant="filled"
        />
        <TextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          // error
          helperText="Must be at least 8 character"
          label="Password"
          variant="filled"
          type="password"
        />

        <TextField
          variant="filled"
          id="outlined-select-currency"
          select
          label="Permission"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          helperText="Must be valid role"
        >
          <MenuItem value="Admin">Admin</MenuItem>
          <MenuItem
            style={{ display: user.role === "Admin" && "none" }}
            value="Manager"
          >
            Manager
          </MenuItem>
        </TextField>

        <Box sx={{ textAlign: "left" }}>
          <Button
            type="submit"
            sx={{ textTransform: "capitalize" }}
            variant="contained"
          >
            Create New User
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateProduct;
