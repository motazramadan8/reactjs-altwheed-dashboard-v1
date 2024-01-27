import { Box, Button, Card, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import CancelIcon from "@mui/icons-material/Cancel";
import { useDispatch } from "react-redux";
import { updateService } from "../../redux/APIs/servicesApiCall";

function EditModel({ serviceUpdated, setUpdateService }) {
  const [title, setTitle] = React.useState(serviceUpdated.title);
  const [description, setDescription] = React.useState(
    serviceUpdated.description
  );
  // const { user } = useSelector((state) => state.auth);
  const user = JSON.parse(localStorage.getItem("user"));

  const dispatch = useDispatch();
  const { handleSubmit } = useForm();

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

    dispatch(
      updateService({ title, description }, serviceUpdated._id, user.token)
    );
    setUpdateService(false);
  };

  return (
    <Card>
      <Box onClick={() => setUpdateService(false)}>
        <CancelIcon
          sx={{
            cursor: "pointer",
            position: "absolute",
            top: "80px",
            right: "20px",
            width: "30px",
            height: "30px",
          }}
          color="error"
        />
      </Box>
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
            Update Service
          </Button>
        </Box>
      </Box>
    </Card>
  );
}

export default EditModel;
