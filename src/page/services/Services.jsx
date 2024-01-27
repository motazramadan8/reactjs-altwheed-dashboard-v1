import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Alert, Button, MenuItem, Snackbar, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import Header from "../../components/Header";
import { toast } from "react-toastify";
import toastOptions from "../../toastOpt";
import { useDispatch } from "react-redux";
import { createService } from "../../redux/APIs/servicesApiCall";
import { useNavigate } from "react-router-dom";

const Calendar = () => {
  const { handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate()

  // const { user } = useSelector((state) => state.auth);
  const user = JSON.parse(localStorage.getItem("user"));

  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

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
    if (
      title.trim() === "" ||
      title.trim().length <= 2 ||
      title.trim().length >= 30
    ) {
      return toast.error(`Invalid Title`, toastOptions);
    }
    if (description.trim() === "" || description.trim().length <= 15) {
      return toast.error(`Invalid Description`, toastOptions);
    }

    dispatch(createService({ title, description }, user.token));
    navigate("/services");

    handleClick();
  };

  return (
    <Box>
      <Header title="CREATE SERVICE" subTitle="Create a New Service" />
      <Box
        onSubmit={handleSubmit(onSubmit)}
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          height: "500px",
          alignItems: "center",
          justifyContent: "center",
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          helperText="Must be at least 4 characters & not more than 30 characters"
          label="Title"
          variant="filled"
          sx={{ width: "80%" }}
        />

        <TextField
          id="filled-multiline-static"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          helperText="Must be at least 16 characters"
          label="Description"
          variant="filled"
          sx={{ width: "80%" }}
          rows={6}
          multiline
        />
        <Box sx={{ textAlign: "left" }}>
          <Button
            type="submit"
            sx={{ textTransform: "capitalize" }}
            variant="contained"
          >
            Create New Service
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;
