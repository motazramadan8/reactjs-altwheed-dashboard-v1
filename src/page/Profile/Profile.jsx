import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {
  Avatar,
  Button,
  Card,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import CancelIcon from "@mui/icons-material/Cancel";
import { toast } from "react-toastify";
import toastOptions from "../../toastOpt";
import {
  deleteUser,
  updateUser,
  uploadProfilePhoto,
} from "../../redux/APIs/profileApicall";
import { logoutUser } from "../../redux/APIs/authApiCall";
import { useNavigate } from "react-router-dom";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

function Profile() {
  const { user } = useSelector((state) => state.auth);
  const { handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openUpdateForm, setOpenUpdateForm] = useState(false);
  const [bgImage, setBgImage] = useState([]);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  const [file, setFile] = useState(null);

  useEffect(() => {
    axios
      .get("https://get-random-image.onrender.com/api/v1/images/random-nature")
      .then((res) => {
        setBgImage(res.data[0].image.url);
      });
  }, []);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const onSubmit = () => {
    const updatedUser = {};

    if (firstName) {
      updatedUser.firstName = firstName;
    }
    if (lastName) {
      updatedUser.lastName = lastName;
    }

    if (email) {
      updatedUser.email = email;
    }

    if (phone) {
      updatedUser.phone = phone;
    }

    if (password.trim() !== "") {
      updatedUser.oldPassword = oldPassword;
      updatedUser.password = password;
    }

    if (updatedUser.oldPassword?.trim() === "") {
      return toast.error("Old Password Is Required", toastOptions);
    }

    if (
      !updatedUser.firstName &&
      !updatedUser.lastName &&
      !updatedUser.password
    )
      return toast.error("You must fill out any field", toastOptions);

    dispatch(updateUser(updatedUser, user?._id, user?.token));
    console.table(updatedUser);
    // navigate("/team");
    setOpenUpdateForm(false);
  };

  // Delete User Handler
  const deleteUserHandler = (profileId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this account",
      icon: "warning",
      buttons: true,
      dangerMode: true,
      closeOnClickOutside: true,
      closeOnEsc: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deleteUser(profileId, user?.token));
        navigate("/login");
        dispatch(logoutUser());
      }
    });
  };

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!file) return toast.warn("Iamge Is Required", toastOptions);

    const formData = new FormData();
    formData.append("image", file);
    dispatch(uploadProfilePhoto(formData));
  };

  return (
    <Stack justifyContent={"center"} alignItems={"center"}>
      {/* Start Image */}
      <Card
        sx={{
          width: "100%",
          padding: "0 0 20px",
          borderRadius: "5px 5px 0 0",
        }}
      >
        <Box
          sx={{
            backgroundImage: `url('${bgImage}')`,
            backgroundPositionY: "center",
            width: "100%",
            height: "300px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              mx: "auto",
              width: { lg: 150, xs: 100 },
              height: { lg: 150, xs: 100 },
              my: 1,
              border: "2px solid grey",
              transition: "0.25s",
              fontSize: { lg: "50px", xs: "30px" },
              position: "relative",
            }}
            alt={user.firstName}
            src={
              file
                ? URL.createObjectURL(file)
                : user?.image?.url ===
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                ? "Image"
                : user?.image?.url
            }
          />

          <form onSubmit={formSubmitHandler}>
            <abbr title="Choose Profile Photo">
              <IconButton
                sx={{ position: "absolute", left: "54%", top: "260px" }}
                aria-label="delete"
                color="warning"
              >
                <label htmlFor="file">
                  <CameraAltIcon sx={{ cursor: "pointer" }} />
                </label>
              </IconButton>
            </abbr>
            <input
              style={{ display: "none" }}
              type="file"
              name="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            {file && (
              <Button
                sx={{ position: "absolute", left: "54%", top: "260px" }}
                variant="contained"
                type="submit"
                color="warning"
              >
                Upload
              </Button>
            )}
          </form>
        </Box>
      </Card>
      {/* End Image */}
      {/* Start Info */}
      <Card
        sx={{
          width: "100%",
          padding: "0 20px 20px 20px",
          borderRadius: "0",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Item>
              Name: {user.firstName} {user.lastName}
            </Item>
          </Grid>
          <Grid item xs={12} md={6}>
            <Item>Email: {user.email}</Item>
          </Grid>
          <Grid item xs={12} md={6}>
            <Item>Phone: {user.phone}</Item>
          </Grid>
          <Grid item xs={12} md={6}>
            <Item>Permision: {user.role}</Item>
          </Grid>
          <Stack
            direction={"row"}
            justifyContent={"center"}
            alignItems={"center"}
            width={"100%"}
            marginTop={"15px"}
          >
            {!openUpdateForm && (
              <Button
                onClick={() => setOpenUpdateForm(true)}
                variant="contained"
                color="warning"
                sx={{ marginRight: "3px" }}
              >
                Update
              </Button>
            )}
            <Button
              variant="contained"
              sx={{ marginLeft: "3px" }}
              color="error"
              onClick={() => deleteUserHandler(user._id)}
            >
              Delete
            </Button>
          </Stack>
        </Grid>
      </Card>
      {/* End Info */}
      {/* Start Form */}
      {openUpdateForm && (
        <Card
          onSubmit={handleSubmit(onSubmit)}
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            width: "100%",
            padding: "15px",
            borderRadius: "0 0 5px 5px",
            position: "relative",
            paddingTop: "50px",
          }}
          autoComplete="off"
        >
          <CancelIcon
            color="error"
            sx={{
              textAlign: "right",
              cursor: "pointer",
              position: "absolute",
              top: "0px",
              right: "15px",
              width: "30px",
              height: "30px",
            }}
            onClick={() => setOpenUpdateForm(false)}
          />
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
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            // error
            helperText="Must be at least 8 character"
            label="Old Password"
            variant="filled"
            type="password"
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

          <Box sx={{ textAlign: "center" }}>
            <Button
              type="submit"
              sx={{ textTransform: "capitalize" }}
              variant="contained"
              color="warning"
            >
              Update Profile
            </Button>
          </Box>
        </Card>
      )}
      {/* Start Form */}
    </Stack>
  );
}

export default Profile;
