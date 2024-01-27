import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Alert, Button, MenuItem, Snackbar, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import Header from "../../components/Header";
import { toast } from "react-toastify";
import toastOptions from "../../toastOpt";
import { useDispatch } from "react-redux";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { createProduct } from "../../redux/APIs/productApiCall";
import { useNavigate } from "react-router-dom";

const CreateProductPage = () => {
  const { handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate()

  // const { user } = useSelector((state) => state.auth);
  const user = JSON.parse(localStorage.getItem("user"));

  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [category, setCategory] = React.useState(
    "installation of sound insulation"
  );
  const [file, setFile] = React.useState(null);

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

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

    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    formData.append("category", category);

    dispatch(createProduct(formData, user.token));
    navigate("/products")
    window.location.reload()
    handleClick();
  };

  return (
    <Box>
      <Header title="CREATE PRODUCT" subTitle="Create a New Product" />
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
          marginTop: file && "100px",
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
          variant="filled"
          id="outlined-select-currency"
          select
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          helperText="Must be valid category"
          sx={{ width: "80%" }}
        >
          <MenuItem value="installation of sound insulation">
            installation of sound insulation
          </MenuItem>
          <MenuItem value="modern paint decoration design">
            modern paint decoration design
          </MenuItem>
          <MenuItem value="gypsum board decoration">
            gypsum board decoration
          </MenuItem>
          <MenuItem value="installation wallpaper">
            installation wallpaper
          </MenuItem>
        </TextField>

        <Button
          component="label"
          variant="contained"
          color="success"
          startIcon={<CloudUploadIcon />}
          onChange={(e) => setFile(e.target.files[0])}
        >
          Upload file
          <VisuallyHiddenInput type="file" />
        </Button>

        {file && (
          <img
            className="post-image"
            src={URL.createObjectURL(file)}
            alt="post"
            width="40%"
          />
        )}

        <Box sx={{ textAlign: "left" }}>
          <Button
            type="submit"
            sx={{ textTransform: "capitalize" }}
            variant="contained"
          >
            Create New Product
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateProductPage;
